FROM node:17-alpine

WORKDIR /blockchain

COPY package.json ./

COPY . .

RUN yarn install

EXPOSE 8034

CMD [ "yarn", "start" ]
