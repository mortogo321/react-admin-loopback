// Swagger documentation is added inline in expenseRoutes.js
// This file documents the structure for reference

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management endpoints
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: _start
 *         schema:
 *           type: integer
 *       - in: query
 *         name: _end
 *         schema:
 *           type: integer
 *       - in: query
 *         name: _sort
 *         schema:
 *           type: string
 *       - in: query
 *         name: _order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of expenses
 */
