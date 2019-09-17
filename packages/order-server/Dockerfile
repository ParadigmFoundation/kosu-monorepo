FROM node:lts
WORKDIR /order-server

RUN yarn global add typescript

COPY . .
RUN yarn
RUN yarn build

CMD yarn start:production