# InstaPay - Microservices-Based Payment Platform

InstaPay is a scalable and modular microservices-based platform designed to enable secure and real-time money transfers between users.

---

## 🚀 Key Features

- 🔐 Secure user authentication and authorization (JWT-based)
- 💸 Real-time peer-to-peer transactions
- 📊 Account balance and transaction history tracking
- 📩 Notification service powered by RabbitMQ
- 📈 Dynamic financial reporting
- 🖥️ Modern, responsive frontend with animations

---

## 🧱 Project Structure

```
Instapay_microservices/
├── client/                   # React frontend
├── user-service/            # Authentication and account management
├── transaction-service/     # Handles money transfers
├── report-service/          # Generates user reports
├── notification-service/    # Sends transaction alerts
├── k8s/                     # Kubernetes manifests
├── .env                     # Environment variable files
├── docker-compose*.yml      # Compose configurations for different environments
├── start-k8s.sh             # Start services on Kubernetes
├── end-k8s.sh               # Stop Kubernetes services
├── restart-services.sh      # Restart individual services
├── package.json             # Project metadata
└── README.md                # Project documentation
```

---

## ⚙️ Technologies Used

### Backend

- Node.js + Express
- MongoDB
- RabbitMQ
- JWT

### Frontend

- React + Vite
- Redux Toolkit
- Tailwind CSS + Framer Motion

### DevOps

- Docker & Docker Compose
- Kubernetes (K8s)
- NGINX Ingress Controller

---

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

---

## 🛠️ Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (v18+)
- kubectl and Minikube (for Kubernetes setup)

### Local Setup (Docker Compose)

```bash
# Clone the project
git clone https://github.com/MazenMostafa2025/Instapay_microservices.git
cd Instapay_microservices

# Create env file
touch .env
```

### Kubernetes Setup

```bash
# Start local cluster
./start-k8s.sh

# Stop the cluster
./end-k8s.sh
```

---

## 🌐 Application Access

- Frontend: [http://mini-instapay.com](http://mini-instapay.com)
- APIs: Accessible via internal service names or via [http://mini-instapay.com/api](http://mini-instapay.com/api)

> Ensure `mini-instapay.com` is mapped in `/etc/hosts`:
```
127.0.0.1 mini-instapay.com
```

---

## 📁 Environment Variables

Set the following variables in the appropriate `.env` file:

```
# MongoDB URIs
MONGO_URI_USER=mongodb://user-mongo:27017/userdb
MONGO_URI_TRANSACTION=mongodb://transaction-mongo:27017/transactiondb
MONGO_URI_REPORT=mongodb://report-mongo:27017/reportdb
MONGO_URI_NOTIFICATION=mongodb://notification-mongo:27017/notificationdb

# RabbitMQ
RABBITMQ_URL=amqp://rabbitmq

# JWT
JWT_SECRET=your_jwt_secret_here
...
```

---

## 📦 Multi-Environment Configuration

Use Docker Compose with environment-specific overrides:

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# Staging
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d --build

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

---

## 🔍 Troubleshooting

- **Frontend shows `/undefined/api`?**
  - Check `VITE_USER_SERVICE_URL` and related variables in `vite.config.js`.

- **Ingress not working?**
  - Confirm `mini-instapay.com` is set in `/etc/hosts`.

- **MongoDB or RabbitMQ connection issues?**
  - Ensure containers are properly linked and pods are in a `Ready` state.
