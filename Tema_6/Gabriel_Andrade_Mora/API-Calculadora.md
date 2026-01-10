## Recursos Identificados

- **Operaciones (operations):** Representa un cálculo matemático realizado. Contiene el tipo de operación, los argumentos utilizados y el resultado obtenido.

| Método HTTP | URI                | Query Params | Cuerpo de la Petición (JSON)                                                                               | Cuerpo de la Respuesta (JSON)                                         | Códigos de Respuesta                                        |
| :---------- | :----------------- | :----------- | :--------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- | :---------------------------------------------------------- |
| POST        | `/operations`      | -            | `{ "type": "SUM", "arguments": [10, 5, 2] }` <br> _(Nota: "type" puede ser SUM, SUB, MUL, DIV, POW, SQRT)_ | `{ "id": 101, "type": "SUM", "arguments": [10, 5, 2], "result": 17 }` | 201 Created<br>400 Bad Request<br>500 Internal Server Error |
| GET         | `/operations/{id}` | -            | -                                                                                                          | `{ "id": 101, "type": "SUM", "arguments": [10, 5, 2], "result": 17 }` | 200 OK<br>404 Not Found<br>500 Internal Server Error        |
