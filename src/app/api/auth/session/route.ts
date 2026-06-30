import { NextResponse } from "next/server";
import { createSessionCookie, verifyIdToken } from "@/firebase/auth";
import { roleCookieName, sessionCookieName } from "@/firebase/session";
import { firestoreModels } from "@/firebase/firestore";
import { apiError, parseJson } from "@/lib/api/response";
import { assertSameOrigin } from "@/lib/security/request";

const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const body = await parseJson(request);
    const idToken = typeof body.idToken === "string" ? body.idToken : "";

    if (!idToken) {
      return NextResponse.json({ error: { code: "TOKEN_REQUIRED", message: "Firebase ID token is required" } }, { status: 422 });
    }

    const decoded = await verifyIdToken(idToken);
    const existing = await firestoreModels.user.findUnique({ where: { id: decoded.uid } });
    const user = existing ?? (await firestoreModels.user.update({
      where: { id: decoded.uid },
      data: {
        email: decoded.email ?? "",
        name: decoded.name ?? decoded.email ?? "",
        role: "CLIENT",
        isActive: true,
      },
    }));
    const role = String((user as { role?: string }).role ?? "CLIENT");
    const sessionCookie = await createSessionCookie(idToken, sessionMaxAgeSeconds * 1000);
    const response = NextResponse.json({ data: { user: { id: decoded.uid, email: decoded.email, role } } });

    response.cookies.set(sessionCookieName, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: sessionMaxAgeSeconds,
      path: "/",
    });
    response.cookies.set(roleCookieName, role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: sessionMaxAgeSeconds,
      path: "/",
    });

    return response;
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE() {
  const response = NextResponse.json({ data: { signedOut: true } });
  response.cookies.delete(sessionCookieName);
  response.cookies.delete(roleCookieName);
  return response;
}
