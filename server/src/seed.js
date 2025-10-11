import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Expense from './models/Expense.js';
import Income from './models/Income.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Expense.deleteMany({});
    await Income.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: '*1234#',
      role: 'admin',
    });
    console.log('Created admin user');

    // Create regular user
    const user = await User.create({
      username: 'john',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });
    console.log('Created regular user');

    // Create sample expenses
    const expenses = [
      {
        title: 'Grocery Shopping',
        cost: 150.50,
        date: new Date('2025-01-05'),
        category: 'food',
        description: 'Weekly grocery shopping at supermarket',
        userId: admin._id,
      },
      {
        title: 'Gas Station',
        cost: 45.00,
        date: new Date('2025-01-08'),
        category: 'transport',
        description: 'Fuel for car',
        userId: admin._id,
      },
      {
        title: 'Electric Bill',
        cost: 120.00,
        date: new Date('2025-01-10'),
        category: 'utilities',
        description: 'Monthly electricity bill',
        userId: user._id,
      },
      {
        title: 'Movie Tickets',
        cost: 30.00,
        date: new Date('2025-01-12'),
        category: 'entertainment',
        description: 'Cinema tickets for weekend',
        userId: user._id,
      },
      {
        title: 'Doctor Appointment',
        cost: 80.00,
        date: new Date('2025-01-15'),
        category: 'healthcare',
        description: 'Regular checkup',
        userId: admin._id,
      },
    ];

    await Expense.insertMany(expenses);
    console.log('Created sample expenses');

    // Create sample incomes
    const incomes = [
      {
        title: 'Monthly Salary',
        amount: 5000.00,
        date: new Date('2025-01-01'),
        source: 'salary',
        description: 'January salary',
        userId: admin._id,
      },
      {
        title: 'Freelance Project',
        amount: 1200.00,
        date: new Date('2025-01-10'),
        source: 'freelance',
        description: 'Website development project',
        userId: admin._id,
      },
      {
        title: 'Stock Dividends',
        amount: 300.00,
        date: new Date('2025-01-15'),
        source: 'investment',
        description: 'Quarterly dividends',
        userId: user._id,
      },
      {
        title: 'Side Business',
        amount: 800.00,
        date: new Date('2025-01-18'),
        source: 'business',
        description: 'Online store sales',
        userId: user._id,
      },
    ];

    await Income.insertMany(incomes);
    console.log('Created sample incomes');

    console.log('\nSeeding completed successfully!');
    console.log('\nTest credentials:');
    console.log('Admin - username: admin, password: *1234#');
    console.log('User - username: john, password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
