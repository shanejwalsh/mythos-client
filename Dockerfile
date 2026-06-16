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
FROM node:16-alpine
WORKDIR /app
RUN npm install -g serve@14
COPY --from=build /app/build ./build
ENV PORT=3000
EXPOSE 3000
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]
