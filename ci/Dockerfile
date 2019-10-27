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
EXPOSE 3000
ENTRYPOINT [ "node", "server.js" ]
