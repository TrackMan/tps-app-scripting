#!/bin/bash
# Azure App Service startup script
# This script creates a runtime configuration file from environment variables

echo "🚀 Starting Azure App Service configuration..."

# Create runtime configuration file
cat > /usr/share/nginx/html/runtime-config.js << EOF
// Runtime configuration for Azure App Service
window.runtimeConfig = {
  VITE_BACKEND_BASE_URL: '${VITE_BACKEND_BASE_URL}',
  VITE_LOGIN_BASE_URL: '${VITE_LOGIN_BASE_URL}',
  VITE_OAUTH_WEB_CLIENT_ID: '${VITE_OAUTH_WEB_CLIENT_ID}',
  VITE_OAUTH_WEB_CLIENT_SECRET: '${VITE_OAUTH_WEB_CLIENT_SECRET}',
  VITE_NODE_ENV: '${VITE_NODE_ENV}'
};

console.log('🔧 Runtime configuration loaded for Azure App Service');
EOF

echo "✅ Runtime configuration created"

# Start nginx
echo "🌐 Starting nginx..."
nginx -g "daemon off;"