import { RequestHandler } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  const { status, data } = await loginService.login(username, password);

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  login,
};