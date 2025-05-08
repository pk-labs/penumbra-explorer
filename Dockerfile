# Stage 1: Build app
FROM node:20-slim AS builder

ARG _ENV_NAME
ENV _ENV_NAME=$_ENV_NAME
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# ---- Add these lines for Debugging ----
RUN echo "--- DEBUG: Verifying files before build ---"
RUN pwd # Should show /app
RUN echo "Listing /app directory contents:"
RUN ls -la
RUN echo "--- Checking for src directory ---"
RUN if [ -d "src" ]; then ls -la src; else echo "ERROR: src directory not found in /app"; fi
RUN echo "--- Checking for src/components directory (CASE SENSITIVE) ---"
RUN if [ -d "src/components" ]; then echo "Found src/components (lowercase c)"; ls -la src/components; else echo "WARNING/ERROR: src/components (lowercase c) NOT FOUND"; fi
RUN if [ -d "src/Components" ]; then echo "INFO: Found src/Components (uppercase C) - potential casing mismatch?"; ls -la src/Components; fi
RUN echo "--- Content of tsconfig.json (checking baseUrl/paths) ---"
RUN cat tsconfig.json || echo "ERROR: tsconfig.json not found in /app"
RUN echo "--- End Debugging ---"

RUN npm run build

# Prune devDependencies after the building
RUN npm prune --production

# Stage 2: Build production image
FROM node:20-slim AS production

ARG _ENV_NAME
ENV _ENV_NAME=$_ENV_NAME
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/.env.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
