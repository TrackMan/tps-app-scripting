# Azure App Service Environment Variables

This document lists all environment variables that need to be configured in Azure App Service for the environment switcher to work properly.

## Overview

The application supports switching between development and production environments from within the UI. To enable this in Azure App Service, you need to configure environment variables for **both** environments.

## Required Environment Variables

### Active Environment (Legacy/Default)
These are used as fallbacks and for backward compatibility:

```bash
VITE_BACKEND_BASE_URL=https://dr-cloud-api-dev.trackmangolfdev.com
VITE_LOGIN_BASE_URL=https://tm-login-dev.trackmangolfdev.com
VITE_OAUTH_WEB_CLIENT_ID=dr-web.4633fada-3b16-490f-8de7-2aa67158a1d6
VITE_OAUTH_WEB_CLIENT_SECRET=7c870264-3703-4ec2-add8-5f8e57251d0e
```

### Development Environment
Required for switching to development environment:

```bash
VITE_DEV_BACKEND_BASE_URL=https://dr-cloud-api-dev.trackmangolfdev.com
VITE_DEV_LOGIN_BASE_URL=https://tm-login-dev.trackmangolfdev.com
VITE_DEV_OAUTH_WEB_CLIENT_ID=<YOUR_DEV_CLIENT_ID>
VITE_DEV_OAUTH_WEB_CLIENT_SECRET=<YOUR_DEV_CLIENT_SECRET>
```

### Production Environment
Required for switching to production environment:

```bash
VITE_PROD_BACKEND_BASE_URL=https://dr-cloud-api.trackmangolf.com
VITE_PROD_LOGIN_BASE_URL=https://tm-login.trackmangolf.com
VITE_PROD_OAUTH_WEB_CLIENT_ID=<YOUR_PROD_CLIENT_ID>
VITE_PROD_OAUTH_WEB_CLIENT_SECRET=<YOUR_PROD_CLIENT_SECRET>
```

### Optional
```bash
VITE_NODE_ENV=production
```

## How to Configure in Azure App Service

1. Go to your Azure App Service in the Azure Portal
2. Navigate to **Configuration** > **Application settings**
3. Click **+ New application setting** for each variable
4. Add the **Name** and **Value** for each environment variable listed above
5. Click **OK** and then **Save**
6. Restart the App Service for changes to take effect

## How the Environment Switcher Works

### In Azure (Cloud)
1. All environment variables are set in Azure App Service configuration
2. `startup.sh` reads these variables and generates `runtime-config.js`
3. The application loads `runtime-config.js` and makes both dev and prod configs available
4. Users can click "Switch to Production/Development" in the user menu
5. The app logs out, switches localStorage, and reloads with the new environment

### Locally (Development)
1. Environment variables are defined in `.env` file
2. Vite loads these at build time as `import.meta.env.*`
3. The environment switcher reads from `.env` values
4. Same switching behavior as in Azure

## Priority Order

The application checks for configuration in this order:

1. **Azure Runtime Config** (`window.runtimeConfig`) - Set by Azure App Service
2. **Environment Switcher** (`localStorage`) - User's environment choice
3. **Build-time Config** (`import.meta.env`) - From `.env` file during build

This ensures Azure configuration always takes precedence when deployed.

## Testing

To test the environment switcher:

1. Log into the application
2. Click on your user avatar (top right)
3. Click "Switch to Production" (or "Switch to Development")
4. The app will log you out and reload
5. You'll be prompted to log in using the new environment's OAuth
6. Verify the backend calls are going to the correct environment

## Troubleshooting

### Menu item doesn't appear
- Check that production OAuth credentials are properly configured (not placeholders)
- Open browser console and check for `isProductionConfigured()` errors

### Switching doesn't work
- Check browser console for localStorage errors
- Verify all environment variables are set in Azure App Service
- Check `runtime-config.js` is being generated correctly (view in browser DevTools)

### Getting 401 errors after switching
- This is expected - you need to log in again after switching
- The app should automatically redirect to OAuth login
- If not, manually go to the login page

## Security Notes

- ⚠️ **Never commit secrets**: OAuth client secrets should never be committed to Git
- 🔒 **Use Azure Key Vault**: For production, use Azure Key Vault references instead of plain text:
  ```
  @Microsoft.KeyVault(SecretUri=https://your-vault.vault.azure.net/secrets/oauth-secret/)
  ```
- 🔐 **Separate credentials**: Use different OAuth apps/credentials for development and production environments
- 📋 **Document placeholders**: Always use placeholders like `<YOUR_CLIENT_ID>` in documentation
- ✅ **`.env` in `.gitignore`**: Ensure `.env` file is excluded from version control
