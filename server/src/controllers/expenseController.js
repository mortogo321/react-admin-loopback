import Expense from '../models/Expense.js';

export const getExpenses = async (req, res) => {
  try {
    const { _start, _end, _sort, _order, q, category, userId } = req.query;

    let query = {};
    if (q) {
      query.title = { $regex: q, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (userId) {
      query.userId = userId;
    }

    const start = parseInt(_start) || 0;
    const end = parseInt(_end) || 10;
    const sortField = _sort || 'date';
    const sortOrder = _order === 'ASC' ? 1 : -1;

    const total = await Expense.countDocuments(query);
    const expenses = await Expense.find(query)
      .populate('userId', 'username email')
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(end - start);

    res.set('X-Total-Count', total);
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpense = async (req, res) => {
  try {
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
      ...req.body,
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
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
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
    const { ids } = req.query;
    const idsArray = JSON.parse(ids);
    await Expense.deleteMany({ _id: { $in: idsArray } });
    res.json({ message: 'Expenses deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
