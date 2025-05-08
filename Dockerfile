# Stage 1: Build app
FROM node:20-slim AS builder

ENV NODE_ENV=production
ENV _ENV_NAME=$_ENV_NAME_ARG

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Prune devDependencies after the building
RUN npm prune --production

# Stage 2: Build production image
FROM node:20-slim AS production

ENV NODE_ENV=production
ENV _ENV_NAME=$_ENV_NAME_ARG

WORKDIR /app

COPY --from=builder /app/.env.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
