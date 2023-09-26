FROM node:17-alpine

WORKDIR /blockchain

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 8034

CMD [ "yarn", "start" ]
