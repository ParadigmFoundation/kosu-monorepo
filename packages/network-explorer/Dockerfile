FROM node:lts

RUN yarn global add typescript

COPY . .
RUN yarn 
RUN yarn build

EXPOSE 4242

CMD yarn start:production