# Tech challenge


## Development

```bash
  cd tech-challenge
  docker compose -f docker-compose.dev.yaml up
```

### run api rest
```bash
  cd ./backend
  npm install
  npm run dev
```

### run worker
```bash
  cd worker
  npm install
  npm run dev
```

## Production
```bash
docker compose -f docker-compose.yaml up --build
```
And you should be ready to go


## Postman test
import tech-challenge.postman_collection.json to postman, go to the **tech-challenge** and execute **Create order**
you should get a response:
```json
{
    "orderId": "fb48f097-052d-4bf2-a5a3-1f8b3e38ce2d",
    "status": "PENDING"
}
```

with the response orderId, copy and paste it on **Fetch order by order id**
</br>
**GET localhost:3000/logs/orders/fb48f097-052d-4bf2-a5a3-1f8b3e38ce2d**

and you should get a response:
```json
{
    "orderId": "fb48f097-052d-4bf2-a5a3-1f8b3e38ce2d",
    "userId": "12345",
    "products": [
        {
            "productId": "p1",
            "quantity": 2
        },
        {
            "productId": "p2",
            "quantity": 1
        }
    ],
    "status": "COMPLETED"
}
```

The new record status could be **COMPLETED** or **FAILED**

To view logs on that order id, execute **Fetch logs by order id**
</br>
**localhost:3000/logs/orders/fb48f097-052d-4bf2-a5a3-1f8b3e38ce2d**

```json
{
    "status": 200,
    "data": [
        {
            "_index": "order_logs",
            "_type": "_doc",
            "_id": "cHdlNZUBr-0_XM9E_fP6",
            "_score": 0.66765696,
            "_source": {
                "orderId": "fb48f097-052d-4bf2-a5a3-1f8b3e38ce2d",
                "status": "PENDING",
                "dateTime": "2025-02-24T00:40:31.271Z"
            }
        },
        {
            "_index": "order_logs",
            "_type": "_doc",
            "_id": "cXdlNZUBr-0_XM9E_vNI",
            "_score": 0.66765696,
            "_source": {
                "orderId": "fb48f097-052d-4bf2-a5a3-1f8b3e38ce2d",
                "status": "PROCESSING",
                "dateTime": "2025-02-24T00:40:31.558Z"
            }
        },
        {
            "_index": "order_logs",
            "_type": "_doc",
            "_id": "cndlNZUBr-0_XM9E_vNx",
            "_score": 0.66765696,
            "_source": {
                "orderId": "fb48f097-052d-4bf2-a5a3-1f8b3e38ce2d",
                "status": "COMPLETED",
                "dateTime": "2025-02-24T00:40:31.599Z"
            }
        }
    ]
}
```
### Monitoring

Inspect RabbitMQ queues : http://localhost:15672/
</br>
Check elasticsearch health: http://localhost:9200/