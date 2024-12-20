import mongoose from 'mongoose';
import logger from '../services/logger.js';
import { z } from 'zod';

const PostValidationSchema = z.object({
  city: z
    .string()
    .max(100, { message: 'City name must not exceed 100 characters' })
    .optional()
    .nullable(),
  school: z
    .string()
    .max(100, { message: 'School name must not exceed 100 characters' })
    .optional()
    .nullable(),
  state: z.enum(['new', 'used', 'completed']),
  additionalInfo: z
    .string()
    .max(1000, { message: 'Additional info must not exceed 1000 characters' })
    .optional()
    .nullable(),
  price: z.number().min(0, { message: 'Price must be a non-negative number' }),
});

const PostSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      default: null,
    },
    school: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    state: {
      type: String,
      enum: ['new', 'used', 'completed'],
      required: true,
    },
    additionalInfo: {
      type: String,
      maxlength: 1000,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

PostSchema.methods.toJSON = function () {
  const {
    _id,
    city,
    school,
    user,
    book,
    state,
    additionalInfo,
    price,
    createdAt,
    updatedAt,
  } = this;
  return {
    id: _id,
    city,
    school,
    user,
    book,
    state,
    additionalInfo,
    price,
    createdAt,
    updatedAt,
  };
};

PostSchema.methods.createPost = async function () {
  try {
    const { city, school, state, additionalInfo, price } = this;

    PostValidationSchema.parse({
      city,
      school,
      state,
      additionalInfo,
      price,
    });

    await this.save();
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const Post = mongoose.model('Post', PostSchema);

export default Post;
