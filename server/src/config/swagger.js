import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'React Admin Demo API',
      version: '2.0.0',
      description: 'Modern REST API with Express, MongoDB, and JWT Authentication',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'API Support',
        url: 'https://github.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            username: {
              type: 'string',
              description: 'Username',
              example: 'john_doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password (hashed in database)',
              example: 'password123',
            },
            role: {
              type: 'string',
              enum: ['admin', 'user'],
              description: 'User role',
              example: 'user',
            },
            avatar: {
              type: 'string',
              nullable: true,
              description: 'Avatar URL',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Expense: {
          type: 'object',
          required: ['title', 'cost', 'date', 'userId'],
          properties: {
            id: {
              type: 'string',
              description: 'Expense ID',
            },
            title: {
              type: 'string',
              description: 'Expense title',
              example: 'Grocery Shopping',
            },
            cost: {
              type: 'number',
              minimum: 0,
              description: 'Expense cost',
              example: 150.50,
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Expense date',
            },
            category: {
              type: 'string',
              enum: ['food', 'transport', 'utilities', 'entertainment', 'healthcare', 'other'],
              description: 'Expense category',
              example: 'food',
            },
            description: {
              type: 'string',
              description: 'Expense description',
              example: 'Weekly grocery shopping',
            },
            userId: {
              type: 'string',
              description: 'User who created the expense',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Income: {
          type: 'object',
          required: ['title', 'amount', 'date', 'userId'],
          properties: {
            id: {
              type: 'string',
              description: 'Income ID',
            },
            title: {
              type: 'string',
              description: 'Income title',
              example: 'Monthly Salary',
            },
            amount: {
              type: 'number',
              minimum: 0,
              description: 'Income amount',
              example: 5000.00,
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Income date',
            },
            source: {
              type: 'string',
              enum: ['salary', 'freelance', 'investment', 'business', 'gift', 'other'],
              description: 'Income source',
              example: 'salary',
            },
            description: {
              type: 'string',
              description: 'Income description',
              example: 'January salary payment',
            },
            userId: {
              type: 'string',
              description: 'User who created the income',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'admin',
            },
            password: {
              type: 'string',
              format: 'password',
              example: '*1234#',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT token',
            },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
