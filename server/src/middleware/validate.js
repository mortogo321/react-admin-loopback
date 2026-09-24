import { body, param, validationResult } from 'express-validator';

// Collect express-validator errors into a 400 response, otherwise continue.
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({
    message: 'Validation failed',
    errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
  });
};

export const objectIdParam = (name = 'id') =>
  param(name).isMongoId().withMessage(`${name} must be a valid ObjectId`);

export const loginRules = [
  body('username').trim().notEmpty().withMessage('username is required'),
  body('password').notEmpty().withMessage('password is required'),
];

export const registerRules = [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('username must be 3-30 characters'),
  body('email').trim().isEmail().normalizeEmail().withMessage('valid email is required'),
  body('password').isLength({ min: 6, max: 128 }).withMessage('password must be at least 6 characters'),
];

const userFields = [
  body('username').optional().trim().isLength({ min: 3, max: 30 }).withMessage('username must be 3-30 characters'),
  body('email').optional().trim().isEmail().normalizeEmail().withMessage('valid email is required'),
  body('password').optional().isLength({ min: 6, max: 128 }).withMessage('password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'user']).withMessage('role must be admin or user'),
];

export const userCreateRules = [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('username must be 3-30 characters'),
  body('email').trim().isEmail().normalizeEmail().withMessage('valid email is required'),
  body('password').isLength({ min: 6, max: 128 }).withMessage('password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'user']).withMessage('role must be admin or user'),
];

export const userUpdateRules = userFields;

const expenseFields = [
  body('title').optional().trim().notEmpty().withMessage('title must not be empty'),
  body('cost').optional().isFloat({ min: 0 }).withMessage('cost must be a non-negative number'),
  body('date').optional().isISO8601().withMessage('date must be a valid date'),
  body('category')
    .optional()
    .isIn(['food', 'transport', 'utilities', 'entertainment', 'healthcare', 'other'])
    .withMessage('invalid category'),
  body('description').optional().isString().withMessage('description must be a string'),
  body('userId').optional().isMongoId().withMessage('userId must be a valid ObjectId'),
];

export const expenseCreateRules = [
  body('title').trim().notEmpty().withMessage('title is required'),
  body('cost').isFloat({ min: 0 }).withMessage('cost must be a non-negative number'),
  body('date').optional().isISO8601().withMessage('date must be a valid date'),
  body('category')
    .optional()
    .isIn(['food', 'transport', 'utilities', 'entertainment', 'healthcare', 'other'])
    .withMessage('invalid category'),
  body('description').optional().isString().withMessage('description must be a string'),
  body('userId').optional().isMongoId().withMessage('userId must be a valid ObjectId'),
];

export const expenseUpdateRules = expenseFields;

const incomeFields = [
  body('title').optional().trim().notEmpty().withMessage('title must not be empty'),
  body('amount').optional().isFloat({ min: 0 }).withMessage('amount must be a non-negative number'),
  body('date').optional().isISO8601().withMessage('date must be a valid date'),
  body('source')
    .optional()
    .isIn(['salary', 'freelance', 'investment', 'business', 'gift', 'other'])
    .withMessage('invalid source'),
  body('description').optional().isString().withMessage('description must be a string'),
  body('userId').optional().isMongoId().withMessage('userId must be a valid ObjectId'),
];

export const incomeCreateRules = [
  body('title').trim().notEmpty().withMessage('title is required'),
  body('amount').isFloat({ min: 0 }).withMessage('amount must be a non-negative number'),
  body('date').optional().isISO8601().withMessage('date must be a valid date'),
  body('source')
    .optional()
    .isIn(['salary', 'freelance', 'investment', 'business', 'gift', 'other'])
    .withMessage('invalid source'),
  body('description').optional().isString().withMessage('description must be a string'),
  body('userId').optional().isMongoId().withMessage('userId must be a valid ObjectId'),
];

export const incomeUpdateRules = incomeFields;
