#!/bin/bash

# Deploy script for becketto site
# Usage: ./deploy.sh

set -e  # Exit on any error

echo "Starting deployment to bravoapps.dev..."

# SSH into the server and run deployment commands
ssh 'beckett@ssh.bravoapps.dev' << 'EOF'
    echo "Connected to server, starting deployment..."
    
    # Navigate to project directory
    cd ~/projects/beckettoSite || { echo "Failed to navigate to project directory"; exit 1; }
    
    # Pull latest changes
    echo "Pulling latest changes from git..."
    git pull || { echo "Git pull failed"; exit 1; }
    
    # Install dependencies
    echo "Installing dependencies..."
    npm install || { echo "npm install failed"; exit 1; }
    
    # Use Node.js 20 (if nvm is available, otherwise use system node)
    echo "Setting Node.js version to 20..."
    if command -v nvm &> /dev/null; then
        nvm use 20
    else
        echo "nvm not found, using system Node.js version:"
        node --version
    fi
    
    # Build the project
    echo "Building the project..."
    npm run build
    
    # Restart the PM2 process (if PM2 is available)
    echo "Restarting PM2 process..."
    if command -v pm2 &> /dev/null; then
        pm2 restart beckettoSite || echo "PM2 restart failed, but continuing..."
    else
        echo "PM2 not found, skipping process restart"
        echo "You may need to manually restart your application server"
    fi
    
    echo "Deployment completed successfully!"
EOF

echo "Deployment script finished."