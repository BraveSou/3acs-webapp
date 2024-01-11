# Use the official Node.js image as the base image for building the Angular app
FROM node:18.16.1 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the Angular app for production using --configuration
RUN npm run build -- --configuration=production

# Use a smaller, production-ready image
FROM nginx:alpine

# Copy the built app from the builder stage to the NGINX web server
COPY --from=builder /app/dist/three-amigos /usr/share/nginx/html

# NGINX configuration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the NGINX web server
EXPOSE 80

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]
