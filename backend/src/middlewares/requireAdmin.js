import jwt from 'jsonwebtoken';

import { config } from '../configs/index.js';

const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (decoded.role === 'ADMIN') {
      return next();
    }
    return res.status(403).json({ message: 'Admin privileges required' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token', err });
  }
};

export default requireAdmin;
