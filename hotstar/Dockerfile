# Stage 1: Build React App
FROM node:18 AS builder

WORKDIR /app

# Passing build arguments for TMDB API
ARG REACT_APP_TMDB
ENV REACT_APP_TMDB=$REACT_APP_TMDB

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Debug lines to catch the case-sensitivity mismatch before the crash
RUN echo "=== Checking for MovieModal vs moviemodal ===" && \
    ls /app/src/components/

RUN npm run build

# Stage 2: Production Server (Nginx)
FROM nginx:alpine

# SECURITY FIX: Create a non-root user to pass SonarQube Quality Gate
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Adjust permissions so the non-root user can run Nginx
RUN touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx

# Copy build artifacts from stage 1
COPY --from=builder /app/build /usr/share/nginx/html

# Switch to the non-root user
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
