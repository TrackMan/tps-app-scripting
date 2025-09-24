# Dockerfile for editor mock API (TypeScript/Express)
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production=false
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
# Install only production deps
COPY package.json ./
# If a package-lock.json is present, npm ci will be used; if not, fall back
# to npm install so the build doesn't fail when the lockfile is absent in the
# build context (common when CI checkouts or subfolders don't include it).
RUN npm ci --production || npm install --production
COPY --from=build /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/index.js"]
