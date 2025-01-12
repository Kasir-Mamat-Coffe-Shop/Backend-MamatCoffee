# Category API Spec

## Create Category API

Endpoint : POST /api/categories

Headers :

- Authorization : token

Request Body :

```json
{
  "category_name": "Minuman kopi"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "category_name": "Minuman kopi"
  }
}
```

Response Body Error :

```json
{
  "errors": "Nama Category is not valid format"
}
```

## Update Category API

Endpoint : PUT /api/categories/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "category_name": "Minuman kopi"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "category_name": "Minuman Kopi"
  }
}
```

Response Body Error :

```json
{
  "errors": "Nama Category is not valid format"
}
```

## Get Product API

Endpoint : GET /api/categories/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "category_name": "Minuman kopi"
  }
}
```

Response Body Error :

```json
{
  "errors": "Category is not found"
}
```

## Search Product API

Endpoint : GET /api/kategories

Headers :

- Authorization : token

Query params :

- category_name : Search by Category name using like, optional

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "category_name": "Minuman kopi"
    },
    {
      "id": 2,
      "category_name": "Minuman non kopi"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Product is not found"
}
```

## Remove Product API

Endpoint : DELETE /api/categories/:id

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
  "errors": "Category is not found"
}
```
