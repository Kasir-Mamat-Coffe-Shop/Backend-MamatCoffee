# Excel Data API Spec

## Get Excel Data API

Endpoint : GET /api/excels/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "file_name": "Recap Desember 2024",
    "excelLink": "Link"
  }
}
```

Response Body Error :

```json
{
  "errors": "Data Excel is not found"
}
```

## Search Excel Data API

Endpoint : GET /api/excels

Headers :

- Authorization : token

Query params :

- file_name : Search by file name using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "file_name": "Recap Desember 2024",
      "excelLink": "Link"
    },
    {
      "id": 2,
      "file_name": "Recap Desember 2024",
      "excelLink": "Link"
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
  "errors": "Excel Data is not found"
}
```

## Remove Excel Data API

Endpoint : DELETE /api/excels/:id

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
  "errors": "Excel Data is not found"
}
```
