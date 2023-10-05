import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/serviceResponse';
import { OrdersAndIds } from '../types/Order';

const findAll = async (): Promise<ServiceResponse<OrdersAndIds[]>> => {
  const getAllOrders = await OrderModel.findAll({ 
    include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }] });
  
  const data = getAllOrders.map((order) => order.toJSON());
  const listOfOrders = data.map((order) => {
    const productIds = order.productIds?.map((product) => product.id);
    return { ...order, productIds }; 
  });
  
  return { status: 'SUCCESSFUL', data: listOfOrders };
};

export default {
  findAll,
};