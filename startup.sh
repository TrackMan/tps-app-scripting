#!/bin/bash
set -e
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

# DEBUG: Check if file exists before writing
echo "🔍 Checking if runtime-config.js exists before writing..."
ls -la /usr/share/nginx/html/runtime-config.js 2>/dev/null || echo "File doesn't exist yet"

# Force remove any existing runtime-config.js file
echo "🗑️ Removing any existing runtime-config.js..."
rm -f /usr/share/nginx/html/runtime-config.js

# Check directory permissions
echo "🔍 Directory permissions:"
ls -la /usr/share/nginx/html/

# Create runtime configuration file
echo "📄 Creating runtime configuration..."
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
cat > /usr/share/nginx/html/runtime-config.js << EOF
// Runtime configuration for Azure App Service - Generated: ${TIMESTAMP}
window.runtimeConfig = {
  VITE_BACKEND_BASE_URL: '${VITE_BACKEND_BASE_URL}',
  VITE_LOGIN_BASE_URL: '${VITE_LOGIN_BASE_URL}',
  VITE_OAUTH_WEB_CLIENT_ID: '${VITE_OAUTH_WEB_CLIENT_ID}',
  VITE_OAUTH_WEB_CLIENT_SECRET: '${VITE_OAUTH_WEB_CLIENT_SECRET}',
  VITE_NODE_ENV: '${VITE_NODE_ENV}',
  _generated: '${TIMESTAMP}'
};

console.log('🔧 Runtime configuration loaded for Azure App Service');
console.log('📊 Config values:', window.runtimeConfig);
console.log('🕐 Generated at: ${TIMESTAMP}');
EOF

echo "✅ Runtime configuration created at /usr/share/nginx/html/runtime-config.js"

# DEBUG: Verify what was actually written
echo "📄 Runtime config file content after writing:"
cat /usr/share/nginx/html/runtime-config.js

# DEBUG: Check file permissions after writing
echo "� File permissions after writing:"
ls -la /usr/share/nginx/html/runtime-config.js

# DEBUG: Test file can be read by nginx user
echo "🔍 Testing nginx config:"
nginx -t 2>/dev/null && echo "✅ Nginx config valid" || echo "❌ Nginx config error"

# CRITICAL: Verify the VITE_NODE_ENV was written correctly
echo "🔍 CRITICAL CHECK - Verifying VITE_NODE_ENV in file:"
grep "VITE_NODE_ENV" /usr/share/nginx/html/runtime-config.js || echo "❌ VITE_NODE_ENV not found in file!"

# Double-check our environment variable is still correct
echo "🔍 Double-checking environment variable:"
echo "Current VITE_NODE_ENV='${VITE_NODE_ENV}'"

if grep -q "VITE_NODE_ENV: 'production'" /usr/share/nginx/html/runtime-config.js; then
    echo "✅ SUCCESS: File contains production mode!"
else
    echo "❌ FAILURE: File does not contain production mode!"
    echo "🚨 This indicates a serious problem with file writing!"
fi

echo "✅ Runtime configuration setup complete!"

# Start nginx
echo "🌐 Starting nginx..."
exec nginx -g "daemon off;"