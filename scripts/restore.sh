#!/usr/bin/env bash
set -euo pipefail
: "${DATABASE_URL:?Set DATABASE_URL to an empty target database}"
: "${BACKUP_DIR:?Set BACKUP_DIR}"
pg_restore --exit-on-error --no-owner --dbname="$DATABASE_URL" "$BACKUP_DIR/database.dump"
if [ -f "$BACKUP_DIR/documents.tar.gz" ]; then mkdir -p "${UPLOAD_DIR:-uploads}"; tar -xzf "$BACKUP_DIR/documents.tar.gz" -C "${UPLOAD_DIR:-uploads}"; fi
