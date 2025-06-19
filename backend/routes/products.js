const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Add a product
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    console.log('Incoming data:', data); // 🟢 Add this
    const docRef = await db.collection('products').add(data);
    res.json({ id: docRef.id, ...data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update stock (or any product fields)
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const docRef = db.collection('products').doc(req.params.id);
    await docRef.update(data);
    const updatedDoc = await docRef.get();
    res.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('products').doc(req.params.id).delete();
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
