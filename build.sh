#!/bin/bash
source ~/.nvm/nvm.sh
cd ~/projects/my_portfolio
echo "=== Installing dependencies ==="
pnpm install 2>&1
echo "=== Building project ==="
pnpm build 2>&1
echo "=== Build complete ==="
