# React Admin Full-Stack Demo

A full-stack admin panel demo built with React Admin, an Express REST API, and MongoDB, covering CRUD, JWT auth with role-based access, and Docker deployment.

## What's inside

- **Frontend** (`web/`): React Admin app with Material UI, resource pages for users/expenses/incomes, a custom data provider (pagination, sorting, filtering, `X-Total-Count`), and a JWT-based auth provider
- **Backend** (`server/`): Express REST API with Mongoose models (User, Expense, Income), JWT authentication, role-based access (admin/user), bcrypt password hashing, request validation, and Swagger/OpenAPI docs served at `/api-docs`
- Bulk delete and CSV export support on list views
- Docker Compose setups for development and production, with an Nginx-served production frontend build

## Tech Stack

- React, React Admin, Material UI, Vite
- Express, MongoDB, Mongoose, JWT, bcryptjs, Helmet, express-validator
- Swagger UI (swagger-jsdoc)
- Docker Compose, Nginx

## Quickstart

### Docker (recommended)

```bash
docker compose -f docker/compose.development.yml up --build
docker exec react-admin-server-dev pnpm run seed   # seed sample data
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- API docs (Swagger): http://localhost:8000/api-docs

### Local development

```bash
cd server && bun install && bun run seed && bun run dev
cd web && bun install && bun run dev
```

Requires a local MongoDB instance reachable at `mongodb://localhost:27017` (see `server/.env.example`).

## Structure

```
server/   # Express API (config, models, controllers, routes, middleware)
web/      # React Admin frontend (components, pages, providers)
docker/   # Compose files for development and production
```
