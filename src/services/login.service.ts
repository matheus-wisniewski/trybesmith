import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/serviceResponse';
import jwt from '../utils/jwt';

const login = async (username: string, password: string): 
Promise<ServiceResponse<{ token: string }>> => {
  const getUser = await UserModel.findOne({ where: { username } });
  // Se eu tiro esse if o linter reclama do getUser, vou deixar por enquanto e resolver na mentoria
  if (!getUser) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const checkPassword = await bcrypt.compare(password, getUser.dataValues.password);
  if (!checkPassword || !getUser) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const payload = { id: getUser.dataValues.id, username: getUser.dataValues.username };
  const token = jwt.generateToken(payload);
  return { status: 'SUCCESSFUL', data: { token } };
};

export default {
  login,
};