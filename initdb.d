#!/usr/bin/env bash

set -e

psql -v
ON_ERROR_STOP=1
--username "$POSTGRES_USER"
--dbname "$DB_NAME" <<-EOSQL
CREATE DATABASE air_quality_database ENCODING UTF8;
EOSQL
