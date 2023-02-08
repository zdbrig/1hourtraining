#!/bin/bash

# Check if a Docker container name or hash was provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <container_name_or_hash>"
    exit 1
fi

# Set the hostname and port for the MySQL instance
HOST=127.0.0.1
PORT=3306

# Set the database name and the backup file name
DBNAME=sqoin
BACKUPFILE=mydatabase_$(date +%Y%m%d%H%M%S).sql

# Use the Docker command to run a MySQL client and dump the database
docker exec $1 sh -c "mysqldump -h $HOST -P $PORT -u root --password=root $DBNAME" > $BACKUPFILE

# Confirm the backup file was created
echo "Backup complete. File name: $BACKUPFILE"