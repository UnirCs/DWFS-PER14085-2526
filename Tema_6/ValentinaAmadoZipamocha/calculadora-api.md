# API REST – Calculadora Online

La API REST es de una calculadora online con memoria, así que debe:
1. Ejecutar operaciones matemáticas.
2. Guardar cada operación realizada.
3. Permitir consultar una operación pasada usando un ID.

Entonces cada vez que se hace un cálculo:
- Se ejecuta la operación
- Se guarda
- Se devuelve el resultado y el ID de la operación

---

## Endpoints de la API

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP de respuesta |
|------------|-----|--------------|--------------|---------------|---------------------------|
| POST | /operations/sum | - | `{ "operands": [2,2,2] }` | `{ "id": "op1", "type": "sum", "result": 6 }` | 201, 400 |
| POST | /operations/subtract | - | `{ "operands": [10,3,2] }` | `{ "id": "op2", "type": "subtract", "result": 5 }` | 201, 400 |
| POST | /operations/multiply | - | `{ "operands": [3,4] }` | `{ "id": "op3", "type": "multiply", "result": 12 }` | 201, 400 |
| POST | /operations/divide | - | `{ "operands": [10,2] }` | `{ "id": "op4", "type": "divide", "result": 5 }` | 201, 400 |
| POST | /operations/root | - | `{ "number": 8, "degree": 3 }` | `{ "id": "op5", "type": "root", "result": 2 }` | 201, 400 |
| POST | /operations/power | - | `{ "base": 3, "exponent": 3 }` | `{ "id": "op6", "type": "power", "result": 27 }` | 201, 400 |
| GET | /operations/{id} | - | - | `{ "id": "op1", "type": "sum", "operands": [2,2,2], "result": 6 }` | 200, 404 |

---
