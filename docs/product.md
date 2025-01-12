# Product API Spec

## Create Product API

Endpoint : POST /api/products

Headers :

- Authorization : token

Request Body :

```json
{
  "product_name": "Americano",
  "price": 10000,
  "stock": 10,
  "image": "image link",
  "kategori_id": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "product_name": "Americano",
    "price": 10000,
    "stock": 10,
    "image": "image link",
    "kategori_id": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "price is not valid format"
}
```

## Update Product API

Endpoint : PUT /api/products/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "product_name": "Americano",
  "price": 10000,
  "stock": 10,
  "image": "image link",
  "kategori_id": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "product_name": "Americano",
    "price": 10000,
    "stock": 10,
    "image": "image link",
    "kategori_id": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "price is not valid format"
}
```

## Get Product API

Endpoint : GET /api/products/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "product_name": "Americano",
    "price": 10000,
    "stock": 10,
    "image": "image link",
    "kategori_id": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "Product is not found"
}
```

## Search Product API

Endpoint : GET /api/products

Headers :

- Authorization : token

Query params :

- product_name : Search by product name using like, optional
- price : Search by price using like, optional
- stock : Search by stock using like, optional
- kategori_id : Search by kategori using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "product_name": "Americano",
      "price": 10000,
      "stock": 10,
      "image": "image link",
      "kategori_id": 1
    },
    {
      "id": 2,
      "product_name": "Americano",
      "price": 10000,
      "stock": 10,
      "image": "image link",
      "kategori_id": 1
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
  "errors": "Product is not found"
}
```

## Remove Product API

Endpoint : DELETE /api/products/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Product is not found"
}
```
