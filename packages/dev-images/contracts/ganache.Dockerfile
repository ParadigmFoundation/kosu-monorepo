FROM node:lts-stretch

WORKDIR /workspace

COPY ./ganache-db ./ganache-db

RUN yarn global add npx ganache-cli

ENV DOCKER true
EXPOSE 8545

CMD ganache-cli -d \
    --networkId 6174 \
    --db ./ganache-db \
    -m "plate tag lend tissue capable ketchup evidence deliver aspect salt used always"
