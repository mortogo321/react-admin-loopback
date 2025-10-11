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

const router = express.Router();

router.get('/', authenticate, getExpenses);
router.get('/:id', authenticate, getExpense);
router.post('/', authenticate, createExpense);
router.put('/:id', authenticate, updateExpense);
router.delete('/:id', authenticate, deleteExpense);
router.delete('/', authenticate, deleteExpenses);

export default router;
