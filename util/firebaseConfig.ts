import { initializeApp } from "firebase/app";
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(
  Buffer.from(process.env.NEXT_SERVICE_ACC!, 'base64').toString('utf8')
)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
  });
}

const firebaseConfig = {
  apiKey: "AIzaSyCaoKkIQhbiqc1EaXbnzBtHJtxvfj1jYzA",
  authDomain: "chordbank-pck.firebaseapp.com",
  projectId: "chordbank-pck",
  storageBucket: "chordbank-pck.firebasestorage.app",
  messagingSenderId: "1031370931566",
  appId: "1:1031370931566:web:24f418de40a1205d70557f",
  measurementId: "G-92W2K8SH42"
};

const app = initializeApp(firebaseConfig);
const adminDb = getFirestore('songs');

export {app, adminDb}
