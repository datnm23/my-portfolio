#!/bin/bash
source ~/.nvm/nvm.sh
cd ~/projects/my_portfolio
pnpm build > ~/projects/my_portfolio/_build_log.txt 2>&1
echo "EXIT=$?" >> ~/projects/my_portfolio/_build_log.txt
