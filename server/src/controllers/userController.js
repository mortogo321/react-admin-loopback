import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const { _start, _end, _sort, _order, q } = req.query;

    let query = {};
    if (q) {
      query = {
        $or: [
          { username: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const start = parseInt(_start) || 0;
    const end = parseInt(_end) || 10;
    const sortField = _sort || 'createdAt';
    const sortOrder = _order === 'ASC' ? 1 : -1;

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(end - start);

    res.set('X-Total-Count', total);
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
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
    const { ids } = req.query;
    const idsArray = JSON.parse(ids);
    await User.deleteMany({ _id: { $in: idsArray } });
    res.json({ message: 'Users deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
