#!/usr/bin/env bash
set -euo pipefail

echo "Running Backup and Rotation Guard"
targets=("app" "api" "db")
for target in "${targets[@]}"; do
  echo "Checking $target"
done
echo "Done"
