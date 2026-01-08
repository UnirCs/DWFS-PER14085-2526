# # API de una calculadora online

**Recursos identificados:**
- Operación (Operations): Representa un operación del sistema.


## Endpoints de la API

| Método HTTP | URI                          | Request Body                          | Response Body                                                  | Códigos HTTP     |
|-------------|------------------------------|---------------------------------------|----------------------------------------------------------------|------------------|
| `POST`      | `/api/v1/sums`               | `{"numbers": [2, 2, 2]}`              | `{"id": 101, "result": 6}`                                     | 201, 400, 500    |
| `POST`      | `/api/v1/subtractions`       | `{"numbers": [10, 2, 1]}`             | `{"id": 102, "result": 7}`                                     | 201, 400, 500    |
| `POST`      | `/api/v1/multiplications`    | `{"a": 2, "b": 5}`                    | `{"id": 103, "result": 10}`                                    | 201, 400, 500    |
| `POST`      | `/api/v1/divisions`          | `{"dividendo": 10, "divisor": 2}`     | `{"id": 104, "result": 5}`                                     | 201, 400, 422, 500 |
| `POST`      | `/api/v1/roots`              | `{"radicando": 8, "indice": 3}`       | `{"id": 105, "result": 2}`                                     | 201, 400, 500    |
| `POST`      | `/api/v1/powers`             | `{"base": 2, "exponente": 3}`         | `{"id": 106, "result": 8}`                                     | 201, 400, 500    |
| `GET`       | `/api/v1/operations/{id}`    | -                                     | `{"id": 101, "tipo": "suma", "entradas": [2,2,2], "resultado": 6}` | 200, 404, 500    |

---



