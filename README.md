# React Admin Demo - Modern Full Stack Application

A modern full-stack demo application showcasing **React 19**, **React Admin 5.x**, **Express**, and **MongoDB** with complete CRUD operations, authentication, and Docker support.

## Tech Stack

### Frontend
- **React 19** - Latest React with improved performance
- **React Admin 5.x** - Powerful admin framework
- **Material UI 6** - Modern component library
- **Vite** - Lightning-fast build tool
- **React 19 Compiler** - Automatic optimization

### Backend
- **Node.js 20** - Latest LTS version
- **Express 4** - Fast, minimalist web framework
- **MongoDB 8** - Modern NoSQL database
- **Mongoose** - Elegant MongoDB object modeling
- **JWT Authentication** - Secure token-based auth
- **bcryptjs** - Password hashing

### DevOps & Documentation
- **pnpm** - Fast, disk space efficient package manager
- **Docker & Docker Compose** - Containerization
- **Multi-stage Builds** - Optimized production images
- **Nginx** - Production web server
- **Health Checks** - Service monitoring
- **Swagger/OpenAPI 3.0** - Interactive API documentation

## Features

✅ **Full CRUD Operations** - Create, Read, Update, Delete for all resources
✅ **JWT Authentication** - Secure login/logout system
✅ **Role-Based Access** - Admin and User roles
✅ **Advanced Filtering** - Search and filter data
✅ **Pagination & Sorting** - Efficient data handling
✅ **Reference Fields** - Related data management
✅ **Bulk Operations** - Delete multiple records
✅ **Export Functionality** - Export data to CSV
✅ **Responsive Design** - Works on all devices
✅ **Docker Support** - Easy deployment
✅ **Swagger/OpenAPI Documentation** - Interactive API explorer

## Project Structure

```
.
├── server/                 # Backend API
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── models/        # MongoDB models (User, Expense, Income)
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Authentication middleware
│   │   ├── index.js       # Server entry point
│   │   └── seed.js        # Database seeding script
│   ├── Dockerfile         # Production Dockerfile
│   ├── Dockerfile.dev     # Development Dockerfile
│   └── package.json
│
├── web/                    # Frontend Application
│   ├── src/
│   │   ├── components/    # React components (Dashboard)
│   │   ├── pages/         # Resource pages (users, expenses, incomes)
│   │   ├── providers/     # Data & Auth providers
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── Dockerfile         # Production Dockerfile with Nginx
│   ├── Dockerfile.dev     # Development Dockerfile
│   ├── nginx.conf         # Nginx configuration
│   ├── vite.config.js     # Vite configuration
│   └── package.json
│
└── docker/                 # Docker configurations
    ├── compose.development.yml
    └── compose.production.yml
```

## Getting Started

### Prerequisites

- Node.js 20+ and pnpm 9+
- MongoDB 8+ (or use Docker)
- Docker & Docker Compose (optional)

**Install pnpm:**
```bash
npm install -g pnpm
# or
corepack enable && corepack prepare pnpm@9.15.0 --activate
```

### Option 1: Local Development (Without Docker)

#### 1. Install Dependencies

**Server:**
```bash
cd server
pnpm install
```

**Web:**
```bash
cd web
pnpm install
```

#### 2. Setup MongoDB

Make sure MongoDB is running locally on `mongodb://localhost:27017`

#### 3. Configure Environment

The server already has a `.env` file configured for development:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/react-admin-demo
JWT_SECRET=demo-jwt-secret-key-change-in-production
NODE_ENV=development
```

#### 4. Seed Database

```bash
cd server
pnpm run seed
```

This creates:
- Admin user: `username: admin`, `password: *1234#`
- Regular user: `username: john`, `password: password123`
- Sample expenses and incomes

#### 5. Start Development Servers

**Terminal 1 - Start Backend:**
```bash
cd server
pnpm start
# or for auto-reload:
pnpm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd web
pnpm run dev
```

#### 6. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api
- **API Documentation (Swagger):** http://localhost:8000/api-docs
- **API Health:** http://localhost:8000/api/health

### Option 2: Docker Development

#### Start all services:
```bash
docker compose -f docker/compose.development.yml up --build
```

#### Seed the database:
```bash
docker exec react-admin-server-dev pnpm run seed
```

#### Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000/api
- API Documentation: http://localhost:8000/api-docs

#### Stop services:
```bash
docker compose -f docker/compose.development.yml down
```

### Option 3: Docker Production

#### 1. Set environment variables:
```bash
# Create .env file in root
echo "JWT_SECRET=your-super-secret-key-min-32-chars" > .env
```

#### 2. Build and start:
```bash
docker compose -f docker/compose.production.yml up --build -d
```

#### 3. Seed database:
```bash
docker exec react-admin-server-prod pnpm run seed
```

#### 4. Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000/api
- API Documentation: http://localhost:8000/api-docs

#### 5. Stop:
```bash
docker compose -f docker/compose.production.yml down
```

## API Documentation

### Interactive API Documentation (Swagger)

Access the interactive API documentation at **http://localhost:8000/api-docs**

The Swagger UI provides:
- 🔍 **Interactive API Explorer** - Test all endpoints directly from the browser
- 📝 **Detailed Request/Response Schemas** - See exactly what data to send and expect
- 🔐 **Authentication Support** - Test authenticated endpoints with JWT tokens
- 📊 **Schema Definitions** - View all data models and their properties

### Quick API Reference

#### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get user profile (authenticated)

#### Users (Admin only)
- `GET /api/users` - List users (with pagination, sorting, filtering)
- `GET /api/users/:id` - Get user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `DELETE /api/users?ids=[...]` - Bulk delete users

#### Expenses
- `GET /api/expenses` - List expenses (with pagination, sorting, filtering)
- `GET /api/expenses/:id` - Get expense
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `DELETE /api/expenses?ids=[...]` - Bulk delete expenses

#### Incomes
- `GET /api/incomes` - List incomes (with pagination, sorting, filtering)
- `GET /api/incomes/:id` - Get income
- `POST /api/incomes` - Create income
- `PUT /api/incomes/:id` - Update income
- `DELETE /api/incomes/:id` - Delete income
- `DELETE /api/incomes?ids=[...]` - Bulk delete incomes

### Using the API with Swagger

1. Go to http://localhost:8000/api-docs
2. Click on **POST /api/auth/login**
3. Click **"Try it out"**
4. Enter credentials:
   ```json
   {
     "username": "admin",
     "password": "*1234#"
   }
   ```
5. Click **"Execute"**
6. Copy the `token` from the response
7. Click **"Authorize"** button at the top
8. Enter: `Bearer YOUR_TOKEN_HERE`
9. Now you can test all authenticated endpoints!

## Test Credentials

**Admin User:**
- Username: `admin`
- Password: `*1234#`

**Regular User:**
- Username: `john`
- Password: `password123`

## Available Scripts

### Server
```bash
pnpm start         # Start server
pnpm run dev       # Start with nodemon (auto-reload)
pnpm run seed      # Seed database with sample data
```

### Web
```bash
pnpm run dev       # Start development server
pnpm run build     # Build for production
pnpm run preview   # Preview production build
```

## Features Showcase

### Users Management
- Full CRUD operations
- Search by username/email
- Filter by role (admin/user)
- Bulk delete
- Email validation
- Password hashing

### Expenses Tracking
- Track expenses with categories
- Reference to user who created it
- Filter by category and user
- Date tracking
- Currency formatting
- Bulk operations

### Income Management
- Record income from various sources
- Link to user
- Filter by source type
- Date and amount tracking
- Export functionality

## Production Deployment

### Using Docker Production Build

The production setup includes:
- **Multi-stage Docker builds** for minimal image size
- **Nginx** as reverse proxy and static file server
- **Health checks** for all services
- **Resource limits** for stability
- **Non-root users** for security
- **Gzip compression** for performance

### Environment Variables

Create a `.env` file:
```env
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NODE_ENV=production
```

### Security Best Practices

1. ✅ Use strong JWT secret (32+ characters)
2. ✅ Change default passwords
3. ✅ Use HTTPS in production
4. ✅ Enable MongoDB authentication
5. ✅ Use environment variables for secrets
6. ✅ Non-root Docker containers
7. ✅ Security headers via Helmet.js & Nginx

## Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
docker ps | grep mongo
# Or start local MongoDB
mongod --dbpath /path/to/data
```

### Port Already in Use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Docker Issues
```bash
# Clean up Docker
docker compose -f docker/compose.development.yml down -v
docker system prune -a
```

### CORS Issues
The server is configured to accept requests from `http://localhost:3000`. If you change the port, update `server/src/index.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:YOUR_PORT',
  exposedHeaders: ['X-Total-Count'],
}));
```

## Contributing

This is a demo project showcasing modern full-stack development practices. Feel free to fork and modify!

## License

MIT

## Acknowledgments

- [React Admin](https://marmelab.com/react-admin/) - Amazing admin framework
- [Material UI](https://mui.com/) - Beautiful React components
- [Express](https://expressjs.com/) - Fast, unopinionated web framework
- [MongoDB](https://www.mongodb.com/) - Modern database
