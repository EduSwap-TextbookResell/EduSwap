import mongoose from 'mongoose';
// import { z } from 'zod';
//
// const PostValidationSchema = z.object({
//   city: z.string().optional().nullable(),
//   school: z.string().optional().nullable(),
//   state: z.enum(['new', 'used', 'completed']),
//   additionalInfo: z.string().max(1000).optional().nullable(),
//   price: z.number().min(0),
// });

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

const Post = mongoose.model('Post', PostSchema);

export default Post;
