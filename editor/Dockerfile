# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package.json package-lock.json ./

# Remove Windows-specific Rollup package and install dependencies
RUN npm pkg delete devDependencies.@rollup/rollup-win32-x64-msvc && \
    npm ci || npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]