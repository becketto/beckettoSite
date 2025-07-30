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
    
    # Restart the PM2 process (try multiple approaches)
    echo "Restarting PM2 process..."
    
    # Try to source common profile files to ensure PM2 is in PATH
    if [ -f ~/.bashrc ]; then source ~/.bashrc; fi
    if [ -f ~/.profile ]; then source ~/.profile; fi
    if [ -f ~/.nvm/nvm.sh ]; then source ~/.nvm/nvm.sh; fi
    
    # Check if PM2 is available and restart
    if command -v pm2 &> /dev/null; then
        echo "Found PM2, attempting to restart beckettoSite..."
        pm2 restart beckettoSite || echo "PM2 restart failed, but continuing..."
        pm2 status beckettoSite
    elif [ -f ~/.npm-global/bin/pm2 ]; then
        echo "Found PM2 in ~/.npm-global/bin, attempting to restart..."
        ~/.npm-global/bin/pm2 restart beckettoSite || echo "PM2 restart failed, but continuing..."
    elif [ -f ~/node_modules/.bin/pm2 ]; then
        echo "Found PM2 in local node_modules, attempting to restart..."
        ~/node_modules/.bin/pm2 restart beckettoSite || echo "PM2 restart failed, but continuing..."
    else
        echo "PM2 not found in common locations, skipping process restart"
        echo "You may need to manually restart your application server"
        echo "Current PATH: $PATH"
    fi
    
    echo "Deployment completed successfully!"
EOF

echo "Deployment script finished."