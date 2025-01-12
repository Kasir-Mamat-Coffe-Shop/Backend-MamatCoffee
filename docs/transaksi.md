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
    "midtrans_code": "THX-1234567890123",
    "total": 40000,
    "date": "2024-12-1/20.32",
    "email": 1,
    "transaction_detail_id": 1
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

- midtrans_code : Search by midtrans code using like, optional
- total : Search by total using like, optional
- date : Search by date using like, optional
- email : Search by user using like, optional
- transaction_detail_id : Search by detail id using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "midtrans_code": "THX-1234567890123",
      "total": 40000,
      "date": "2024-12-1/20.32",
      "email": 1,
      "transaction_detail_id": 1
    },
    {
      "id": 2,
      "midtrans_code": "THX-1234567890123",
      "total": 40000,
      "date": "2024-12-1/20.32",
      "email": 1,
      "transaction_detail_id": 1
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
