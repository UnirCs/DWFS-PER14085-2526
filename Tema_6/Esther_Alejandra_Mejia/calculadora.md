# API de Calculadora

## Recursos identificados

- **operations**: operaciones matemáticas realizadas por la calculadora.

## Endpoints

| Método HTTP | URI                     | Query Params  | Request Body                           | Response Body                              |Códigos HTTP de respuesta|
|-------------|-------------------------|---------------|----------------------------------------|--------------------------------------------|-------------------------|
| POST        | /api/v1/operations      |---------------| {"type":"sum","operands":[2,2,2]}      | {"id":"op_1","type":"sum","result":6}      | 201, 400                |
| POST        | /api/v1/operations      |---------------| {"type":"subtract","operands":[5,3]}   | {"id":"op_2","type":"subtract","result":2} | 201, 400                |
| POST        | /api/v1/operations      |---------------| {"type":"multiply","operands":[3,4]}   | {"id":"op_3","type":"multiply","result":12}| 201, 400                |
| POST        | /api/v1/operations      |---------------| {"type":"divide","operands":[10,2]}    | {"id":"op_4","type":"divide","result":5}   | 201, 400, 422           |
| POST        | /api/v1/operations      |---------------| {"type":"root","n":2,"value":9}        | {"id":"op_5","type":"root","result":3}     | 201, 400, 422           |
| POST        | /api/v1/operations      |---------------| {"type":"power","base":2,"exponent":3} | {"id":"op_6","type":"power","result":8}    | 201, 400                |
| GET         | /api/v1/operations      | limit, offset |----------------------------------------| {"operations":[...]}                       | 200                     |
| GET         | /api/v1/operations/{id} |---------------|----------------------------------------| {"id":"op_1","type":"sum","result":6}      | 200, 404                |