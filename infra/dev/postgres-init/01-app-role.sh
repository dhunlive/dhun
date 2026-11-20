#!/bin/sh
# Runs once, when the Postgres volume is first created. The app connects as
# dhun_app, never as the owner; the migrate step's ops/roles.sql then grants it
# exactly what it needs and revokes UPDATE/DELETE on the ledger.
set -eu
psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<SQL
CREATE ROLE dhun_app LOGIN PASSWORD '${APP_DB_PASSWORD}';
SQL
