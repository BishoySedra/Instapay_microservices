# InstaPay - microservices-based

A microservices-based payment platform that enables secure and instant money transfers between users.

## Features

- Secure user authentication and authorization
- Real-time money transfers between users
- Transaction history tracking
- Account balance management
- Notifications for transactions
- Comprehensive reporting system

## Architecture

The application is built using a microservices architecture with the following services:

- **User Service**: Handles user management, authentication, and account operations
- **Transaction Service**: Manages money transfers and transaction processing
- **Report Service**: Generates financial reports and analytics
- **Notification Service**: Handles notifications for transactions
- **Frontend**: React-based user interface

## Technologies

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - RabbitMQ
  - JWT Authentication

- **Frontend**:
  - React
  - Redux
  - Tailwind CSS
  - Framer Motion

## Prerequisites

- Docker and Docker Compose
- Node.js 18+
- MongoDB
- RabbitMQ

## Environment Setup

Create the following environment files with appropriate values:

- `.env.dev` - Development environment variables
- `.env.staging` - Staging environment variables
- `.env.prod` - Production environment variables

## Running the Application

### Development Environment
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```

### Staging Environment
```sh
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up --build -d
```

### Production Environment
```sh
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

## API Documentation

### User Service (Port 3001)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/users/me` - Get user profile
- `PUT /api/users/update` - Update user balance

### Transaction Service (Port 3002)
- `POST /api/transaction/send` - Send money
- `GET /api/transaction` - Get user transactions
- `GET /api/transaction/:id` - Get transaction by ID

### Report Service (Port 3003)
- `GET /api/reports/summary` - Get transaction summary

### Notification Service (Port 3004)
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/:id` - Get notification by ID

## Kubernetes Deployment

The application can be deployed to Kubernetes using the manifests in the `k8s` directory:

```sh
kubectl apply -f k8s/
```
