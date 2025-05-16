#!/bin/bash
set -e

# === CONFIG ===
IMAGE_NAME="bishoysedra/client-frontend"
ENVIRONMENT="production"
K8S_DEPLOYMENT="client"
DEPLOYMENT_FILE="k8s/client-service-depl.yaml"
INGRESS_APIS="k8s/apis-ingress.yaml"
INGRESS_FRONTEND="k8s/frontend-ingress.yaml"

# === BUILD AND PUSH IMAGE ===
echo "🚀 Building Docker image for $ENVIRONMENT..."
docker build -t $IMAGE_NAME:$ENVIRONMENT --build-arg VITE_MODE=$ENVIRONMENT ./client

echo "📤 Pushing image to Docker Hub..."
docker push $IMAGE_NAME:$ENVIRONMENT

# === UPDATE DEPLOYMENT IMAGE ===
echo "📦 Updating Kubernetes deployment image..."
kubectl set image deployment/$K8S_DEPLOYMENT $K8S_DEPLOYMENT=$IMAGE_NAME:$ENVIRONMENT

# === ROLLING RESTART ===
echo "🔁 Restarting deployment..."
kubectl rollout restart deployment $K8S_DEPLOYMENT

# === WAIT FOR ROLLOUT ===
echo "⏳ Waiting for deployment to be available..."
kubectl wait --for=condition=Available deployment/$K8S_DEPLOYMENT --timeout=300s

# === APPLY INGRESS ===
echo "🌐 Reapplying ingress..."
kubectl apply -f $INGRESS_APIS
kubectl apply -f $INGRESS_FRONTEND

echo "✅ Done! $ENVIRONMENT deployment is live."
