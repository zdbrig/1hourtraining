#!/bin/bash



until nc -z $1 $2; do
    echo "Waiting for rabbitmq webservice to start up..."
    sleep 1
done

echo "rabbit webservice !"

node index.js

tail -f /dev/null