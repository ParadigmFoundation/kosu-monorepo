FROM ethereum/client-go:v1.9.8

COPY genesis-kosu-test.json accounts passwords ./
RUN mkdir keystore/
COPY keystore/* keystore/

RUN geth init genesis-kosu-test.json --datadir .

ENTRYPOINT geth \
    --datadir . \
    --networkid 6175 \
    --unlock="`cat accounts`" \
    --password=./passwords \
    --etherbase "0x54E60Bccc86A7Bad4BC68E36a8fde0F369aE849E" --mine \
    --rpc  --rpcaddr '0.0.0.0' --rpccorsdomain '*' --rpcvhosts '*' --rpcapi 'personal,db,eth,net,web3,txpool,miner,debug' \
    --ws --wsaddr '0.0.0.0' --wsapi 'personal,db,eth,net,web3,txpool,miner,debug' --wsorigins '*' \
    --allow-insecure-unlock
