# React Admin Full-Stack Demo

![CI](https://github.com/mortogo321/react-admin-loopback/actions/workflows/ci.yml/badge.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

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
docker exec react-admin-server-dev bun run seed   # seed sample data
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

Copy env templates before running locally:

```bash
cp server/.env.example server/.env
cp web/.env.example web/.env
```

Frontend reads `VITE_API_URL` (defaults to `http://localhost:8000/api`).
Backend reads `CORS_ORIGIN` (comma-separated, defaults to `http://localhost:3000`) and enforces `JWT_SECRET` + `MONGODB_URI`.

## Checks

```bash
cd server && bun install && bun run lint && bun run test
cd ../web && bun install && bun run lint && bun run build
docker compose -f docker/compose.development.yml config
docker compose -f docker/compose.production.yml config
```

CI (`.github/workflows/ci.yml`) runs server lint + tests, web lint + build, and `docker compose config` validation on every push/PR. Dependabot checks npm + Docker weekly.

## Structure

```
server/   # Express API (config, models, controllers, routes, middleware)
web/      # React Admin frontend (components, pages, providers)
docker/   # Compose files for development and production
```
