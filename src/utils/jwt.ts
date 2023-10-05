import jwt from 'jsonwebtoken';
import env from './env';

type Payload = { id: number; username: string };

const generateToken = (payload: Payload): string => {
  const jwtPayload = { sub: payload.id, name: payload.username };
  const token = jwt.sign(jwtPayload, env.jwtSecret, { algorithm: 'HS256', expiresIn: '36h' });
  return token;
};

export default {
  generateToken,
};