import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

function credentials() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
}

if (!getApps().length) {
  initializeApp({ credential: cert(credentials()) });
}

const email = process.env.SEED_ADMIN_EMAIL ?? "admin@horexasolutions.com";
const password = process.env.SEED_ADMIN_PASSWORD;
const name = process.env.SEED_ADMIN_NAME ?? "Horexa Super Admin";

if (!password || password.length < 12) {
  throw new Error("SEED_ADMIN_PASSWORD must be set and at least 12 characters.");
}

const auth = getAuth();
const db = getFirestore();
let user;

try {
  user = await auth.getUserByEmail(email);
  await auth.updateUser(user.uid, { password, displayName: name, disabled: false });
} catch {
  user = await auth.createUser({ email, password, displayName: name, emailVerified: true });
}

await auth.setCustomUserClaims(user.uid, { role: "SUPER_ADMIN" });
await db.collection("users").doc(user.uid).set(
  {
    email,
    name,
    role: "SUPER_ADMIN",
    isActive: true,
    firebaseUid: user.uid,
    updatedAt: FieldValue.serverTimestamp(),
    createdAt: FieldValue.serverTimestamp(),
  },
  { merge: true },
);

console.log(`Seeded Firebase admin user ${email}`);
