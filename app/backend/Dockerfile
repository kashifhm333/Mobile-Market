FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY app/backend/package*.json ./app/backend/
COPY app/frontend/package*.json ./app/frontend/

RUN npm install --omit=dev

COPY app/backend ./app/backend

WORKDIR /app/app/backend

EXPOSE 5000

CMD ["node", "src/server.js"]
