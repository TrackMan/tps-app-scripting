# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Build arguments for version info
ARG VITE_APP_VERSION=1.0.0
ARG VITE_APP_BUILD_TIME
ARG VITE_APP_COMMIT_SHA

# Build arguments for Azure App Service environment variables (these come from Azure during build)
ARG VITE_BACKEND_BASE_URL
ARG VITE_LOGIN_BASE_URL
ARG VITE_OAUTH_WEB_CLIENT_ID
ARG VITE_OAUTH_WEB_CLIENT_SECRET
ARG VITE_NODE_ENV

# Set environment variables for the build (Vite requires VITE_ prefix)
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_APP_BUILD_TIME=$VITE_APP_BUILD_TIME
ENV VITE_APP_COMMIT_SHA=$VITE_APP_COMMIT_SHA
ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL
ENV VITE_LOGIN_BASE_URL=$VITE_LOGIN_BASE_URL
ENV VITE_OAUTH_WEB_CLIENT_ID=$VITE_OAUTH_WEB_CLIENT_ID
ENV VITE_OAUTH_WEB_CLIENT_SECRET=$VITE_OAUTH_WEB_CLIENT_SECRET
ENV VITE_NODE_ENV=$VITE_NODE_ENV

# Debug: Show what environment variables are available during build
RUN echo "🔍 Build Environment Debug:" && \
    echo "VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL" && \
    echo "VITE_LOGIN_BASE_URL=$VITE_LOGIN_BASE_URL" && \
    echo "VITE_OAUTH_WEB_CLIENT_ID=$VITE_OAUTH_WEB_CLIENT_ID" && \
    echo "VITE_OAUTH_WEB_CLIENT_SECRET=$(echo $VITE_OAUTH_WEB_CLIENT_SECRET | sed 's/./*/g')" && \
    echo "VITE_NODE_ENV=$VITE_NODE_ENV"

# Copy package files first for better Docker layer caching
COPY package.json package-lock.json ./

# Remove Windows-specific Rollup package and install dependencies
RUN npm pkg delete devDependencies.@rollup/rollup-win32-x64-msvc && \
    npm ci || npm install

# Copy source code
COPY . .

# Build the application with version info
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy startup script
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

# Install required tools for runtime environment injection
RUN apk add --no-cache bash

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Use the startup script as the entrypoint
CMD ["/startup.sh"]