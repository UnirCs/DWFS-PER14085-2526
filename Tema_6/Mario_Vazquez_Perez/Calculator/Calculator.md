## Recursos identificados

- Operaciones (operations): Representación para los cálculos matemáticos realizados. Se almacena el tipo de operación, los argumentos y el resultado.

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP de respuesta |
|-------------|-----|--------------|--------------|---------------|---------------------------|
| POST | `/operations` | - | `{"type": "add", "operands": [2, 2, 2]}` | `{"id": "uuid", "type": "add", "operands": [2, 2, 2], "result": 6` | 201, 400, 422 |
| POST | `/operations` | - | `{"type": "subtract", "operands": [10, 2, 2]}` | `{"id": "uuid", "type": "subtract", "operands": [10, 2, 2], "result": 6` | 201, 400, 422 |
| POST | `/operations` | - | `{"type": "multiply", "operands": [2, 3]}` | `{"id": "uuid", "type": "multiply", "operands": [2, 3], "result": 6` | 201, 400, 422 |
| POST | `/operations` | - | `{"type": "divide", "operands": [6, 2]}` | `{"id": "uuid", "type": "divide", "operands": [6, 2], "result": 3` | 201, 400, 422 |
| POST | `/operations` | - | `{"type": "root", "base": 8, "index": 3}` | `{"id": "uuid", "type": "root", "base": 8, "index": 3, "result": 2` | 201, 400, 422 |
| POST | `/operations` | - | `{"type": "power", "base": 2, "exponent": 3}` | `{"id": "uuid", "type": "power", "base": 2, "exponent": 3, "result": 8` | 201, 400, 422 |
| GET | `/operations` | - | - | `{"operations": [...], "total": 100, "page": 1, "limit": 20}` | 200 |
| GET | `/operations/{id}` | - | - | `{"id": "uuid", "type": "add", "operands": [2, 2], "result": 4` | 200, 404 |
