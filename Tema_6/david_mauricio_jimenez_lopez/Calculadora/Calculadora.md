# # API de una calculadora online

**Recursos identificados:**
- Operación (Operations): Representa un operación del sistema.



| Método HTTP | URI                              | Query Params | Request Body                          | Response Body                                              | Códigos HTTP  |
|-------------|----------------------------------|--------------|---------------------------------------|------------------------------------------------------------|---------------|
| `POST`      | `/api/v1/operations/sum`         | -            | `{"numbers": [2, 2, 2]}`              | `{"id": 1, "result": 6}`                                   | 201, 400, 500      |
| `POST`      | `/api/v1/operations/subtract`    | -            | `{"numbers": [10, 2, 1]}`             | `{"id": 2, "result": 7}`                                   | 201, 400, 500      |
| `POST`      | `/api/v1/operations/multiply`    | -            | `{"a": 2, "b": 5}`                    | `{"id": 3, "result": 10}`                                  | 201, 400, 500      |
| `POST`      | `/api/v1/operations/divide`      | -            | `{"dividend": 10, "divisor": 2}`      | `{"id": 4, "result": 5}`                                   | 201, 400, 422, 500 |
| `POST`      | `/api/v1/operations/root`        | -            | `{"radicand": 8, "index": 3}`         | `{"id": 5, "result": 2}`                                   | 201, 400, 500      |
| `POST`      | `/api/v1/operations/power`       | -            | `{"base": 2, "exponent": 3}`          | `{"id": 6, "result": 8}`                                   | 201, 400, 500      |
| `GET`       | `/api/v1/operations/{id}`        | -            | -                                     | `{"id": 1, "type": "sum", "inputs": [2,2,2], "result": 6}` | 200, 404, 500      |

---



