FROM node:18 AS build
WORKDIR /app
COPY package.json yarn.lock* config-overrides.js ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine AS runtime
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
