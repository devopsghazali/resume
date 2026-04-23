#!/usr/bin/env bash
set -euo pipefail
systemctl status ssh || true
journalctl -n 20 --no-pager || true
