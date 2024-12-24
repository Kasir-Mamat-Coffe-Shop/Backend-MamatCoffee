# Product API Spec

## Create Product API

Endpoint : POST /api/products

Headers :

- Authorization : token

Request Body :

```json
{
  "namaProduk": "Americano",
  "harga": 10000,
  "stok": 10,
  "image": "image link",
  "kategoriId": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "namaProduk": "Americano",
    "harga": 10000,
    "stok": 10,
    "image": "image link",
    "kategoriId": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "Harga is not valid format"
}
```

## Update Product API

Endpoint : PUT /api/products/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "namaProduk": "Americano",
  "harga": 10000,
  "stok": 10,
  "image": "image link",
  "kategoriId": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "namaProduk": "Americano",
    "harga": 10000,
    "stok": 10,
    "image": "image link",
    "kategoriId": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "Harga is not valid format"
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
    "namaProduk": "Americano",
    "harga": 10000,
    "stok": 10,
    "image": "image link",
    "kategoriId": 1
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

- namaProduk : Search by product name using like, optional
- harga : Search by harga using like, optional
- stok : Search by stok using like, optional
- kategoriId : Search by kategori using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "namaProduk": "Americano",
      "harga": 10000,
      "stok": 10,
      "image": "image link",
      "kategoriId": 1
    },
    {
      "id": 2,
      "namaProduk": "Americano",
      "harga": 10000,
      "stok": 10,
      "image": "image link",
      "kategoriId": 1
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
