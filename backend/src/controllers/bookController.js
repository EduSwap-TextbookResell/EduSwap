import { config } from '../configs/index.js';
import Book from '../models/book.js';

const get = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || config.general.itemsPerPage;
  const page = parseInt(req.query.page) || 1;
  const { title, isbn } = req.query;

  const query = {};
  if (title) query.title = { $regex: title, $options: 'i' };
  if (isbn) query.isbn = { $regex: isbn, $options: 'i' };

  try {
    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.status(200).json({
      data: books,
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
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const { title, subject, type, class: bookClass, isbn, level } = req.body;

  const query = {};
  if (isbn) query.isbn = { $regex: `^${isbn}$`, $options: 'i' };
  if (title) query.title = { $regex: `^${title}$`, $options: 'i' };

  try {
    const existingBook = await Book.findOne(query);
    if (existingBook) {
      return res.status(409).json({ message: 'Book already exists' });
    }

    const newBook = new Book({
      title,
      subject,
      type,
      class: bookClass,
      isbn,
      level,
      verified: false,
    });

    await newBook.createBook();
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const book = req.body;
  const { id } = req.params;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, book, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.sendStatus(204);
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
