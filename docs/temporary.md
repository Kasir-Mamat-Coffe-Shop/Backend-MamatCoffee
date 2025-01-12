# Temp API Spec

## Create Temp API

Endpoint : POST /api/temps

Headers :

- Authorization : token

Request Body :

```json
{
  "total": 2,
  "sub_total": 20000,
  "product_id": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "total": 2,
    "sub_total": 20000,
    "product_id": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "Product out of stock"
}
```

## Update Temp API

Endpoint : PUT /api/temps/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "total": 3,
  "sub_total": 30000,
  "product_id": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "total": 2,
    "sub_total": 20000,
    "product_id": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "Product out of stock"
}
```

## Get Temp API

Endpoint : GET /api/temps/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "total": 2,
    "sub_total": 20000,
    "product_id": 1
  }
}
```

Response Body Error :

```json
{
  "errors": "Product is not found"
}
```

## Remove Temp API

Endpoint : DELETE /api/temps/:id

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
