# Use a stable version of Node.js with Debian
FROM node:20-buster

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the application port
EXPOSE ${NODE_PORT}

# Start the application
CMD ["node", "src/index.js"]
