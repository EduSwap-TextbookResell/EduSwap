import Post from '../models/post.js';
import Book from '../models/book.js';
import { config } from '../configs/index.js';

const get = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || config.general.itemsPerPage;
  const page = parseInt(req.query.page) || 1;

  const {
    city,
    school,
    state,
    minPrice,
    maxPrice,
    title,
    subject,
    type,
    class: bookClass,
    isbn,
    level,
    search,
  } = req.query;

  const query = {};

  if (city) query.city = new RegExp(city, 'i');
  if (school) query.school = new RegExp(school, 'i');
  if (state) query.state = state;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  const bookQuery = {};
  if (title) bookQuery.title = new RegExp(title, 'i');
  if (subject) bookQuery.subject = new RegExp(subject, 'i');
  if (type) bookQuery.type = type;
  if (bookClass) bookQuery.class = parseInt(bookClass);
  if (isbn) bookQuery.isbn = isbn;
  if (level) bookQuery.level = level;

  if (search) {
    bookQuery.$or = [
      { title: new RegExp(search, 'i') },
      { subject: new RegExp(search, 'i') },
      { isbn: search },
    ];
  }

  try {
    if (Object.keys(bookQuery).length > 0) {
      const matchingBooks = await Book.find(bookQuery).select('_id');
      query.book = { $in: matchingBooks.map((b) => b._id) };
    }

    const posts = await Post.find(query)
      .populate('user')
      .populate('book')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.status(200).json({
      data: posts,
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
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const post = req.body;
  post.user = req.user.id;

  try {
    const newPost = new Post(post);
    await newPost.createPost();
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const post = req.body;
  post.user = req.user.id;
  const { id } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
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
