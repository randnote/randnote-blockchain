FROM node:17-alpine

# RUN npm install -g yarn
# RUN yarn install -g nodemon
RUN yarn global add nodemon

WORKDIR /blockchain

# COPY package.json ./

COPY . .

RUN yarn install

EXPOSE 8034

CMD [ "yarn", "run", "dev" ]
