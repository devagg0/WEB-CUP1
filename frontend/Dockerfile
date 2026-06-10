# ==========================================
# Etapa 1: Desarrollo (dev)
# ==========================================
FROM node:20-alpine AS dev

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# ==========================================
# Etapa 2: Compilación de producción (build)
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_API_URL
ARG VITE_STORAGE_BASE_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STORAGE_BASE_URL=$VITE_STORAGE_BASE_URL

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# ==========================================
# Etapa 3: Servidor de producción (prod)
# ==========================================
FROM nginx:stable-alpine AS prod

COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
