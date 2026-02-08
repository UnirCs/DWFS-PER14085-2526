# API de una calculadora online

En este ejercicio vamos a diseñar la API REST de una calculadora.
Las operaciones que la API debe soportar son las siguientes:

- Sumar N elementos (2+2, 2+2+2).
- Restar N elementos (2-2, 2-2-2).
- Multiplicar 2 elementos (2x2).
- Dividir 2 elementos (2/2).
- Raiz N-ésima de un número (Raíz cuadrada de 4, Raíz cúbica de 8).
- Potencia N-ésima de un número (2^2, 3^3, 4^4).
- Detalle de operacion
  Nuestra calculadora tendrá memoria y siempre se podrán consultar los datos de operaciones realizadas, a través de un ID de operación.

## Recursos identificados

- `operations`: Representa cada cálculo realizado por la calculadora. Cada recurso tiene un identificador único (`id`) para su consulta posterior.

## API Endpoints

| Método HTTP | URI                | Propósito                | Request Body                                  | Response Body (Ejemplo)                                        | Códigos HTTP |
| ----------- | ------------------ | ------------------------ | --------------------------------------------- | -------------------------------------------------------------- | ------------ |
| GET         | `/operations`      | Listar el historial      | -                                             | `[{"id": 1, "result": 10}, ...]`                               | 200          |
| POST        | `/operations`      | Crear/Ejecutar operación | `{"type": "addition", "operands": [4, 5, 6]}` | `{"id": 101, "result": 15}`                                    | 201, 400     |
| GET         | `/operations/{id}` | Detalle de operación     | -                                             | `{"id": 101, "type": "addition", "result": 15, "date": "..."}` | 200, 404     |
| DELETE      | `/operations/{id}` | Borrar de la memoria     | -                                             | -                                                              | 204, 404     |

## Estructura de Request Body por tipo de operación

Para el método POST `/operations`, el campo `"type"` define la lógica matemática:

### 1. Sumar y Multiplicar (N elementos)

```json
{
  "type": "addition",
  "operands": [2, 2, 2]
}
```

(Para multiplicación, el type sería `"multiplication"`).

### 2. Restar (N elementos)

Para mantener la claridad entre el número inicial y los que restan:

```json
{
  "type": "subtraction",
  "minuend": 20,
  "subtrahends": [5, 2, 3]
}
```

### 3. Dividir (2 elementos)

```json
{
  "type": "division",
  "dividend": 10,
  "divisor": 2
}
```

### 4. Raíz y Potencia (N-ésima)

```json
{
  "type": "root",
  "radicand": 8,
  "index": 3
}
```

```json
{
  "type": "power",
  "base": 2,
  "exponent": 10
}
```
