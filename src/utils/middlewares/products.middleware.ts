import { RequestHandler } from 'express';

const validateProductName: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  if (!name) { return res.status(400).json({ message: '"name" is required' }); }
  
  next();
};

const validateTypeOfName: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }

  next();
};

const validateNameLength: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  if (name.length <= 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }

  next();
};

const validanteProductPrice: RequestHandler = async (req, res, next) => {
  const { price } = req.body;
  if (!price) { return res.status(400).json({ message: '"price" is required' }); }
  
  next();
};

const validateTypeOfProductPrice: RequestHandler = async (req, res, next) => {
  const { price } = req.body;
  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }

  next();
};

const validateProductPriceLength: RequestHandler = async (req, res, next) => {
  const { price } = req.body;
  if (price.length <= 3) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }

  next();
};

const validateProducts = [
  validateProductName,
  validateTypeOfName,
  validateNameLength,
  validanteProductPrice,
  validateTypeOfProductPrice,
  validateProductPriceLength,
];

export default validateProducts;