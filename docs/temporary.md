# Temp API Spec

## Create Temp API

Endpoint : POST /api/temps

Headers :

- Authorization : token

Request Body :

```json
{
  "jumlah": 2,
  "subTotal": 20000,
  "produkId": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "jumlah": 2,
    "subTotal": 20000,
    "produkId": 1
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
  "jumlah": 3,
  "subTotal": 30000,
  "produkId": 1
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "jumlah": 2,
    "subTotal": 20000,
    "produkId": 1
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
    "jumlah": 2,
    "subTotal": 20000,
    "produkId": 1
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
