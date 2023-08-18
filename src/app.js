import express from 'express';
import productsRouter from './routers/products.routes.js';
import cartsRouter from './routers/carts.routes.js';

const app = express();
const port = 8080;

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
