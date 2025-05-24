#!/usr/bin/env bash
set -euo pipefail
COMPOSE="docker compose -f docker-compose/docker-compose.yml"

echo "Building and launching containers…"
$COMPOSE up -d --build

echo "Ensuring PHP dependencies are present…"
$COMPOSE exec -T api test -f vendor/autoload.php || \
    $COMPOSE exec -T api composer install --prefer-dist

echo "Ensuring JS dependencies are present…"
$COMPOSE exec -T web test -d node_modules || \
$COMPOSE exec -T web npm ci

echo "Running key-generate and migrations…"
$COMPOSE exec -T api php artisan key:generate --force
$COMPOSE exec -T api php artisan migrate --seed --force

echo -e "\nReady:"
echo "   API   → http://localhost:8000"
echo "   React → http://localhost:5173"
echo "   Exit this shell to stop and remove the stack."
trap "$COMPOSE down" EXIT
$COMPOSE exec api sh
