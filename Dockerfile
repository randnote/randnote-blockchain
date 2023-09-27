FROM node:17-alpine

RUN yarn install -g nodemon

WORKDIR /blockchain

# COPY package.json ./

COPY . .

RUN yarn install

EXPOSE 8034

CMD [ "yarn", "run", "dev" ]
