# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "email": "email.com",
  "password": "rahasia",
  "name": "user name",
  "alamat": "jl rumah",
  "image": "user image",
  "role": "karyawan"
}
```

Response Body Success :

```json
{
  "data": {
    "email": "email.com",
    "name": "user name"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "email": "email.com",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email or password wrong"
}
```

## Update User API

Endpoint : PUT /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "new user name", // optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "email": "email.com",
    "name": "new user name"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "email": "email.com",
    "name": "user name"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

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
  "errors": "Unauthorized"
}
```
