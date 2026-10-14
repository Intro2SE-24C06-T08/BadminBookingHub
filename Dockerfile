FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY src/frontend/package.json ./src/frontend/package.json
COPY src/backend/package.json ./src/backend/package.json
RUN npm ci
COPY src/frontend ./src/frontend
COPY src/backend ./src/backend
RUN npm run build

FROM node:22-alpine AS production-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
COPY src/frontend/package.json ./src/frontend/package.json
COPY src/backend/package.json ./src/backend/package.json
RUN npm ci --omit=dev

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/src/backend/package.json ./src/backend/package.json
COPY --from=build --chown=node:node /app/src/backend/dist ./src/backend/dist
COPY --from=build --chown=node:node /app/src/frontend/dist ./src/frontend/dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "src/backend/dist/server.js"]
