#!/bin/bash

echo 'Stopping docker containers...';
docker-compose -f docker-compose-shard.yml stop