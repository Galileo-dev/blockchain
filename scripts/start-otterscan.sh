#!/bin/bash

# Configurable variables
CONTAINER_NAME="otterscan"
HOST_PORT=5100
CONTAINER_PORT=80
ERIGON_URL="http://localhost:8545"
IMAGE_NAME="otterscan/otterscan"
IMAGE_VERSION="v2.3.0"

# Run the Docker container
docker run --rm \
    --name $CONTAINER_NAME \
    -d \
    -p $HOST_PORT:$CONTAINER_PORT \
    --env ERIGON_URL="$ERIGON_URL" \
    --env OTS2=true \
    $IMAGE_NAME:$IMAGE_VERSION
