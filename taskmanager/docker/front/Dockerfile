FROM node:16.0-buster
WORKDIR /app

COPY package*.json .env /app/
RUN npm install && npm run build

ENV HOST=0

CMD npx nuxt start
