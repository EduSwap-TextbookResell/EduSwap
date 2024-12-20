import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { z } from 'zod';

import logger from '../services/logger.js';
import { config } from '../configs/index.js';

const UserValidationSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(
      /^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
      'Invalid username format',
    ),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(60, 'Password cannot exceed 60 characters'),
  role: z.enum(['ADMIN', 'USER']).default('USER'),
  bio: z
    .string()
    .max(500, 'Bio cannot exceed 500 characters')
    .optional()
    .nullable(),
  city: z.string().optional().nullable(),
  school: z.string().optional().nullable(),
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
      minlength: 3,
      maxlength: 30,
      match: [
        /^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        'Invalid username format',
      ],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/.+@.+\..+/, 'Invalid email format'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      maxlength: 60,
      trim: true,
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
    city: {
      type: String,
      default: null,
    },
    school: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function () {
  const {
    _id,
    username,
    email,
    role,
    bio,
    city,
    school,
    createdAt,
    updatedAt,
  } = this;
  return {
    id: _id,
    username,
    email,
    role,
    bio,
    city,
    school,
    createdAt,
    updatedAt,
  };
};

UserSchema.methods.registerUser = async function () {
  try {
    const { username, email, password, role, bio, city, school } = this;

    UserValidationSchema.parse({
      username,
      email,
      password,
      role,
      bio,
      city,
      school,
    });

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);

    await this.save();
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, role: this.role }, config.jwtSecret, {
    expiresIn: '1d',
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
