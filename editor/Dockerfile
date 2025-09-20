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
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]