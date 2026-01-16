# # API de una calculadora online

**Recursos identificados:**
- Operación (Operations): Representa un operación del sistema ingresando el tipo de operación y los valores a calcular.

**Tipos de Operación Soportados:**
- `SUM` - Suma de N números
- `SUB` - Resta de N números
- `MUL` - Multiplicación de N números
- `DIV` - División de N números
- `POW` - Potencia (base^exponente)
- `SQRT` - Raíz cuadrada

## Endpoints de la API

| Método HTTP | URI                  | Query Params | 	Request Body(JSON)                                                                                              | Response Body(JSON)                                              | Códigos de Respuesta                              |
|-------------|----------------------|--------------|---------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|--------------------------------------------------|
| `POST`      | `/api/v1/operations`        |  `{ "operation": "REST", "operands": [15, 18, 21] }` | `{ "id": 101, "operation": "REST", "operands": [15, 18, 21], "result": -24 }`     | `201` Created<br>`400` Bad Request<br>`500` Internal Server Error |
| `GET`       | `/api/v1/operations/{id}`   |  | `{ "id": 1, "operation": "REST", "operands": [15, 18, 21], "result": -24 }`     | `200` OK<br>`404` Not Found<br>`500` Internal Server Error        |

---


