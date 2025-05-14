# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass mode through ARG and use it during build
ARG VITE_MODE=production
ENV VITE_MODE=${VITE_MODE}

RUN npm run build:${VITE_MODE}

# Stage 2: Serve
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx when the container launches
# Use the command to run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]