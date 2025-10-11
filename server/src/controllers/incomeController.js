import Income from '../models/Income.js';

export const getIncomes = async (req, res) => {
  try {
    const { _start, _end, _sort, _order, q, source, userId } = req.query;

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

    const start = parseInt(_start) || 0;
    const end = parseInt(_end) || 10;
    const sortField = _sort || 'date';
    const sortOrder = _order === 'ASC' ? 1 : -1;

    const total = await Income.countDocuments(query);
    const incomes = await Income.find(query)
      .populate('userId', 'username email')
      .sort({ [sortField]: sortOrder })
      .skip(start)
      .limit(end - start);

    res.set('X-Total-Count', total);
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
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
    const { ids } = req.query;
    const idsArray = JSON.parse(ids);
    await Income.deleteMany({ _id: { $in: idsArray } });
    res.json({ message: 'Incomes deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
