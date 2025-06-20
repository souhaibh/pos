const express = require('express');
const app = express();
const productRoutes = require('./routes/myproducts');

app.use(express.json());

// Use product routes on /products
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
