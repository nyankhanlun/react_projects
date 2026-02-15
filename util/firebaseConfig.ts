// import { initializeApp } from "firebase/app";
// import * as admin from 'firebase-admin';
// import { getFirestore } from 'firebase-admin/firestore';

// const serviceAccount = JSON.parse(
//   Buffer.from(process.env.NEXT_SERVICE_ACC!, 'base64').toString('utf8')
// )

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     projectId: serviceAccount.project_id
//   });
// }

// const firebaseConfig = JSON.parse(
//   Buffer.from(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!, 'base64').toString('utf8')
// )
// const app = initializeApp(firebaseConfig);
// const adminDb = getFirestore('songs');

// export {app, adminDb}
