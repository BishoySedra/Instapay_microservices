# Stage 1: Build dependencies
FROM node:22-alpine

# RUN npm install -g nodemon

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Run app
CMD ["npm", "run", "start"]
