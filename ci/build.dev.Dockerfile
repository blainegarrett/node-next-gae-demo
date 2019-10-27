# Base the Image off NODE 10
FROM node:10

# Create app directory in container
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# The Default Port for the application
EXPOSE 8080
ENTRYPOINT PORT=8080 node server.js
