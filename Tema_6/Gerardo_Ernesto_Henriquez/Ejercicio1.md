# API de una calculadora online


| Metodo HTTP | URI | Query Params | Cuerpo de la peticion | Cuerpo de la respuesta | Codigos de respuestas |
|-------------|-----|--------------|----------------------|----------------------|---------------------|
| POST | `/suma` | N/A | `{"numbers": [2, 2]}` | `{"operationId": 1, "result": 4}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/restar` | N/A | `{"numbers": [2, 2]}` | `{"operationId": 1, "result": 0}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/multiplicar` | N/A | `{"num1": 2, "num2": 2}` | `{"operationId": 1, "result": 4}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/dividir` | N/A | `{"num1": 2, "num2": 2}` | `{"operationId": 1, "result": 1}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/raiz` | N/A | `{"num1": 4, "root": 2}` | `{"operationId": 1, "result": 2}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/potencia` | N/A | `{"num1": 2, "exponent": 2}` | `{"operationId": 1, "result": 4}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| GET | `/operacion` | `operationId` | N/A | `{"operationId": 1, "numbers": [1, 2], "num1": null, "num2": null, "root": null, "exponent": null, "result": 3}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
