# Multi-stage Dockerfile: build frontend and server, produce single image

# 1) Use previously built editor image (pushed to registry) as web-build
# This avoids requiring the 'editor/' directory in the Docker build context.
ARG REGISTRY
FROM ${REGISTRY}/app-scripting-editor:latest AS web-build

# 2) Build server
FROM node:18-alpine AS server-build
WORKDIR /srv
COPY server/package.json server/package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --production=false; else npm install --production=false; fi
COPY server/ ./server
WORKDIR /srv/server
RUN npm run build

# 3) Final image
FROM node:18-alpine
WORKDIR /app
# Install production deps for server
COPY server/package.json ./
RUN if [ -f package-lock.json ]; then npm ci --production; else npm install --production; fi

# Copy built server
COPY --from=server-build /srv/server/dist ./dist

# Copy built frontend from the editor image (nginx html location) so the server can serve it
# The editor image places the built site at /usr/share/nginx/html
COPY --from=web-build /usr/share/nginx/html ./editor-dist

EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
