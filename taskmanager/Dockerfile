FROM node:16.0-buster
WORKDIR /app

COPY package*.json .env /app/
RUN npm install & npx nuxt build

CMD npx nuxt start
