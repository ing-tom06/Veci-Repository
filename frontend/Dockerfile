# ─── Stage 1: Build Angular ───────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compile Angular in production mode
RUN npm run build -- --configuration production

# ─── Stage 2: Serve with nginx ────────────────────────────────────────────────
FROM nginx:alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output to nginx html folder
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
