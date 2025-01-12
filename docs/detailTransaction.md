# Detail Transaction API Spec

## Get Detail Transaction API

Endpoint : GET /api/tansactions/detail/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "total": 3,
    "sub_total": 30000,
    "produk_id": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "Detail transaction is not found"
}
```

## Search Detail Transaction API

Endpoint : GET /api/transactions/detail

Headers :

- Authorization : token

Query params :

- total : Search by total using like, optional
- sub_total : Search by sub_total using like, optional
- produk_id : Search by produk using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "total": 3,
      "sub_total": 30000,
      "produk_id": 1
    },
    {
      "id": 2,
      "total": 3,
      "sub_total": 30000,
      "produk_id": 1
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
  "errors": "Detail Transaction is not found"
}
```
