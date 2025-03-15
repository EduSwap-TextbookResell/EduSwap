import jwt from 'jsonwebtoken';

import { config } from '../configs/index.js';
import mongoose from 'mongoose';

const requireOwnershipOrAdmin = (model) => async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const resourceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(resourceId)) {
      return res.status(400).json({ error: 'Invalid resource ID' });
    }

    const resource = await model.findById(resourceId);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    let isOwner;
    if (model.modelName === 'User') {
      isOwner = decoded.id === resourceId;
    } else {
      isOwner = resource.user.toString() === decoded.id;
    }

    if (isOwner || decoded.role === 'ADMIN') {
      req.user = { id: decoded.id, role: decoded.role };
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
