import jwt from 'jsonwebtoken';

import { config } from '../configs/index.js';

const requireOwnershipOrAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const resourceId = req.params.id;

    if (decoded.id === resourceId || decoded.role === 'ADMIN') {
      return next();
    }
    return res
      .status(403)
      .json({ error: 'Ownership or admin privileges required' });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token', err });
  }
};

export default requireOwnershipOrAdmin;
