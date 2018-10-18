#!/bin/bash

show_help() {
    echo "Usage: deploy_eks.sh"
    echo ""
    echo "Required environment variables:"
    echo "$REGISTRY_URL"
    echo "$REGISTRY_USER"
    echo "$REGISTRY_SECRET"
    echo "$KUBE_NAMESPACE"
}


while [[ $1 == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      -*) echo "invalid option: $1" 1>&2; show_help; exit 1;;
    esac
done

docker pull nginx:stable-alpine

docker=$(which docker)

echo "Logging docker into $REGISTRY_URL"

$docker login $REGISTRY_URL -u $REGISTRY_USER -p $REGISTRY_SECRET
kubectl create secret docker-registry sphereonregistrydev --docker-server $REGISTRY_URL --docker-username $REGISTRY_USER --docker-password $REGISTRY_SECRET --docker-email scrum@sphereon.com --namespace=$KUBE_NAMESPACE

$docker build -t traill.com/alfresco/adf-demo:latest .
$docket tag traill.com/alfresco/adf-demo:latest $REGISTRY_URL/alfresco/adf-demo
$docker push $REGISTRY_URL/alfresco/adf-demo:latest

kubectl run alfresco-adf-demo \
--image $REGISTRY_URL/alfresco/adf-demo:latest \
--port 4200
