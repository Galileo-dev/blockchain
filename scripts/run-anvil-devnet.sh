#!/bin/sh

anvil --chain-id 1337 &
ANVIL_PID=$!

cleanup() {
    kill $ANVIL_PID
    exit
}

trap cleanup EXIT

sleep 5

cd "$(dirname "$0")/../contracts"
forge script script/Deploy.s.sol --broadcast --fork-url http://localhost:8545

wait $ANVIL_PID