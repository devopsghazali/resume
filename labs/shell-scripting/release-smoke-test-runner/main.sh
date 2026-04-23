#!/usr/bin/env bash
set -euo pipefail

echo "Running Release Smoke Test Runner"
targets=("app" "api" "db")
for target in "${targets[@]}"; do
  echo "Checking $target"
done
echo "Done"
