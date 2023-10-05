import { RequestHandler } from 'express';
import ordersService from '../services/orders.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';

const findAll: RequestHandler = async (_req, res) => {
  const { status, data } = await ordersService.findAll();

  res.status(mapStatusHTTP(status)).json(data);
};

const insert: RequestHandler = async (req, res): Promise<void> => {
  const data = req.body;
  const createNewOrder = (await OrderModel.create(data)).toJSON();

  await data.productIds.forEach(async (productId: number) => {
    const getProduct = await ProductModel.findByPk(productId);
    const product = getProduct?.toJSON() as Product;
    product.orderId = createNewOrder.id;
    await getProduct?.update(product);
  });

  res.status(201).json(data);
};

export default {
  findAll,
  insert,
};