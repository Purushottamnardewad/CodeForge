# Vercel Environment Variables Configuration

## Required Environment Variables for Vercel Dashboard:

### 1. Go to your Vercel project dashboard
### 2. Click on Settings tab
### 3. Click on Environment Variables
### 4. Add these variables:

**Variable 1:**
Name: VITE_API_BASE_URL
Value: https://codeforge-production-c64c.up.railway.app/api
Environment: All (Production, Preview, Development)

**Variable 2:**
Name: VITE_APP_NAME  
Value: CodeForge
Environment: All (Production, Preview, Development)

### 5. After adding variables, redeploy the project

## Debug Steps:
1. Add environment variables in Vercel dashboard
2. Trigger new deployment
3. Check browser console for API calls
4. Verify the correct base URL is being used

## Current Status:
- Backend API: ✅ Working (https://codeforge-production-c64c.up.railway.app/api)
- Frontend Build: ✅ Working
- Issue: Frontend not connecting to correct backend URL
