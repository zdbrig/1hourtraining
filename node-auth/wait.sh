#!/bin/bash


# Wait for MySQL to start up

until nc -z $1 $2; do
    echo "Waiting for mongo webservice to start up..."
    sleep 1
done

echo "mongo webservice running!"

node database/init-db.js

node index.js