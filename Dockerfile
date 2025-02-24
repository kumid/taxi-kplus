# Use the official Node.js image from Docker Hub as the base image
FROM node:20.15.0-alpine AS base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) for dependency installation
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY server/ .

# Build the NestJS application (if you have a build step)
RUN npm run build

# Expose the port your NestJS app is running on (typically 3000)
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]
