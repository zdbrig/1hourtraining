#!/bin/bash


# Wait for MySQL to start up

until nc -z $1 $2; do
    echo "Waiting for postgres webservice to start up..."
    sleep 1
done

echo "postgres webservice !"


until nc -z $3 $4; do
    echo "Waiting for rabbitmq webservice to start up..."
    sleep 1
done

echo "rabbit webservice !"

node index.js