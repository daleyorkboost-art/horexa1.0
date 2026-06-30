import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function serviceAccount() {
  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (rawJson) {
    return JSON.parse(rawJson);
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    return { projectId, clientEmail, privateKey };
  }

  return null;
}

export function getFirebaseAdminApp(): App {
  const existing = getApps()[0];
  if (existing) {
    return existing;
  }

  const account = serviceAccount();

  if (!account) {
    throw new Error("Firebase Admin credentials are missing");
  }

  return initializeApp({
    credential: cert(account),
    projectId: process.env.FIREBASE_PROJECT_ID ?? account.projectId,
  });
}

export function adminAuth() {
  return getAuth(getFirebaseAdminApp());
}

export function adminDb() {
  return getFirestore(getFirebaseAdminApp());
}
