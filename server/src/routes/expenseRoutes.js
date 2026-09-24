import express from 'express';
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  deleteExpenses,
} from '../controllers/expenseController.js';
import { authenticate } from '../middleware/auth.js';
import { expenseCreateRules, expenseUpdateRules, objectIdParam, validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', authenticate, getExpenses);
router.get('/:id', authenticate, objectIdParam(), validate, getExpense);
router.post('/', authenticate, expenseCreateRules, validate, createExpense);
router.put('/:id', authenticate, objectIdParam(), validate, expenseUpdateRules, validate, updateExpense);
router.delete('/:id', authenticate, objectIdParam(), validate, deleteExpense);
router.delete('/', authenticate, deleteExpenses);

export default router;
