# Base the Image off NODE 10
FROM node:10

# Create app directory
WORKDIR /app

# Install Production dependencies
#COPY package*.json ./
COPY . .
RUN npm ci --only=production

# Build
RUN npm run build

# Bundle app source
COPY . .

# The Default Port for the application
EXPOSE 8000
ENTRYPOINT PORT=8000 NODE_ENV=production node server.js
