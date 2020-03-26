#!/bin/bash

if [[ ! ("$#" == 1) ]]; then
    echo "Usage: $0 <image-tag>>"
    echo ""
    echo "Required environment variables:"
    echo "\$REGISTRY_URL"
    echo "\$REGISTRY_USER"
    echo "\$REGISTRY_SECRET"
    exit 1
fi

docker=$(which docker)

tag=$1

echo "Logging docker into $REGISTRY_URL"
$docker login $REGISTRY_URL -u $REGISTRY_USER -p $REGISTRY_SECRET || exit;

echo "Building and uploading docker image"
$docker build -t triall.com/alfresco/adf-demo:$tag .
$docker tag triall.com/alfresco/adf-demo:$tag $REGISTRY_URL/alfresco/adf-demo:$tag
$docker push $REGISTRY_URL/alfresco/adf-demo:$tag
