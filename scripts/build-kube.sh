#!/bin/bash

show_help() {
    echo "Usage: build-kube.sh <image-tag>"
    echo ""
    echo "Required environment variables:"
    echo "$REGISTRY_URL"
    echo "$REGISTRY_USER"
    echo "$REGISTRY_SECRET"
}


while [[ $1 == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      -*) echo "invalid option: $1" 1>&2; show_help; exit 1;;
    esac
done

docker=$(which docker)

tag=$1

echo "Logging docker into $REGISTRY_URL"
$docker login $REGISTRY_URL

echo "Building and uploading docker image"
$docker build -t triall.com/alfresco/adf-demo:$tag .
$docker tag triall.com/alfresco/adf-demo:$tag $REGISTRY_URL/alfresco/adf-demo
$docker push $REGISTRY_URL/alfresco/adf-demo:$tag
