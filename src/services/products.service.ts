import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/serviceResponse';

const insert = async (product
: ProductInputtableTypes):Promise<ServiceResponse<Omit<Product, 'orderId'>>> => {
  const createNewProduct = await ProductModel.create(product);
  const { id, name, price } = createNewProduct.dataValues;
  const newProduct = { id, name, price };
  
  return { status: 'CREATED', data: newProduct };
};

const findAll = async (): Promise<ServiceResponse<Product[]>> => {
  const getAllProducts = await ProductModel.findAll();
  const products = getAllProducts.map((product) => product.toJSON());

  return { status: 'SUCCESSFUL', data: products };
};

export default {
  insert,
  findAll,
};