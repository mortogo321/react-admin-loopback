import express from 'express';
import {
  getIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
  deleteIncomes,
} from '../controllers/incomeController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getIncomes);
router.get('/:id', authenticate, getIncome);
router.post('/', authenticate, createIncome);
router.put('/:id', authenticate, updateIncome);
router.delete('/:id', authenticate, deleteIncome);
router.delete('/', authenticate, deleteIncomes);

export default router;
