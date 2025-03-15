import mongoose from 'mongoose';
import { z } from 'zod';

import logger from '../services/logger.js';

const CommentValidationSchema = z.object({
  text: z
    .string()
    .min(1, { message: 'Text is required' })
    .max(500, { message: 'Text cannot exceed 500 characters' }),
});

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
  },
  { timestamps: false },
);

CommentSchema.methods.toJSON = function () {
  const { _id, post, user, text, createdAt, updatedAt } = this;
  return {
    id: _id,
    post,
    user,
    text,
    createdAt,
    updatedAt,
  };
};

CommentSchema.methods.createComment = async function () {
  try {
    const { text } = this;

    CommentValidationSchema.parse({ text });

    await this.save();
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
