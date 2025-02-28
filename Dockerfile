# Use Node.js LTS version (>= 18.17.0)
FROM node:18.17-alpine

# Set working directory
WORKDIR /app

# Build-time variables
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i 

# Copy the rest of the application code
COPY . /app

# Build the Next.js app
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
