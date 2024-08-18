# Use the official Node.js v20.15.1 image as a base image
FROM node:20.15.1

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Define the command to run your application
CMD ["npm", "start"]
