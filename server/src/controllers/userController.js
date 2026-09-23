import User from '../models/User.js';
import { parseIdsQuery, parseListQuery, setTotalCount } from '../utils/query.js';

const ALLOWED_SORT = ['username', 'email', 'role', 'createdAt', 'updatedAt'];

export const getUsers = async (req, res) => {
  try {
    const { q } = req.query;

    let query = {};
    if (q) {
      query = {
        $or: [
          { username: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } }
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
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
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
