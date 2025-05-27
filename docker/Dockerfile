# Build stage
FROM node:20


WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./
# Install dependencies
RUN yarn install

# Copy source code
COPY --chown=node:node . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3001