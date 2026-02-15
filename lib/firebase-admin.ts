import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: Buffer.from(process.env.FIREBASE_PROJECT_ID!, 'base64').toString(),
      clientEmail: Buffer.from(process.env.FIREBASE_CLIENT_EMAIL!, 'base64').toString(),
      privateKey: Buffer.from(process.env.FIREBASE_PRIVATE_KEY!, 'base64')
        .toString('utf8')
        .replace(/\\n/g, '\n'),
    }),
  });
}

export const adminDb = getFirestore('songs');
export const adminAuth = getAuth();
