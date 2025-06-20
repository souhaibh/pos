const admin = require('firebase-admin');

if (!admin.apps.length) {
  try {
    const serviceAccount = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

  } catch (error) {
    console.error('❌ Firebase Admin Initialization Error:', error.message);
  }
}

const db = admin.firestore();

console.log('Firebase Project ID:', process.env.FIREBASE_PROJECT_ID);
console.log('Firebase Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
console.log('Firebase Private Key starts with:', process.env.FIREBASE_PRIVATE_KEY?.substring(0, 20));
console.log('FIREBASE_PRIVATE_KEY raw:', process.env.FIREBASE_PRIVATE_KEY);
console.log('FIREBASE_PRIVATE_KEY parsed:', process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').slice(0, 50));

module.exports = db;
