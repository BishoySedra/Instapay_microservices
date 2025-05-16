# Stage 1: Build
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Install dependencies only when needed
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Pass mode through ARG and use it during build
ARG VITE_MODE=production
ENV VITE_MODE=${VITE_MODE}

# Build the application
RUN npm run build:${VITE_MODE}

# Stage 2: Serve
FROM nginx:alpine

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]