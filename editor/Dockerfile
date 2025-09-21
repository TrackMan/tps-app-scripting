# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Build arguments for version info
ARG VITE_APP_VERSION=1.0.0
ARG VITE_APP_BUILD_TIME
ARG VITE_APP_COMMIT_SHA

# Set environment variables for the build (Vite requires VITE_ prefix)
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_APP_BUILD_TIME=$VITE_APP_BUILD_TIME
ENV VITE_APP_COMMIT_SHA=$VITE_APP_COMMIT_SHA

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

# Install required tools for runtime environment injection
RUN apk add --no-cache bash

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy runtime environment injection script
COPY inject-env.sh /usr/local/bin/inject-env.sh
RUN chmod +x /usr/local/bin/inject-env.sh

# Expose port 80
EXPOSE 80

# Use the injection script as the entrypoint
CMD ["/usr/local/bin/inject-env.sh"]