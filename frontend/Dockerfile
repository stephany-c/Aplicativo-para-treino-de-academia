# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the project for production
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built assets from the build stage
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
