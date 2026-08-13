# Multi-stage production Dockerfile for Server

# Stage 1: Build stage
FROM oven/bun:1.3-alpine AS bun
FROM node:20-alpine AS builder

# Bring in the bun binary (oven/bun images don't ship node, but src/index.js needs it)
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile --production

# Stage 2: Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files and dependencies from builder
COPY --from=builder /app/node_modules ./node_modules
COPY package.json bun.lock ./

# Copy application source
COPY src ./src
COPY .env.example ./.env.example

# Change ownership to non-root user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "src/index.js"]
