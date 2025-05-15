#!/bin/bash
set -e

echo "-----------------------"
echo "Restarting services... |"
echo "-----------------------"

SERVICES=(
  notification
  report
  transaction
  user
)

for svc in "${SERVICES[@]}"; do
  echo "Restarting $svc..."
  kubectl rollout restart deployment $svc-service
done

kubectl rollout restart deployment client

echo "------------------------------------"
echo "Waiting for services to be ready... |"
echo "------------------------------------"

kubectl wait --for=condition=Available deployment/notification-service --timeout=300s
kubectl wait --for=condition=Available deployment/report-service --timeout=300s
kubectl wait --for=condition=Available deployment/transaction-service --timeout=300s
kubectl wait --for=condition=Available deployment/user-service --timeout=300s
kubectl wait --for=condition=Available deployment/client --timeout=300s

echo "-------------------"
echo "Re-applying ingress...|"
echo "-------------------"

kubectl apply -f k8s/apis-ingress.yaml

sleep 10

kubectl apply -f k8s/frontend-ingress.yaml

echo "----------------------"
echo "Restart complete!     |"
echo "----------------------"
