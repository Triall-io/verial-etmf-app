#!/bin/bash

export KUBE_DEPLOYMENT_NAME=alfresco-factom-demo

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

docker=$(which docker)

sudo $docker pull nginx:stable-alpine
echo "Logging docker into $REGISTRY_URL"
sudo $docker login $REGISTRY_URL -u $REGISTRY_USER -p $REGISTRY_SECRET
kubectl create secret docker-registry sphereonregistrydev --docker-server $REGISTRY_URL --docker-username $REGISTRY_USER --docker-password $REGISTRY_SECRET --docker-email scrum@sphereon.com --namespace=$KUBE_NAMESPACE

echo "Building and uploading docker image"
sudo $docker build -t triall.com/alfresco/adf-factom-demo:latest .
sudo $docker tag triall.com/alfresco/adf-factom-demo:latest $REGISTRY_URL/alfresco/adf-factom-demo
sudo $docker push $REGISTRY_URL/alfresco/adf-factom-demo:latest

echo "Deleting old deployment $KUBE_DEPLOYMENT_NAME"
kubectl -n $KUBE_NAMESPACE delete deployment $KUBE_DEPLOYMENT_NAME
sleep 10
echo "Creating new deployment $KUBE_DEPLOYMENT_NAME"
kubectl -n $KUBE_NAMESPACE create configmap triall-app-config --from-file=src/app.config.json
kubectl apply -f scripts/alfresco-adf-deployment.yaml
kubectl -n $KUBE_NAMESPACE expose deployment alfresco-factom-demo --port=80 --name=alfresco-factom-demo
kubectl -n $KUBE_NAMESPACE label service alfresco-factom-demo app=alfresco-factom-demo
kubectl -n $KUBE_NAMESPACE apply -f scripts/alfresco-adf-ingress.yaml
