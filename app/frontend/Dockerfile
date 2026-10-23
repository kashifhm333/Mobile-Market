# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY app/backend/package*.json ./app/backend/
COPY app/frontend/package*.json ./app/frontend/

RUN npm install

COPY app/frontend ./app/frontend

WORKDIR /app/app/frontend
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/app/frontend/dist /usr/share/nginx/html
COPY app/frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
