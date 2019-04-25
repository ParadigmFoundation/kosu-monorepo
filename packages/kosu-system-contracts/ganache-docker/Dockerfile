FROM node

RUN npm i -g npm npx ganache-cli
COPY ganache-db ./ganache-db

ENV DOCKER true
EXPOSE 8545

CMD ganache-cli --networkId 6174 -d --db ./ganache-db -m "plate tag lend tissue capable ketchup evidence deliver aspect salt used always"
