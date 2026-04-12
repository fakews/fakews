FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --production
COPY . .
EXPOSE 3001
HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/health', r => { process.exit(r.statusCode === 200 ? 0 : 1) })"
CMD ["node", "server.js"]
