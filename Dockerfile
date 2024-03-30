# Use an official Node.js runtime as a base image
FROM node:18.16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the local project files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 5173

# Start the application
CMD ["yarn", "dev"]
