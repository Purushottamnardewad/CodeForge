#!/bin/bash
echo "=== Railway Deployment Debug ==="
echo "Current working directory: $(pwd)"
echo "Directory contents:"
ls -la
echo ""
echo "Backend directory exists:"
ls -la backend/ || echo "Backend directory not found!"
echo ""
echo "Backend package.json exists:"
ls -la backend/package.json || echo "Backend package.json not found!"
echo ""
echo "Backend dist directory:"
ls -la backend/dist/ || echo "Backend dist directory not found!"
echo ""
echo "Changing to backend directory..."
cd backend
echo "New working directory: $(pwd)"
echo "Installing dependencies..."
npm ci --only=production
echo "Starting server..."
node dist/server.js