#!/usr/bin/env bash
set -e

docker compose -f docker-compose/docker-compose.yml up -d --build

docker exec -it new-api php artisan key:generate --force
docker exec -it new-api php artisan migrate --seed --force

echo -e "\nReady!  API → http://localhost:8000   React → http://localhost:5173"
