#!/bin/bash
set -e

echo "Applying secrets..."
kubectl apply -f k8s/secrets.yaml

echo "Applying RabbitMQ deployment..."
kubectl apply -f k8s/rabbitmq-depl.yaml

echo "Waiting for RabbitMQ pod to be ready..."
kubectl wait --for=condition=Ready pod -l app=rabbitmq --timeout=300s

echo "Applying MongoDB deployments..."
kubectl apply -f k8s/notification-mongo-depl.yaml
kubectl apply -f k8s/report-mongo-depl.yaml
kubectl apply -f k8s/transaction-mongo-depl.yaml
kubectl apply -f k8s/user-mongo-depl.yaml

echo "Waiting for MongoDB pods to be ready..."
kubectl wait --for=condition=Ready pod -l app=mongodb --timeout=300s

echo "Applying services..."
kubectl apply -f k8s/notification-service-depl.yaml
kubectl apply -f k8s/report-service-depl.yaml
kubectl apply -f k8s/transaction-service-depl.yaml
kubectl apply -f k8s/user-service-depl.yaml
kubectl apply -f k8s/client-service-depl.yaml

echo "Applying ingress..."
kubectl apply -f k8s/ingress.yaml

echo "Deployment complete!"
