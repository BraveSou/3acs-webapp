# this is the file responsible for creating an image and pushing it to a docker container in azure
# this file creates the front end docker container which is from here referred to as the webapp or the front end

# Dockerfile

# Stage 1: Build Angular app
FROM node:18.16.1 as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:latest

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app
COPY --from=build /app/dist/three-amigos /usr/share/nginx/html

# Expose port
EXPOSE 80
