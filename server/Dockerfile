# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

RUN corepack enable

COPY ./pnpm-lock.yaml ./ 
COPY ./server/package.json ./
COPY ./pnpm-workspace.yaml ./

RUN pnpm install

COPY ./server/ ./server/

WORKDIR /app/server

# Build the NestJS application
RUN /app/node_modules/.bin/nest build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/main"]