url="http://node-customerserver:3001/"

requests=1000

# Loop to send requests
i=1
while [ $i -le $requests ]
do
    curl -s $url'metrics'
    # curl --location $url'purchaseProduct' \
    #     --header 'Content-Type: application/json' \
    #     --header 'Authorization: Basic YW1pcjphbWly' \
    #     --data '{
    #         "topic": "kafka-test",
    #         "message": {
    #         "userid": "66bff0f2c1b4c0ed87a4bbcc",
    #         "name":"amir",
    #         "price":"12"
    #         }
    #     }'
    i=$((i + 1))
done

echo "Completed $requests requests."