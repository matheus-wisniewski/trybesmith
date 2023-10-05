import express from 'express';
import productsController from './controllers/products.controller';
import ordersController from './controllers/orders.controller';
import loginController from './controllers/login.controller';
import validateProducts from './utils/middlewares/products.middleware';
import { validateToken, validateOrders } from './utils/middlewares';

const app = express();
app.use(express.json());

// Login
app.post('/login', loginController.login);

// Products
app.post('/products', ...validateProducts, productsController.insert);
app.get('/products', productsController.findAll);

// Orders
app.get('/orders', ordersController.findAll);
app.post('/orders', validateToken, ...validateOrders, ordersController.insert);

export default app;
