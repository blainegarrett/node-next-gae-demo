# Base the Image off NODE 16
FROM node:16

# Create app directory in container
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# The Default Port for the application
EXPOSE 8000
ENTRYPOINT PORT=8000 npm run dev
