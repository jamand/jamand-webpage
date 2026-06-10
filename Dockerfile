# Stage 1: Build
FROM node:24-alpine AS build
WORKDIR /app

# pnpm-workspace.yaml carries install settings (allowBuilds,
# minimumReleaseAgeExclude) needed to match local.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Install version of pnpm based on packageManager field in package.json
RUN corepack enable && corepack install
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
ARG SITE_URL
ENV SITE_URL=${SITE_URL}
RUN pnpm build

# Default: nginx with gzip, caching headers, security headers
FROM nginx:alpine AS runtime
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
