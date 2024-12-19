import Book from '../models/book.js';

const get = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    // TODO
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    // TODO
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    // TODO
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    // TODO
  } catch (err) {
    next(err);
  }
};

export default {
  get,
  getOne,
  create,
  update,
  remove,
};
