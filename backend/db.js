const admin = require('firebase-admin');

// Avoid reinitializing the app
if (!admin.apps.length) {
  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

  } catch (error) {
    console.error('❌ Firebase Admin Initialization Error:', error.message);
  }
}

const db = admin.firestore();
module.exports = db;
