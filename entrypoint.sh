#!/bin/sh
# entrypoint.sh

# Directory where the site content should be
TARGET_DIR="/usr/share/nginx/html"
REPO_URL="https://github.com/Bravo-Leader/pres-maalsi-1.git"

echo "[Entrypoint] Starting..."

# Check if the .git directory exists
if [ -d "$TARGET_DIR/.git" ]; then
    echo "[Entrypoint] Repository exists. Pulling latest changes from main..."
    cd "$TARGET_DIR" || exit 1
    # Reset any local changes to ensure clean pull
    git reset --hard
    git pull origin main
else
    echo "[Entrypoint] Repository not found. Cloning from $REPO_URL..."
    # Clear directory if it contains only default nginx files (optional safety check needed in prod)
    # For now, we assume we can clone into it if empty or overwrite.
    # To clone into non-empty dir, we might need to use a temp dir or init/fetch.
    # Safest: Clone to temp and move, or rely on volume being empty initially.
    
    # Cleaning default nginx files to allow clone
    rm -rf "$TARGET_DIR"/*
    
    git clone "$REPO_URL" "$TARGET_DIR"
fi

# Correct permissions if needed (usually nginx runs as root in alpine or nginx user)
# chown -R nginx:nginx "$TARGET_DIR"

echo "[Entrypoint] Starting Nginx..."
# Execute the CMD from the Dockerfile (which is "nginx", "-g", "daemon off;")
exec "$@"

