# Build stage: compile the CRA app to static assets.
# Node 16 is required — react-scripts 2.x / webpack 4 breaks on newer OpenSSL.
FROM node:16-alpine AS build
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# REACT_APP_* vars must be present at build time. Railway injects service
# variables as build args when the ARG is declared.
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm run build

# Runtime stage: serve the static build. `serve -s` handles SPA routing
# (any path falls back to index.html), matching the old static.json config.
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve@14
COPY --from=build /app/build ./build
EXPOSE 3000
# Bind to 0.0.0.0 (not serve's default localhost) so Railway's router can reach it.
# Railway injects PORT at runtime; fall back to 3000 locally.
CMD ["sh", "-c", "serve -s build -l tcp://0.0.0.0:${PORT:-3000}"]
