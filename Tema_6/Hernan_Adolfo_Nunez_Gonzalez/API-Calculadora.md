# API REST - Calculadora.

## Descripción General.

API REST para realizar operaciones matemáticas con memoria persistente. Cada operación genera un ID único que permite consultar el historial.

---

## Recurso Principal.

**Operations** - Representa una operación matemática con su tipo, argumentos y resultado.

---

## Endpoints.

### 1. Crear Operación.

```
POST /operations
```

**Descripción:** Ejecuta una operación matemática y almacena el resultado en memoria.

**Request Body:**

```json
{
  "type": "string",
  "arguments": [number, ...]
}
```

**Tipos de Operación Soportados:**

| Tipo   | Descripción              | Argumentos Requeridos       |
|--------|--------------------------|----------------------------|
| `SUM`  | Suma N elementos         | Mínimo 2 números           |
| `SUB`  | Resta N elementos        | Mínimo 2 números           |
| `MUL`  | Multiplica 2 elementos   | Exactamente 2 números      |
| `DIV`  | Divide 2 elementos       | Exactamente 2 números      |
| `ROOT` | Raíz N-ésima             | 2 números: [radicando, índice] |
| `POW`  | Potencia N-ésima         | 2 números: [base, exponente]   |

**Ejemplos de Request:**

- **Suma:** `{ "type": "SUM", "arguments": [2, 2, 2] }` → Resultado: 6
- **Resta:** `{ "type": "SUB", "arguments": [10, 3, 2] }` → Resultado: 5
- **Multiplicación:** `{ "type": "MUL", "arguments": [4, 5] }` → Resultado: 20
- **División:** `{ "type": "DIV", "arguments": [20, 4] }` → Resultado: 5
- **Raíz cuadrada de 16:** `{ "type": "ROOT", "arguments": [16, 2] }` → Resultado: 4
- **Raíz cúbica de 27:** `{ "type": "ROOT", "arguments": [27, 3] }` → Resultado: 3
- **Potencia:** `{ "type": "POW", "arguments": [2, 3] }` → Resultado: 8

**Response (Success):**

```json
{
  "id": 1,
  "type": "SUM",
  "arguments": [2, 2, 2],
  "result": 6
}
```

**Códigos de Respuesta:**

| Código | Descripción                                      |
|--------|--------------------------------------------------|
| `201`  | Created - Operación realizada correctamente      |
| `400`  | Bad Request - Parámetros inválidos o faltantes   |
| `500`  | Internal Server Error - Error del servidor       |

---

### 2. Consultar Operación.

```
GET /operations/{id}
```

**Descripción:** Recupera los detalles de una operación previamente realizada.

**Path Parameters:**

| Parámetro | Tipo    | Descripción                    |
|-----------|---------|--------------------------------|
| `id`      | integer | Identificador único de la operación |

**Ejemplo de Request:**

```
GET /operations/1
```

**Response (Success):**

```json
{
  "id": 1,
  "type": "SUM",
  "arguments": [2, 2, 2],
  "result": 6
}
```

**Códigos de Respuesta:**

| Código | Descripción                              |
|--------|------------------------------------------|
| `200`  | OK - Operación encontrada                |
| `404`  | Not Found - Operación no existe          |
| `500`  | Internal Server Error - Error del servidor |

---

## Modelo de Datos.

### Operation.

```json
{
  "id": "integer (auto-generado)",
  "type": "string (SUM | SUB | MUL | DIV | ROOT | POW)",
  "arguments": "array de números",
  "result": "number"
}
```

---

## Validaciones.

- **SUM/SUB:** Requieren al menos 2 argumentos
- **MUL/DIV:** Requieren exactamente 2 argumentos
- **DIV:** El divisor no puede ser 0
- **ROOT:** El índice no puede ser 0
- **POW/ROOT:** Requieren exactamente 2 argumentos
