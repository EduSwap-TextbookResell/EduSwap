import mongoose from 'mongoose';
// import { z } from 'zod';
//
// const BookValidationSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   subject: z.string().min(1, 'Subject is required'),
//   type: z.enum(['coursebook', 'workbook', 'other']),
//   class: z.number().min(1).max(8).optional().nullable(),
//   isbn: z.string().optional().nullable(),
//   level: z.enum(['base', 'extended', 'other']),
// });

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
  },
  { timestamps: false },
); // checked - boolean field changed by admin to true, default false

BookSchema.methods.toJSON = function () {
  const { _id, title, subject, type, class: bookClass, isbn, level } = this;
  return { id: _id, title, subject, type, class: bookClass, isbn, level };
};

const Book = mongoose.model('Book', BookSchema);

export default Book;
