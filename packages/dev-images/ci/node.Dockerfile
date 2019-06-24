FROM gcr.io/kosu-io/node-lts:latest

ADD . /drone/src
WORKDIR /drone/src
RUN yarn
RUN yarn build

CMD [ "node" ]