import Comment from '../models/comment.js';
import Post from '../models/post.js';
import { config } from '../configs/index.js';

const get = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || config.general.itemsPerPage;
  const page = parseInt(req.query.page) || 1;

  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.find({ post: post.id })
      .populate('user')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Post.countDocuments({ post: post.id });

    res.status(200).json({
      data: comments,
      total,
      page,
      limit,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const comment = req.body;
  comment.user = req.user.id;

  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    comment.post = post.id;

    const newComment = new Comment(comment);

    await newComment.createComment();
    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  get,
  create,
  remove,
};
