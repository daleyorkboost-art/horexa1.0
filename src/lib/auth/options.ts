import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { recordAndCheckRateLimit } from "@/lib/api/rate-limit";
import { verifyCaptchaToken } from "@/lib/api/spam-protection";
import { prisma } from "@/lib/db";
import { normalizeIdentifier } from "@/lib/security/request";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const authSecret =
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV === "production" ? undefined : "horexa-local-development-secret-change-in-production");

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: authSecret,
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
    updateAge: 15 * 60,
  },
  pages: {
    signIn: "/portal/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        captchaToken: { label: "Captcha", type: "text" },
      },
      async authorize(credentials) {
        const identifier = normalizeIdentifier(credentials?.email);
        const password = credentials?.password;
        const otp = credentials?.otp?.trim();
        const captchaToken = credentials?.captchaToken;

        if (!identifier || (!password && !otp)) {
          return null;
        }

        if (!(await verifyCaptchaToken(captchaToken))) {
          return null;
        }

        const limited = await recordAndCheckRateLimit({
          key: `credentials:${identifier}`,
          scope: "credentials-login",
          limit: 10,
          windowMs: 10 * 60_000,
        });

        if (limited.limited) {
          return null;
        }

        if (otp) {
          const token = await prisma.oTPToken.findFirst({
            where: {
              identifier,
              consumedAt: null,
              expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: "desc" },
            include: { user: true },
          });

          if (!token?.user || !token.user.isActive || !(await compare(otp, token.tokenHash))) {
            return null;
          }

          await prisma.$transaction([
            prisma.oTPToken.update({
              where: { id: token.id },
              data: { consumedAt: new Date() },
            }),
            prisma.user.update({
              where: { id: token.user.id },
              data: { lastLoginAt: new Date() },
            }),
          ]);

          return {
            id: token.user.id,
            name: token.user.name,
            email: token.user.email,
            image: token.user.image,
            role: token.user.role,
          };
        }

        if (!password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: identifier }, { phone: identifier }],
          },
        });

        if (!user?.passwordHash || !user.isActive) {
          return null;
        }

        const isValid = await compare(password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
    ...(googleClientId && googleClientSecret
      ? [
          GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            allowDangerousEmailAccountLinking: false,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = normalizeIdentifier(user.email);
        if (!email) return false;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        return Boolean(existingUser?.isActive);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "CLIENT";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const userId = String(token.id ?? "");
        const user = userId ? await prisma.user.findUnique({ where: { id: userId }, select: { role: true, isActive: true } }) : null;
        session.user.id = userId;
        session.user.role = user?.isActive ? user.role : "CLIENT";
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      await prisma.auditLog
        .create({
          data: {
            actorId: user.id,
            action: "LOGIN",
            entity: "User",
            entityId: user.id,
            metadata: { provider: account?.provider },
          },
        })
        .catch(() => undefined);
    },
    async signOut({ token }) {
      await prisma.auditLog
        .create({
          data: {
            actorId: typeof token?.id === "string" ? token.id : undefined,
            action: "LOGOUT",
            entity: "User",
            entityId: typeof token?.id === "string" ? token.id : undefined,
          },
        })
        .catch(() => undefined);
    },
  },
};
