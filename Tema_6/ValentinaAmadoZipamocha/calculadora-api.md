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

### Crear una operación

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
|------------|-----|--------------|--------------|---------------|-------------|
| POST | /operations | - | `{ "type": "sum", "operands": [2, 2, 2] }`<br>`{ "type": "subtract", "operands": [10, 2] }`<br>`{ "type": "multiply", "operands": [3, 4] }`<br>`{ "type": "divide", "operands": [10, 2] }`<br>`{ "type": "power", "base": 3, "exponent": 3 }`<br>`{ "type": "root", "number": 8, "degree": 3 }` | `{ "id": "op1", "type": "sum", "result": 6 }`<br>`{ "id": "op2", "type": "subtract", "result": 8 }`<br>`{ "id": "op3", "type": "multiply", "result": 12 }`<br>`{ "id": "op4", "type": "divide", "result": 5 }`<br>`{ "id": "op5", "type": "power", "result": 27 }`<br>`{ "id": "op6", "type": "root", "result": 2 }` | 201, 400 |

---

### Consultar una operación por ID

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
|------------|-----|--------------|--------------|---------------|-------------|
| GET | /operations/{id} | - | - | `{ "id": "op1", "type": "sum", "operands": [2, 2, 2], "result": 6 }`<br>`{ "id": "op2", "type": "subtract", "operands": [10, 2], "result": 8 }`<br>`{ "id": "op3", "type": "multiply", "operands": [3, 4], "result": 12 }`<br>`{ "id": "op4", "type": "divide", "operands": [10, 2], "result": 5 }`<br>`{ "id": "op5", "type": "power", "base": 3, "exponent": 3, "result": 27 }`<br>`{ "id": "op6", "type": "root", "number": 8, "degree": 3, "result": 2 }` | 200, 404 |

---
