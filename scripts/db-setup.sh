#!/usr/bin/env bash
set -euo pipefail

# Aguarda healthcheck do container MySQL (4rate-db) ficar OK
echo "Aguardando MySQL ficar disponível..."
for i in {1..30}; do
  if docker exec 4rate-db mysqladmin ping -h 127.0.0.1 -p"${DB_PASSWORD}" 2>/dev/null | grep -q "mysqld is alive"; then
    echo "MySQL está pronto"
    exit 0
  fi
  sleep 2
done

echo "MySQL não ficou pronto" >&2
exit 1
