import mongoose from 'mongoose';
import Income from '../models/Income.js';
import { escapeRegExp, parseIdsQuery, parseListQuery, setTotalCount } from '../utils/query.js';

const ALLOWED_SORT = ['title', 'amount', 'source', 'date', 'createdAt', 'updatedAt'];

// Whitelist client-controlled fields to prevent mass assignment.
const pickIncomeFields = (body = {}) => {
  const out = {};
  if (body.title !== undefined) out.title = body.title;
  if (body.amount !== undefined) out.amount = body.amount;
  if (body.date !== undefined) out.date = body.date;
  if (body.source !== undefined) out.source = body.source;
  if (body.description !== undefined) out.description = body.description;
  return out;
};

export const getIncomes = async (req, res) => {
  try {
    const { q, source, userId } = req.query;

    let query = {};
    if (q) {
      query.title = { $regex: escapeRegExp(q), $options: 'i' };
    }
    if (source) {
      query.source = source;
    }
    if (userId) {
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }
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
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid income id' });
    }
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
      ...pickIncomeFields(req.body),
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
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid income id' });
    }
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      pickIncomeFields(req.body),
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
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid income id' });
    }
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
