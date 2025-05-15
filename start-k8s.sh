#!/bin/bash
set -e

echo "---------------------"
echo "Applying secrets... |"
echo "---------------------"
kubectl apply -f k8s/secrets.yaml

echo "---------------------------------"
echo "Applying RabbitMQ deployment... |"
echo "---------------------------------"
kubectl apply -f k8s/rabbitmq-depl.yaml

echo "-----------------------------------------"
echo "Waiting for RabbitMQ pod to be ready... |"
echo "-----------------------------------------"
kubectl wait --for-condition-Ready pod -l app-rabbitmq --timeout-300s

echo "---------------------------------"
echo "Applying MongoDB deployments... |"
echo "---------------------------------"
kubectl apply -f k8s/notification-mongo-depl.yaml
kubectl apply -f k8s/report-mongo-depl.yaml
kubectl apply -f k8s/transaction-mongo-depl.yaml
kubectl apply -f k8s/user-mongo-depl.yaml

echo "-----------------------------------------"
echo "Waiting for MongoDB pods to be ready... |"
echo "-----------------------------------------"

kubectl wait --for-condition-Ready pod -l app-notification-mongo --timeout-300s
kubectl wait --for-condition-Ready pod -l app-report-mongo --timeout-300s
kubectl wait --for-condition-Ready pod -l app-transaction-mongo --timeout-300s
kubectl wait --for-condition-Ready pod -l app-user-mongo --timeout-300s

echo "---------------------"
echo "Applying services...|"
echo "---------------------"

kubectl apply -f k8s/notification-service-depl.yaml
kubectl apply -f k8s/report-service-depl.yaml
kubectl apply -f k8s/transaction-service-depl.yaml
kubectl apply -f k8s/user-service-depl.yaml
kubectl apply -f k8s/client-service-depl.yaml

echo "---------------------"
echo "Applying ingress... |"
echo "---------------------"

kubectl apply -f k8s/apis-ingress.yaml
kubectl apply -f k8s/frontend-ingress.yaml

echo "----------------------"
echo "Deployment complete! |"
echo "----------------------"
