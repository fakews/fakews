## Build application
FROM node as build
COPY . /app
WORKDIR /app
RUN yarn install
EXPOSE 3000

CMD ["yarn", "run", "prod"]