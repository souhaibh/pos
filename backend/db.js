// db.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = db;
