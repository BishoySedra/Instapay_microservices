# Instapay-Microservices-Architecture

## Build and Run Commands

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
