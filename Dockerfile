# Build stage
FROM node:20-alpine AS build
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
# Copy package.json (package-lock.json may be absent in this repo; npm ci will fall back to npm install)
COPY package.json ./

# Ensure JSON schema files are present in the build context so imports like
# `../schema/latest/shared.schema.json` can be resolved by Vite/Rollup on Linux
# (case-sensitive filesystems and sparse checkouts in CI can sometimes omit
# them when the Docker context is prepared). Copy both top-level `schema`
# and any `src/schema` used during development.
COPY schema ./schema
COPY src/schema ./src/schema
# Ensure schema/latest is available under src/schema/latest so imports from
# `src/...` using `../schema/latest/...` resolve correctly during the build
RUN if [ -d schema/latest ]; then \
            mkdir -p src/schema/latest && cp -r schema/latest/* src/schema/latest/; \
        fi

# Remove Windows-specific Rollup package and install dependencies
RUN npm pkg delete devDependencies.@rollup/rollup-win32-x64-msvc && \
    npm ci || npm install

# Copy source code
COPY . .

# Debug: show file layout and sample schema content so CI can tell us why Vite
# cannot resolve JSON imports. This will be removed once the issue is fixed.
RUN echo "🔍 Pre-build file layout:" && \
    echo "-- /app --" && ls -la /app || true && \
    echo "-- /app/schema --" && ls -la /app/schema || true && \
    echo "-- /app/schema/latest --" && ls -la /app/schema/latest || true && \
    echo "-- /app/src --" && ls -la /app/src || true && \
    echo "-- /app/src/schema --" && ls -la /app/src/schema || true && \
    echo "-- /app/src/schema/latest --" && ls -la /app/src/schema/latest || true && \
    echo "-- head of app-scripting.schema.json --" && head -n 20 /app/schema/latest/app-scripting.schema.json || true

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