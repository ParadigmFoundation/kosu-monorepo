FROM ethereum/client-go:stable

COPY genesis.json accounts passwords ./
RUN mkdir keystore/
COPY keystore/* keystore/

RUN geth init genesis.json --datadir .

ENTRYPOINT geth \
--datadir . \
--networkid 6174 \
--unlock="`cat accounts`" --password=./passwords \
--etherbase "0x54E60Bccc86A7Bad4BC68E36a8fde0F369aE849E" --mine \
--rpc  --rpcaddr '0.0.0.0' --rpccorsdomain '*' --rpcvhosts '*' --rpcapi 'personal,db,eth,net,web3,txpool,miner,debug' \