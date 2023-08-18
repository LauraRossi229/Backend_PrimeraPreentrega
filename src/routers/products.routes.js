import express from 'express';
import ProductManager from '../models/ProductManager.js';

const productsRouter = express.Router();
const productManager = new ProductManager ('./src/products.json');

productsRouter.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

productsRouter.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

productsRouter.post('/', async (req, res) => {
  const newProduct = req.body;
  try {
    const addedProduct = await productManager.addProduct(newProduct);
    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

productsRouter.put('/:pid', async (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    const product = await productManager.updateProduct(productId, updatedProduct);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

productsRouter.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    await productManager.deleteProduct(productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default productsRouter;
