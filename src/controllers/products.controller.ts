import { RequestHandler } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const insert: RequestHandler = async (req, res) => {
  const productData = req.body;
  const { status, data } = await productsService.insert(productData);
  
  res.status(mapStatusHTTP(status)).json(data);
};

const findAll: RequestHandler = async (_req, res) => {
  const { status, data } = await productsService.findAll();

  res.status(mapStatusHTTP(status)).json(data);
};

export default {
  insert,
  findAll,
};