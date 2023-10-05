import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import env from '../env';

const validateToken: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) { return res.status(401).json({ message: 'Token not found' }); }

  const token = authorization.split(' ')[1];
  try {
    jwt.verify(token, env.jwtSecret);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateToken;