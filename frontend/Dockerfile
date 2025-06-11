# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./

RUN yarn install && chmod +x ./node_modules/.bin/vite

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]
