#!/bin/bash


# Wait for MySQL to start up

until nc -z localhost 8080; do
    echo "Waiting for python webservice to start up..."
    sleep 1
done

echo "python webservice !"

node index.js