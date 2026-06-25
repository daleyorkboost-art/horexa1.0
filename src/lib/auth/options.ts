import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
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
      },
      async authorize(credentials) {
        const identifier = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;
        const otp = credentials?.otp?.trim();

        if (!identifier || (!password && !otp)) {
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "CLIENT";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.role = String(token.role ?? "CLIENT");
      }
      return session;
    },
  },
};
