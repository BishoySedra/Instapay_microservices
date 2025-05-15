#!/bin/bash
set -e

echo "Deleting ingress..."

kubectl delete -f k8s/frontend-ingress.yaml
kubectl delete -f k8s/apis-ingress.yaml

echo "Deleting services..."

kubectl delete -f k8s/notification-service-depl.yaml
kubectl delete -f k8s/report-service-depl.yaml
kubectl delete -f k8s/transaction-service-depl.yaml
kubectl delete -f k8s/user-service-depl.yaml
kubectl delete -f k8s/client-service-depl.yaml

echo "Deleting MongoDB deployments..."

kubectl delete -f k8s/notification-mongo-depl.yaml
kubectl delete -f k8s/report-mongo-depl.yaml
kubectl delete -f k8s/transaction-mongo-depl.yaml
kubectl delete -f k8s/user-mongo-depl.yaml

echo "Deleting RabbitMQ deployment..."

kubectl delete -f k8s/rabbitmq-depl.yaml

echo "Deleting secrets..."

kubectl delete -f k8s/secrets.yaml

echo "Undeployment complete!"
