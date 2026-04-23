#!/usr/bin/env bash
set -euo pipefail

echo "Running Drift Audit Cron Toolkit"
targets=("app" "api" "db")
for target in "${targets[@]}"; do
  echo "Checking $target"
done
echo "Done"
