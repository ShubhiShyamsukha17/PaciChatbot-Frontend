# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js app
RUN yarn build

# Start the application
CMD ["yarn", "start"]