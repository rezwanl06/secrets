# Use an official Node.js runtime as a parent image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for the server to the working directory
COPY server/package*.json ./server/
# Install server dependencies
RUN cd ./server && npm install

# Copy package.json and package-lock.json for the client to the working directory
COPY client/package*.json ./client/
# Install client dependencies
RUN cd ./client && npm install

# Copy the client and server code to the working directory
COPY ./client ./client
COPY ./server ./server

# Copy the .env.example file to the server directory
COPY server/.env ./server/.env

# Make ports 3000 and 5000 available to the world outside this container
EXPOSE 3000
EXPOSE 5000

# Define environment variable
ENV NODE_ENV=production

# Command to run your application
CMD ["sh", "-c", "cd server && npm run server"]
