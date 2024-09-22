// src/config/firebaseAdmin.ts
import admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: "https://okul-yonetim-sistemi-b7e96.firebaseio.com"
    });
}

const firestore = admin.firestore();

export { firestore };