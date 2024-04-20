#!/bin/bash

SCRIPT_DIR=$(dirname "$0")
DATA_DIR="$SCRIPT_DIR/../.erigon/data"

ERIGON_REPO_URL="https://github.com/ledgerwatch/erigon.git"
ERIGON_REPO_DIR="$SCRIPT_DIR/../services/erigon"

ERIGON_BIN_DIR="$ERIGON_REPO_DIR/build/bin"
DEVNET_BINARY="$ERIGON_BIN_DIR/devnet"
ERIGON_BINARY="$ERIGON_BIN_DIR/erigon"

if [ ! -d "$ERIGON_REPO_DIR" ]; then
        git clone  --recurse-submodules -j8 "$ERIGON_REPO_URL" "$ERIGON_REPO_DIR"
fi

if [ ! -f "$ERIGON_BINARY" ]; then
        cd "$ERIGON_REPO_DIR"
        make erigon
fi

if [ ! -f "$DEVNET_BINARY" ]; then
        cd "$ERIGON_REPO_DIR"
        make devnet
fi


# use ERIGON_BINARY

# $DEVNET_BINARY \
#         --datadir "$DATA_DIR" 

$ERIGON_BINARY \
        --datadir "$DATA_DIR" \
        --chain=dev \
        --http \
        --http.api "eth,erigon,ots,ots2" \
        --http.corsdomain "*" \
        --http.addr "0.0.0.0" \
        --http.vhosts '*' \
        --mine \
        --experimental.ots2