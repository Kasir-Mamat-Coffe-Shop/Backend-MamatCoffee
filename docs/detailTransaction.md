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
    "jumlah": 3,
    "subTotal": 30000,
    "produkId": 1
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

- jumlah : Search by jumlah using like, optional
- subTotal : Search by subtotal using like, optional
- produkId : Search by produk using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "jumlah": 3,
      "subTotal": 30000,
      "produkId": 1
    },
    {
      "id": 2,
      "jumlah": 3,
      "subTotal": 30000,
      "produkId": 1
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
