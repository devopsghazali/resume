#!/usr/bin/env bash
set -euo pipefail
image=${1:-devopsghazali/example:latest}
trivy image "$image"
