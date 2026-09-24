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
import { incomeCreateRules, incomeUpdateRules, objectIdParam, validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', authenticate, getIncomes);
router.get('/:id', authenticate, objectIdParam(), validate, getIncome);
router.post('/', authenticate, incomeCreateRules, validate, createIncome);
router.put('/:id', authenticate, objectIdParam(), validate, incomeUpdateRules, validate, updateIncome);
router.delete('/:id', authenticate, objectIdParam(), validate, deleteIncome);
router.delete('/', authenticate, deleteIncomes);

export default router;
