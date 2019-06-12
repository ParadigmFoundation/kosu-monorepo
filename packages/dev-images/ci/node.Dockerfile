FROM node:lts

ENV DOCKER true

RUN yarn global add npm npx ganache-cli typescript

RUN apt-get update
RUN apt-get install -y netcat build-essential libudev-dev jq

RUN git clone https://github.com/ethereum/go-ethereum
RUN cd go-ethereum && make devtools
RUN rm -rf go-ethereum

CMD [ "node" ]