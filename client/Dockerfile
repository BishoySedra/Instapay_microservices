# Stage 1: Build
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Pass mode through ARG and use it during build
ARG VITE_MODE=production
ENV VITE_MODE=${VITE_MODE}

# Build the frontend based on the mode
RUN npm run build:${VITE_MODE}

# Stage 2: Serve
FROM nginx:alpine
# Copy the built files from the build stage to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
