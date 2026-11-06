#!/usr/bin/env bash
set -euo pipefail
: "${DATABASE_URL:?Set DATABASE_URL}"
: "${BACKUP_DIR:?Set BACKUP_DIR to a private backup directory}"
umask 077
mkdir -p "$BACKUP_DIR"
target="$(mktemp -d "$BACKUP_DIR/.incomplete-$(date -u +%Y%m%dT%H%M%SZ)-XXXXXX")"
trap 'if [ -d "$target" ]; then find "$target" -mindepth 1 -maxdepth 1 -type f -delete; rmdir "$target"; fi' EXIT
pg_dump --format=custom --file="$target/database.dump" "$DATABASE_URL"
if [ -d "${UPLOAD_DIR:-uploads}" ]; then tar -czf "$target/documents.tar.gz" -C "${UPLOAD_DIR:-uploads}" .; fi
final="$BACKUP_DIR/${target##*/.incomplete-}"
mv "$target" "$final"
printf 'Backup written to %s\n' "$final"
