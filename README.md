# InstaPay - Microservices-Based Payment Platform

A scalable and modular microservices-based platform that facilitates secure and instant money transfers between users.

---

## 🚀 Features

* 🔐 User authentication and authorization (JWT-based)
* 💸 Real-time peer-to-peer money transfers
* 📊 Transaction history and account balance tracking
* 📩 Notification system (RabbitMQ)
* 📈 Dynamic reporting service
* 🖥️ Modern frontend with animations and responsive design

---

## 🧱 Project Structure

```
Instapay_microservices/
├── client/                   # React frontend app
├── user-service/            # User authentication and account service
├── transaction-service/     # Handles transactions and balances
├── report-service/          # Generates financial reports
├── notification-service/    # Sends user notifications (via RabbitMQ)
├── k8s/                     # Kubernetes manifests for all services
├── .env*                    # Environment configurations (dev, prod, staging)
├── docker-compose*.yml      # Compose files for multi-environment orchestration
├── start-k8s.sh             # Script to start services with Kubernetes
├── end-k8s.sh               # Script to stop all K8s services
├── restart-services.sh      # Restarts individual services
├── package.json             # Root Node.js metadata (used for scripts)
└── README.md                # Project documentation
```

---

## ⚙️ Technologies

### Backend

* Node.js + Express
* MongoDB
* RabbitMQ (messaging)
* JWT for authentication

### Frontend

* React + Vite
* Redux Toolkit
* Tailwind CSS + Framer Motion

### DevOps

* Docker & Docker Compose
* Kubernetes (K8s)
* NGINX Ingress Controller

---

## 🛠️ Getting Started (Development)

### Prerequisites

* Docker + Docker Compose
* Node.js (v18+)
* kubectl (if using Kubernetes)
* Minikube / Local K8s cluster

### Setup (Docker Compose)

```bash
# Clone the repo
$ git clone https://github.com/MazenMostafa2025/Instapay_microservices.git
$ cd Instapay_microservices

# Create .env files (examples provided)
$ cp .env.dev .env

# Run all services with both env files
$ docker-compose \
  --env-file .env \
  -f docker-compose.yml \
  --env-file .env.dev \
  -f docker-compose.dev.yml \
  up --build
```

### Setup (Kubernetes)

```bash
# Start local cluster (Minikube or similar)
$ ./start-k8s.sh

# Stop the cluster
$ ./end-k8s.sh
```

---

## 🌐 Accessing the App

Once running:

* Frontend: [http://mini-instapay.com](http://mini-instapay.com)
* APIs: accessible via internal service names or through the Ingress at [http://mini-instapay.com/api](http://instapay.local/api)

Ensure `mini-instapay.com` is added to your `/etc/hosts` if not using a public DNS.

```
127.0.0.1 mini-instapay.com
```

---

## 📁 Environment Variables

Set appropriate values in the respective `.env` files:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/userdb
JWT_SECRET=your_jwt_secret
RABBITMQ_URL=amqp://rabbitmq:5672
...
```

---

## 📦 Deployment (Production)

1. Configure `.env.prod`
2. Use `docker-compose.prod.yml` for production builds:

```bash
$ docker-compose -f docker-compose.prod.yml up -d --build
```

3. For cloud deployment, adapt the Kubernetes manifests in `k8s/` for your cloud provider (GKE, EKS, etc.)

---

## 🔍 Troubleshooting

* **Frontend shows `/undefined/api` URLs?**
  * Check `VITE_USER_SERVICE_URL` and other env vars in `vite.config.js`

* **Ingress not resolving?**
  * Make sure `instapay.local` is mapped in `/etc/hosts`

* **MongoDB or RabbitMQ not connecting?**
  * Ensure services are properly linked in Docker/K8s and wait for pods to be `Ready`