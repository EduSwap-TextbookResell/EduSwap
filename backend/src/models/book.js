import mongoose from 'mongoose';
import { z } from 'zod';

import logger from '../services/logger.js';

const BookValidationSchema = z.object({
  title: z.string().min(6, 'Title is required'),
  subject: z.string().min(2, 'Subject is required'),
  type: z.enum(['coursebook', 'workbook', 'other']),
  class: z.number().min(1).max(8).optional().nullable(),
  isbn: z.string().length(17).optional().nullable(),
  level: z.enum(['base', 'extended', 'other']),
  verified: z.boolean().default(false),
});

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['coursebook', 'workbook', 'other'],
      required: true,
    },
    class: {
      type: Number,
      min: 1,
      max: 8,
      default: null,
    },
    isbn: {
      type: String,
      default: null,
    },
    level: {
      type: String,
      enum: ['base', 'extended', 'other'],
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: false },
);

BookSchema.methods.toJSON = function () {
  const {
    _id,
    title,
    subject,
    type,
    class: bookClass,
    isbn,
    level,
    verified,
  } = this;
  return {
    id: _id,
    title,
    subject,
    type,
    class: bookClass,
    isbn,
    level,
    verified,
  };
};

BookSchema.methods.createBook = async function () {
  try {
    const {
      title,
      subject,
      type,
      class: bookClass,
      isbn,
      level,
      verified,
    } = this;

    BookValidationSchema.parse({
      title,
      subject,
      type,
      class: bookClass,
      isbn,
      level,
      verified,
    });

    await this.save();
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const Book = mongoose.model('Book', BookSchema);

export default Book;
