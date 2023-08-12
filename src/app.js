import express from 'express';

const app = express();
const port = 8080;

app.use(express.json());

// Importar los controladores de rutas para productos y carritos
import ProductManager from './ProductManager.js';
import CartManager from './CartsManager.js';

// Routers para productos y carritos
const productsRouter = express.Router();
const cartsRouter = express.Router();

// Instanciar los managers de productos y carritos
const productManager = new ProductManager('./src/products.json');
const cartManager = new CartManager('./src/carts.json');

// Configurar las rutas para productos
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

cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
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

// Configurar las rutas para carritos
cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

cartsRouter.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;
  try {
    const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

// Asignar los routers a las rutas base
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
