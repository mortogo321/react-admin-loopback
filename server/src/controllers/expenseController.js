import mongoose from 'mongoose';
import Expense from '../models/Expense.js';
import { escapeRegExp, parseIdsQuery, parseListQuery, setTotalCount } from '../utils/query.js';

const ALLOWED_SORT = ['title', 'cost', 'category', 'date', 'createdAt', 'updatedAt'];

// Whitelist client-controlled fields to prevent mass assignment.
const pickExpenseFields = (body = {}) => {
  const out = {};
  if (body.title !== undefined) out.title = body.title;
  if (body.cost !== undefined) out.cost = body.cost;
  if (body.date !== undefined) out.date = body.date;
  if (body.category !== undefined) out.category = body.category;
  if (body.description !== undefined) out.description = body.description;
  return out;
};

export const getExpenses = async (req, res) => {
  try {
    const { q, category, userId } = req.query;

    let query = {};
    if (q) {
      query.title = { $regex: escapeRegExp(q), $options: 'i' };
    }
    if (category) {
      query.category = category;
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

    const total = await Expense.countDocuments(query);
    const expenses = await Expense.find(query)
      .populate('userId', 'username email')
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(limit);

    setTotalCount(res, total);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpense = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid expense id' });
    }
    const expense = await Expense.findById(req.params.id).populate('userId', 'username email');
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...pickExpenseFields(req.body),
      userId: req.body.userId || req.user._id,
    });
    const populatedExpense = await expense.populate('userId', 'username email');
    res.status(201).json(populatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid expense id' });
    }
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      pickExpenseFields(req.body),
      { new: true, runValidators: true }
    ).populate('userId', 'username email');

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid expense id' });
    }
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpenses = async (req, res) => {
  try {
    const idsArray = parseIdsQuery(req.query.ids);
    await Expense.deleteMany({ _id: { $in: idsArray } });
    res.json({ message: 'Expenses deleted successfully' });
  } catch (error) {
    const status = error.message.startsWith('Missing') || error.message.startsWith('Invalid') || error.message.startsWith('Too many') ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};
