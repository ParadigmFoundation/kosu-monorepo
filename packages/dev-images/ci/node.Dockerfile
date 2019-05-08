FROM node:lts

ENV DOCKER true

RUN yarn global add npm npx ganache-cli typescript

RUN apt-get update
RUN apt-get install -y netcat build-essential libudev-dev

CMD [ "node" ]