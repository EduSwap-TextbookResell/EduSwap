import { config } from '../configs/index.js';
import User from '../models/user.js';

const get = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || config.general.itemsPerPage;
  const page = parseInt(req.query.page) || 1;
  const { username } = req.query;

  const query = {};
  if (username) query.username = { $regex: username, $options: 'i' };

  try {
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.status(200).json({
      data: users,
      total,
      page,
      limit,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const user = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  get,
  getOne,
  update,
  remove,
};
