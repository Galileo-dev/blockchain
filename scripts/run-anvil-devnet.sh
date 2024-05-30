#!/bin/sh

anvil --chain-id 1337 &
ANVIL_PID=$!

cd "$(dirname "$0")/../contracts"
forge script script/Deploy.s.sol --broadcast --fork-url http://localhost:8545

wait $ANVIL_PID