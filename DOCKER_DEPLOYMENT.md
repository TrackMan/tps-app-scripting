# Docker Deployment Guide

## Overview
This repository includes GitHub Actions workflows to automatically build and deploy the React application as a Docker container.

## Workflows

### 1. Build and Push Docker Image (`docker-build.yml`)
- **Triggers**: Push to main/develop, PRs to main, manual dispatch
- **Output**: Docker image pushed to GitHub Container Registry (ghcr.io)
- **Tags**: 
  - `latest` (for main branch)
  - `<branch-name>` (for branch pushes)
  - `<branch>-<sha>` (for commit-specific builds)

### 2. Deploy to Azure App Service (`deploy-azure.yml`)
- **Triggers**: After successful Docker build, manual dispatch
- **Target**: Azure App Service with container deployment

## Setup Instructions

### For GitHub Container Registry (Automatic)
The workflow uses `GITHUB_TOKEN` which is automatically available - no additional setup needed.

### For Azure App Service Deployment

1. **Create Azure App Service with Container support:**
   ```bash
   # Create resource group
   az group create --name myResourceGroup --location "East US"
   
   # Create App Service plan (Linux with container support)
   az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1 --is-linux
   
   # Create web app with container
   az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name your-app-name --deployment-container-image-name nginx
   ```

2. **Get Publish Profile:**
   ```bash
   az webapp deployment list-publishing-profiles --name your-app-name --resource-group myResourceGroup --xml
   ```

3. **Add GitHub Secrets:**
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add `AZURE_WEBAPP_PUBLISH_PROFILE` with the XML content from step 2

4. **Update workflow file:**
   - Edit `.github/workflows/deploy-azure.yml`
   - Replace `your-app-name` with your actual Azure App Service name

## Local Development

### Build Docker image locally:
```bash
docker build -t app-scripting-editor .
```

### Run locally:
```bash
docker run -p 8080:80 app-scripting-editor
```

Then visit http://localhost:8080

## Container Registry

Images are pushed to: `ghcr.io/trackman/tps-app-scripting/app-scripting-editor`

You can pull and run the latest image:
```bash
docker pull ghcr.io/trackman/tps-app-scripting/app-scripting-editor:latest
docker run -p 8080:80 ghcr.io/trackman/tps-app-scripting/app-scripting-editor:latest
```

## Environment Variables

For production deployment, you may need to configure environment variables in your Azure App Service:
- `WEBSITES_PORT=80` (required for Azure App Service)
- Any React environment variables (prefixed with `REACT_APP_`)

## Troubleshooting

1. **Build fails**: Check the Actions tab for detailed logs
2. **Deployment fails**: Ensure Azure App Service is configured for Linux containers
3. **App doesn't load**: Check that `WEBSITES_PORT=80` is set in App Service configuration