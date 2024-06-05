#!/bin/sh
cd "$(dirname "$0")/../contracts"

source .env

forge script --legacy --chain sepolia script/DeployTestnet.s.sol:MyScript --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast