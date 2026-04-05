# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
ARG REACT_APP_TMDB
ENV REACT_APP_TMDB=$REACT_APP_TMDB
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production (Secured)
FROM nginx:alpine

# RESOLUTION: Create non-root user to pass Quality Gate
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set permissions for Nginx directories
RUN touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx

COPY --from=builder /app/build /usr/share/nginx/html

# Switch to the non-root user
USER appuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
