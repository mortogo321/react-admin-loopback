import Income from '../models/Income.js';
import { parseIdsQuery, parseListQuery, setTotalCount } from '../utils/query.js';

const ALLOWED_SORT = ['title', 'amount', 'source', 'date', 'createdAt', 'updatedAt'];

export const getIncomes = async (req, res) => {
  try {
    const { q, source, userId } = req.query;

    let query = {};
    if (q) {
      query.title = { $regex: q, $options: 'i' };
    }
    if (source) {
      query.source = source;
    }
    if (userId) {
      query.userId = userId;
    }

    const { start, limit, sortField, sortOrder } = parseListQuery(req.query, {
      allowedSort: ALLOWED_SORT,
      defaultSort: 'date',
    });

    const total = await Income.countDocuments(query);
    const incomes = await Income.find(query)
      .populate('userId', 'username email')
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(limit);

    setTotalCount(res, total);
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id).populate('userId', 'username email');
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createIncome = async (req, res) => {
  try {
    const income = await Income.create({
      ...req.body,
      userId: req.body.userId || req.user._id,
    });
    const populatedIncome = await income.populate('userId', 'username email');
    res.status(201).json(populatedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'username email');

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIncomes = async (req, res) => {
  try {
    const idsArray = parseIdsQuery(req.query.ids);
    await Income.deleteMany({ _id: { $in: idsArray } });
    res.json({ message: 'Incomes deleted successfully' });
  } catch (error) {
    const status = error.message.startsWith('Missing') || error.message.startsWith('Invalid') || error.message.startsWith('Too many') ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};
