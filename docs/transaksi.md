# Transaction API Spec

## Get Transaction API

Endpoint : GET /api/tansactions/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "midtransCode": "THX-1234567890123",
    "total": 40000,
    "tanggal": "2024-12-1/20.32",
    "userId": 1,
    "detailId": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "Transaction is not found"
}
```

## Search Transaction API

Endpoint : GET /api/transactions

Headers :

- Authorization : token

Query params :

- midtransCode : Search by midtrans code using like, optional
- total : Search by total using like, optional
- tanggal : Search by tanggal using like, optional
- userId : Search by user using like, optional
- detailId : Search by detail id using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "midtransCode": "THX-1234567890123",
      "total": 40000,
      "tanggal": "2024-12-1/20.32",
      "userId": 1,
      "detailId": 1
    },
    {
      "id": 2,
      "midtransCode": "THX-1234567890123",
      "total": 40000,
      "tanggal": "2024-12-1/20.32",
      "userId": 1,
      "detailId": 1
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

```json
{
  "errors": "Transaction is not found"
}
```
