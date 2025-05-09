# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass mode through ARG and use it during build
ARG VITE_MODE=production
ENV VITE_MODE=${VITE_MODE}

RUN npm run build -- --mode ${VITE_MODE}

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]