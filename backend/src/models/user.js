import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { z } from 'zod';

import secretOrKey from '../configs/jwt.js';

const UserValidationSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 2 characters long')
    .max(30, 'Username cannot exceed 20 characters')
    .regex(
      /^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
      'Username is invalid',
    ),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(60, 'Password cannot exceed 60 characters'),
  role: z.enum(['ADMIN', 'USER']),
  bio: z
    .string()
    .max(500, 'Bio cannot exceed 500 characters')
    .optional()
    .nullable(),
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      minlength: 3,
      maxlength: 30,
      match: [
        /^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        'is invalid',
      ],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "can't be blank"],
      minlength: 6,
      maxlength: 60,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
    bio: {
      type: String,
      maxlength: 500,
      default: null,
    },
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,
    email: this.email,
    username: this.username,
    role: this.role,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

UserSchema.methods.registerUser = async function () {
  try {
    const userObject = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      bio: this.bio,
    };

    UserValidationSchema.parse(userObject);

    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    await this.save();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, secretOrKey, { expiresIn: '1d' });
};

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
