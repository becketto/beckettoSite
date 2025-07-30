#!/bin/bash

# Deploy script for becketto site
# Usage: ./deploy.sh

set -e  # Exit on any error

echo "Starting deployment to bravoapps.dev..."

# SSH into the server and run deployment commands
ssh 'beckett@ssh.bravoapps.dev' << 'EOF'
    echo "Connected to server, starting deployment..."
    
    # Navigate to project directory
    cd ~/projects/beckettoSite
    
    # Pull latest changes
    echo "Pulling latest changes from git..."
    git pull
    
    # Use Node.js 20
    echo "Setting Node.js version to 20..."
    nvm use 20
    
    # Build the project
    echo "Building the project..."
    npm run build
    
    # Restart the PM2 process
    echo "Restarting PM2 process..."
    pm2 restart beckettoSite
    
    echo "Deployment completed successfully!"
EOF

echo "Deployment script finished."