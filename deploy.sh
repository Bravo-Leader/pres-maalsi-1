#!/bin/bash
set -e

VPS_USER="${1:-root}"
VPS_HOST="${2:?Fournir l'IP/host du VPS: ./deploy.sh user host}"
VPS_PATH="/opt/good-food-v2"
CONTAINER="good-food-v2"
PORT=8084

echo "==> Sync fichiers vers $VPS_USER@$VPS_HOST:$VPS_PATH"
rsync -avz --delete \
  --exclude='.git' \
  --exclude='*.md' \
  presentation/ "$VPS_USER@$VPS_HOST:$VPS_PATH/"

echo "==> Build et redemarrage du container"
ssh "$VPS_USER@$VPS_HOST" bash <<EOF
  set -e
  cd $VPS_PATH
  docker build -t $CONTAINER .
  docker rm -f $CONTAINER 2>/dev/null || true
  docker run -d \
    --name $CONTAINER \
    --restart unless-stopped \
    -p $PORT:80 \
    $CONTAINER
  echo "Container demarre sur port $PORT"
  docker ps | grep $CONTAINER
EOF

echo ""
echo "==> Deploiement termine !"
echo "    Ajoute dans NPM (Advanced du proxy host good-food.rookit.fr) :"
echo ""
echo "    location /v2/ {"
echo "        proxy_pass http://172.17.0.1:$PORT/;"
echo "        proxy_set_header Host \$host;"
echo "        proxy_set_header X-Real-IP \$remote_addr;"
echo "    }"
