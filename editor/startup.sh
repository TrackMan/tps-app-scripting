#!/bin/bash
# Azure App Service startup script
# This script creates a runtime configuration file from environment variables

echo "🚀 Starting Azure App Service configuration..."

# Debug: Show ALL environment variables that start with VITE_
echo "🔍 All VITE_ Environment Variables:"
env | grep "^VITE_" | sort

# Debug: Show specific environment variables
echo "🔍 Key Environment Variables:"
echo "VITE_BACKEND_BASE_URL='${VITE_BACKEND_BASE_URL:-NOT SET}'"
echo "VITE_LOGIN_BASE_URL='${VITE_LOGIN_BASE_URL:-NOT SET}'"
echo "VITE_OAUTH_WEB_CLIENT_ID='${VITE_OAUTH_WEB_CLIENT_ID:-NOT SET}'"
echo "VITE_OAUTH_WEB_CLIENT_SECRET='${VITE_OAUTH_WEB_CLIENT_SECRET:+SET}'"
echo "VITE_NODE_ENV='${VITE_NODE_ENV:-NOT SET}'"

# Create runtime configuration file
echo "📄 Creating runtime configuration..."
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
console.log('📊 Config values:', window.runtimeConfig);
EOF

echo "✅ Runtime configuration created at /usr/share/nginx/html/runtime-config.js"

# Verify the file was created and show its content
if [ -f "/usr/share/nginx/html/runtime-config.js" ]; then
    echo "📄 Runtime config file content:"
    head -15 /usr/share/nginx/html/runtime-config.js
else
    echo "❌ Failed to create runtime config file!"
fi

# Start nginx
echo "🌐 Starting nginx..."
exec nginx -g "daemon off;"