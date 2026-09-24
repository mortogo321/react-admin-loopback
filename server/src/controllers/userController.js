import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { escapeRegExp, parseIdsQuery, parseListQuery, setTotalCount } from '../utils/query.js';

const ALLOWED_SORT = ['username', 'email', 'role', 'createdAt', 'updatedAt'];

// Whitelist client-controlled fields to prevent mass assignment (e.g. _id, __v).
const pickUserFields = (body = {}) => {
  const out = {};
  if (body.username !== undefined) out.username = body.username;
  if (body.email !== undefined) out.email = body.email;
  if (body.password !== undefined) out.password = body.password;
  if (body.role !== undefined) out.role = body.role;
  if (body.avatar !== undefined) out.avatar = body.avatar;
  return out;
};

export const getUsers = async (req, res) => {
  try {
    const { q } = req.query;

    let query = {};
    if (q) {
      const safe = escapeRegExp(q);
      query = {
        $or: [
          { username: { $regex: safe, $options: 'i' } },
          { email: { $regex: safe, $options: 'i' } }
        ]
      };
    }

    const { start, limit, sortField, sortOrder } = parseListQuery(req.query, {
      allowedSort: ALLOWED_SORT,
      defaultSort: 'createdAt',
    });

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(limit);

    setTotalCount(res, total);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(pickUserFields(req.body));
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }
    const update = pickUserFields(req.body);
    // findByIdAndUpdate skips the pre('save') password-hashing hook, so hash here.
    if (update.password !== undefined) {
      update.password = await bcrypt.hash(update.password, 10);
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const idsArray = parseIdsQuery(req.query.ids);
    await User.deleteMany({ _id: { $in: idsArray } });
    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    const status = error.message.startsWith('Missing') || error.message.startsWith('Invalid') || error.message.startsWith('Too many') ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};
