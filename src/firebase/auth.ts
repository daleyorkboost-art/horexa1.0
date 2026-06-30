import { cookies } from "next/headers";
import { adminAuth } from "@/firebase/admin";
import { firestoreModels } from "@/firebase/firestore";
import { sessionCookieName } from "@/firebase/session";

export type FirebaseSessionUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string;
  isActive?: boolean;
};

export async function verifyIdToken(idToken: string) {
  return adminAuth().verifyIdToken(idToken, true);
}

export async function createSessionCookie(idToken: string, expiresIn = 1000 * 60 * 60 * 24 * 7) {
  return adminAuth().createSessionCookie(idToken, { expiresIn });
}

export async function getCurrentUser(): Promise<FirebaseSessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(sessionCookieName)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decoded = await adminAuth().verifySessionCookie(sessionCookie, true);
    const storedUser = await firestoreModels.user.findUnique({ where: { id: decoded.uid } });
    const userRecord = (storedUser ?? {}) as Partial<FirebaseSessionUser>;

    return {
      id: decoded.uid,
      email: decoded.email ?? userRecord.email ?? null,
      name: decoded.name ?? userRecord.name ?? null,
      role: userRecord.role ?? "CLIENT",
      isActive: userRecord.isActive ?? true,
    };
  } catch {
    return null;
  }
}
