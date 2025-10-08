# Azure Deployment Setup Guide

## Current Status
 **Docker Build Fixed**: The platform-specific dependency issue has been resolved  
️ **Deployment Issue**: Azure authentication needs to be configured

## Deployment Options

### Option 1: Service Principal Authentication (Recommended)

1. **Create Azure Service Principal**:
   ```bash
   az ad sp create-for-rbac --name "GitHub-Actions-SP" --role contributor \
     --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
     --sdk-auth
   ```

2. **Add GitHub Secret**:
   - Go to GitHub repo → Settings → Secrets and variables → Actions
   - Add new secret: `AZURE_CREDENTIALS`
   - Value: The entire JSON output from step 1

3. **Update Environment Variables**:
   - In `.github/workflows/deploy-azure.yml`
   - Change `AZURE_WEBAPP_NAME: 'your-app-name'` to your actual Azure App Service name

### Option 2: Publish Profile Authentication

1. **Get Publish Profile**:
   - In Azure Portal → App Service → Get publish profile
   - Download the `.publishsettings` file

2. **Add GitHub Secret**:
   - Add new secret: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: Contents of the `.publishsettings` file

3. **Use Alternative Workflow**:
   - Rename `deploy-azure-publishprofile.yml` to `deploy-azure.yml`
   - Or update the current workflow to use publish-profile instead of service principal

## Required GitHub Secrets

### For Service Principal (Current workflow):
- `AZURE_CREDENTIALS`: JSON from service principal creation

### For Publish Profile (Alternative):
- `AZURE_WEBAPP_PUBLISH_PROFILE`: Contents of .publishsettings file

## Azure App Service Setup

1. **Create App Service**:
   ```bash
   # Create resource group
   az group create --name myResourceGroup --location "East US"
   
   # Create App Service plan
   az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --is-linux --sku B1
   
   # Create Web App
   az webapp create --name your-app-name --resource-group myResourceGroup --plan myAppServicePlan --deployment-container-image-name nginx
   ```

2. **Configure Container Settings**:
   - Enable container logging
   - Set startup command if needed
   - Configure environment variables

## Testing the Deployment

1. **Manual Trigger**:
   - Go to GitHub Actions → Deploy to Azure App Service → Run workflow

2. **Automatic Trigger**:
   - Push changes to main branch
   - Docker build completes successfully
   - Deployment triggers automatically

## Troubleshooting

- **Authentication Errors**: Check if secrets are properly set
- **Image Pull Errors**: Ensure GitHub Container Registry access is configured
- **App Service Errors**: Check Azure App Service logs

## Next Steps

1. Choose authentication method (Service Principal recommended)
2. Set up required GitHub secrets
3. Update `AZURE_WEBAPP_NAME` in workflow
4. Test deployment

## Available Docker Images

After the successful build, these images are available:
- `ghcr.io/trackman/tps-app-scripting/app-scripting-editor:latest`
- `ghcr.io/trackman/tps-app-scripting/app-scripting-editor:main`
- `ghcr.io/trackman/tps-app-scripting/app-scripting-editor:main-<commit-sha>`