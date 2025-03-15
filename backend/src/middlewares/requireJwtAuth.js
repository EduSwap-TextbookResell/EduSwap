import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';

const requireJwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, config.jwtSecret);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token', err });
  }
};

export default requireJwtAuth;
