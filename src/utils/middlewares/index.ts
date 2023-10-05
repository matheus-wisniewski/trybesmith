import loginAuth from './login.middleware';
import productValidations from './products.middleware';
import validateToken from './auth.middleware';
import validateOrders from './createOrder.middleware';

export {
  loginAuth, productValidations, validateToken, validateOrders,
};