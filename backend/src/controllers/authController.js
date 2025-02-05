import User from '../models/user.js';

const login = async (req, res, next) => {
  const { email, username, password } = req.body;

  const query = {};
  if (email) query.email = email;
  else query.username = { $regex: `^${username}$`, $options: 'i' };

  try {
    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).send({ message: 'User does not exist' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const accessToken = user.generateJWT();

    return res.status(200).header('Authorization', accessToken).json(user);
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [
        { email },
        { username: { $regex: `^${username}$`, $options: 'i' } },
      ],
    });
    if (existingUser) {
      const message =
        existingUser.email === email
          ? 'Email already in use'
          : 'Username already in use';
      return res.status(409).json({ message });
    }

    const newUser = new User({
      email,
      password,
      username,
    });

    await newUser.registerUser();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export default {
  login,
  register,
};
