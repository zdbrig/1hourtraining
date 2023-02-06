#!/bin/bash


# Wait for MySQL to start up

until nc -z mariadb 3306; do
    echo "Waiting for MySQL to start up..."
    sleep 1
done

echo "MySQL is up and running!"

python app.py