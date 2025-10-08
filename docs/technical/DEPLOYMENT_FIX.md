#  Deployment Fix - Azure 504 Gateway Timeout Issue

**Date**: October 2, 2025  
**Issue**: https://app-scripting-editor.trackmangolfdev.com/ returns 504 Gateway Timeout  
**Status**:  FIXED - Changes ready to commit and push

---

##  Root Cause Analysis

### Problem 1: **Wrong Dockerfile Used**
- GitHub Actions was building with `./Dockerfile` (nginx-only frontend)
- Should build with `./server/Dockerfile` (Express API + frontend)
- **Result**: Azure deployed an nginx container without the Express API

### Problem 2: **Missing Image Build Order**
- The API Dockerfile depends on `app-scripting-editor:latest` being already built
- Workflow only built one image, causing build failures or stale image usage
- **Result**: API image couldn't find frontend assets or used outdated ones

### Problem 3: **Build Context Path Issues**
- Server Dockerfile had incorrect paths: `COPY server/ ./server` then `WORKDIR /srv/server`
- This created nested directories and broke the build
- **Result**: `npm run build` would fail or produce incorrect output

---

##  Changes Made

### 1. **Fixed `.github/workflows/docker-build.yml`**

**Before**:
```yaml
- name: Build & push API image
  with:
    file: ./Dockerfile  #  Wrong file!
```

**After**:
```yaml
# Step 1: Build frontend image first
- name: Build & push Editor image (Frontend/nginx)
  with:
    file: ./Dockerfile
    tags: app-scripting-editor:latest

# Step 2: Build API image (depends on editor image)
- name: Build & push API image (Node/Express + SPA)
  with:
    file: ./server/Dockerfile  #  Correct file!
    tags: app-scripting-editor-api:latest
```

**Changes**:
-  Added two-stage build: frontend first, then API
-  Builds in correct order with proper dependencies
-  Both images tagged and pushed to ACR

### 2. **Fixed `server/Dockerfile`**

**Before**:
```dockerfile
COPY server/ ./server
WORKDIR /srv/server  #  Creates nested path
RUN npm run build
```

**After**:
```dockerfile
COPY server/ ./  #  Copy to current directory
RUN npm run build
```

**Changes**:
-  Fixed build context paths to avoid nested directories
-  Added default value for REGISTRY arg
-  Fixed package.json copy in final stage

---

##  Deployment Steps

### **To Fix Immediately:**

1. **Commit and push the changes**:
   ```bash
   git add .github/workflows/docker-build.yml server/Dockerfile
   git commit -m "fix: correct Docker build workflow and API image configuration"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Build the frontend image (`app-scripting-editor:latest`)
   - Build the API image (`app-scripting-editor-api:latest`)
   - Deploy the API image to Azure App Service
   - Restart the app
   - Health check `/api/health`

3. **Monitor the deployment**:
   - GitHub Actions: https://github.com/TrackMan/tps-app-scripting/actions
   - Wait for both workflows to complete (5-10 minutes)

4. **Verify the fix**:
   ```bash
   # Should return: {"status":"ok","uptime":...}
   curl https://app-scripting-editor.trackmangolfdev.com/api/health
   
   # Should load the frontend
   curl https://app-scripting-editor.trackmangolfdev.com/
   ```

---

##  Expected Results

After deployment:
-  `/api/health` returns `200 OK` with `{"status":"ok"}`
-  `/` loads the React frontend
-  Frontend can call backend APIs
-  No more 504 Gateway Timeout errors

---

##  How to Verify in Azure

### Check Azure App Service Logs:
```bash
# Stream logs
az webapp log tail \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg

# Should see:
# "Server running on http://localhost:4000"
# "Static frontend directory found at /app/editor-dist"
```

### Check Container Configuration:
```bash
# Verify correct image is deployed
az webapp config container show \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg

# Should show:
# "docker-custom-image-name": "tpsappscriptingacr.azurecr.io/app-scripting-editor-api:latest"
```

### Check App Settings:
```bash
# Verify port is set correctly
az webapp config appsettings list \
  --name tps-app-scripting-editor \
  --resource-group tps-app-scripting-rg \
  --query "[?name=='WEBSITES_PORT'].value" -o tsv

# Should return: 4000
```

---

## ️ Prevention

To prevent this issue in the future:

1. **Add build validation**: Test both Dockerfiles locally before pushing
2. **Add health check monitoring**: Set up Azure Monitor alerts for failed health checks
3. **Document image dependencies**: Clearly note that API image depends on editor image
4. **Add image smoke tests**: Verify both `/api/health` and frontend load in CI

---

##  Additional Notes

### Image Architecture:
- **app-scripting-editor**: Standalone nginx image with React frontend (for testing)
- **app-scripting-editor-api**: Node.js Express server + React frontend (for production)

### Why Two Images?
- Editor image: Fast frontend-only testing and development
- API image: Complete production deployment with backend + frontend

### Port Configuration:
- Express server listens on port **4000**
- Azure App Service `WEBSITES_PORT=4000` routes traffic correctly
- No nginx needed in API image (Express serves static files)

---

##  Checklist

- [x] Fixed `.github/workflows/docker-build.yml` to build both images in order
- [x] Fixed `server/Dockerfile` build context paths
- [x] Documented the issue and solution
- [ ] Commit changes to git
- [ ] Push to trigger deployment
- [ ] Monitor GitHub Actions
- [ ] Verify `/api/health` endpoint
- [ ] Verify frontend loads
- [ ] Update team on resolution

---

**Status**: Ready to deploy! Push the changes to fix the issue. 
