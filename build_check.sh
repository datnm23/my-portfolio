#!/bin/bash
source ~/.nvm/nvm.sh
cd ~/projects/my_portfolio
pnpm build > ~/projects/my_portfolio/build_log.txt 2>&1
echo "EXIT_CODE=$?" >> ~/projects/my_portfolio/build_log.txt
