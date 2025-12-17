FROM nginx:alpine

# Install git
RUN apk add --no-cache git

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy entrypoint script
COPY entrypoint.sh /docker-entrypoint.d/99-git-sync.sh
RUN chmod +x /docker-entrypoint.d/99-git-sync.sh

# Nginx alpine image runs scripts in /docker-entrypoint.d/ automatically before starting nginx
# However, the default entrypoint behavior might not pass arguments correctly if we override it completely.
# The official nginx:alpine image entrypoint runs scripts in /docker-entrypoint.d/
# So we don't strictly need to override ENTRYPOINT if we put our script there.
# BUT, we need to make sure it runs git pull.

# NOTE: The default 99-git-sync.sh will be executed by the default /docker-entrypoint.sh
# We just need to make sure it does what we want.

