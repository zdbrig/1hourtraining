#!/bin/bash

# Check if a Docker container name or hash and backup file name were provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <container_name_or_hash> <backup_file>"
    exit 1
fi

# Set the hostname and port for the MySQL instance
HOST=127.0.0.1
PORT=3306

# Set the database name
DBNAME=sqoin

# Restore the database using the Docker command and the MySQL client
docker exec -i $1 sh -c "mysql -h $HOST -P $PORT -u root --password=root $DBNAME" < $2

# Confirm the restore is complete
echo "Restore complete. Database: $DBNAME"
