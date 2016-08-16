#!/bin/bash

echo 'Initializing config...';
docker-compose -f docker-compose-shard.yml up -d config

echo 'Initializing shardings...';
docker-compose -f docker-compose-shard.yml up -d shard1 shard2

echo 'Initializing router...';
docker-compose -f docker-compose-shard.yml up -d router

sleep 4

echo 'Adding shard instances...';
docker exec -it gesttacore_config_1 bash -c "mongo --host gesttacore_router_1 --port 27017 --eval \"sh.addShard('gesttacore_shard1_1:27018');sh.addShard('gesttacore_shard2_1:27020');\""

echo 'Cofigure shard instances...';
docker exec -it gesttacore_config_1 bash -c "mongo --host gesttacore_router_1 --port 27017 < /opt/db/shard.js"

echo 'Done!';