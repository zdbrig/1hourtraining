curl --location --request POST 'http://localhost:8080/api/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "Bacem message!"
}'