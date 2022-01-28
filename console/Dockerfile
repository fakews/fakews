## Build application
FROM node:16 as build
COPY . /app
WORKDIR /app
RUN yarn install && yarn build

## Run application
FROM nginx as runtime
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80