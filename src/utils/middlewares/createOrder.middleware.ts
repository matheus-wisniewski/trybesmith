import { RequestHandler } from 'express';
import UserModel from '../../database/models/user.model';

const validateId: RequestHandler = (req, res, next) => {
  const { userId } = req.body;
  if (!userId) { return res.status(400).json({ message: '"userId" is required' }); }
  
  next();
};

const validateTypeOfId: RequestHandler = (req, res, next) => {
  const { userId } = req.body;
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }

  next();
};

const validateIfIdExists: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) { return res.status(404).json({ message: '"userId" not found' }); }
  
  next();
};

const validateProductId: RequestHandler = (req, res, next) => {
  const { productIds } = req.body;
  if (!productIds) { return res.status(400).json({ message: '"productIds" is required' }); }

  next();
};

const validateTypeOfProductId: RequestHandler = (req, res, next) => {
  const { productIds } = req.body;
  if (!Array.isArray(productIds)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }

  next();
};

const validateArrayOfNumbers: RequestHandler = (req, res, next) => {
  const { productIds } = req.body;
  if (productIds.length === 0) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }
  
  next();
};

const validateOrders = [
  validateId,
  validateTypeOfId,
  validateIfIdExists,
  validateProductId,
  validateTypeOfProductId,
  validateArrayOfNumbers,
];

export default validateOrders;