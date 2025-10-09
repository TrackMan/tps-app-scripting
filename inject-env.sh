#!/bin/bash
# Runtime environment variable injection for Vite apps in Azure App Service
# This script runs when the container starts and injects environment variables

echo "🔧 Injecting runtime environment variables..."

# Path to the environment config file
ENV_CONFIG_FILE="/usr/share/nginx/html/env-config.js"

if [ ! -f "$ENV_CONFIG_FILE" ]; then
  echo "❌ Could not find env-config.js file"
  exit 1
fi

echo "📁 Found env-config.js file: $ENV_CONFIG_FILE"

# Replace placeholders with actual environment variable values
# Active environment (backward compatibility)
sed -i "s|__VITE_BACKEND_BASE_URL__|${VITE_BACKEND_BASE_URL:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_LOGIN_BASE_URL__|${VITE_LOGIN_BASE_URL:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_OAUTH_CLIENT_ID__|${VITE_OAUTH_CLIENT_ID:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_OAUTH_CLIENT_SECRET__|${VITE_OAUTH_CLIENT_SECRET:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_GRAPHQL_URL__|${VITE_GRAPHQL_URL:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_OAUTH_TOKEN_URL__|${VITE_OAUTH_TOKEN_URL:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_APP_COMMIT_SHA__|${VITE_APP_COMMIT_SHA:-}|g" "$ENV_CONFIG_FILE"

# Development environment variables (for environment switcher)
sed -i "s|__VITE_DEV_BACKEND_BASE_URL__|${VITE_DEV_BACKEND_BASE_URL:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_DEV_LOGIN_BASE_URL__|${VITE_DEV_LOGIN_BASE_URL:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_DEV_OAUTH_WEB_CLIENT_ID__|${VITE_DEV_OAUTH_WEB_CLIENT_ID:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_DEV_OAUTH_WEB_CLIENT_SECRET__|${VITE_DEV_OAUTH_WEB_CLIENT_SECRET:-}|g" "$ENV_CONFIG_FILE"

# Production environment variables (for environment switcher)
sed -i "s|__VITE_PROD_BACKEND_BASE_URL__|${VITE_PROD_BACKEND_BASE_URL:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_PROD_LOGIN_BASE_URL__|${VITE_PROD_LOGIN_BASE_URL:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_PROD_OAUTH_WEB_CLIENT_ID__|${VITE_PROD_OAUTH_WEB_CLIENT_ID:-}|g" "$ENV_CONFIG_FILE"
sed -i "s|__VITE_PROD_OAUTH_WEB_CLIENT_SECRET__|${VITE_PROD_OAUTH_WEB_CLIENT_SECRET:-}|g" "$ENV_CONFIG_FILE"

echo "✅ Environment variables injected successfully!"
echo "🌐 Backend Base URL: ${VITE_BACKEND_BASE_URL:-'NOT SET'}"
echo "🔐 Login Base URL: ${VITE_LOGIN_BASE_URL:-'NOT SET'}"
echo "🔑 OAuth Client ID: ${VITE_OAUTH_CLIENT_ID:+SET}"
echo "🔒 OAuth Client Secret: ${VITE_OAUTH_CLIENT_SECRET:+SET}"

echo "🔧 Development URLs: ${VITE_DEV_BACKEND_BASE_URL:-'NOT SET'}"
echo "🔧 Production URLs: ${VITE_PROD_BACKEND_BASE_URL:-'NOT SET'}"

# Show the injected config for debugging
echo "📄 Injected env-config.js content:"
head -20 "$ENV_CONFIG_FILE"

# Start nginx
echo "🚀 Starting nginx..."
exec nginx -g "daemon off;"