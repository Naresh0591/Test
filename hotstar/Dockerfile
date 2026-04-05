# Stage 1: Build React App
FROM node:18 AS builder

WORKDIR /app

ARG REACT_APP_TMDB
ENV REACT_APP_TMDB=$REACT_APP_TMDB

COPY package.json ./
RUN npm install

COPY . .

# ADD THESE 3 DEBUG LINES
RUN echo "=== FILES IN /app/src ===" && ls /app/src/
RUN echo "=== FILES IN /app/src/components ===" && ls /app/src/components/
RUN echo "=== App.js imports ===" && head -10 /app/src/App.js

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
