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

- add: Sumar N elementos (2+2, 2+2+2).
- substract: Restar N elementos (2-2, 2-2-2).
- multiply: Multiplicar 2 elementos (2x2).
- divide: Dividir 2 elementos (2/2).
- root: Raiz N-ésima de un número (Raíz cuadrada de 4, Raíz cúbica de 8).
- power: Potencia N-ésima de un número (2^2, 3^3, 4^4).

## API Endpoints

| Método HTTP | URI        | Query Params | Request Body                             | Response Body                                                   | Códigos HTTP de respuesta |
| ----------- | ---------- | ------------ | ---------------------------------------- | --------------------------------------------------------------- | ------------------------- |
| GET         | /add       | -            | -                                        | `{"detail":"Descripción de la operación de la suma"}`           | 200                       |
| POST        | /add       | -            | {"elements": [4, 5, 6]}                  | `{"result": 15}`                                                | 200, 400                  |
| GET         | /substract | -            | -                                        | `{"detail":"Descripción de la operación de la resta"}`          | 200                       |
| POST        | /substract | -            | {"minuend": 4, "substrahend": [4, 5, 6]} | `{"result": -7}`                                                | 200, 400                  |
| GET         | /multiply  | -            | -                                        | `{"detail":"Descripción de la operación de la multiplicación"}` | 200                       |
| POST        | /multiply  | -            | {"elements": [4, 5]}                     | `{"result": 20}`                                                | 200, 400                  |
| GET         | /divide    | -            | -                                        | `{"detail":"Descripción de la operación de la división"}`       | 200                       |
| POST        | /divide    | -            | {"dividend": 20, "divisor": 4}           | `{"result": 5}`                                                 | 200, 400                  |
| GET         | /root      | -            | -                                        | `{"detail":"Descripción de la operación de la raíz N-ésima"}`   | 200                       |
| POST        | /root      | -            | {"number": 8, "index": 3}                | `{"result": 2}`                                                 | 200, 400                  |
| GET         | /power     | -            | -                                        | `{"detail":"Descripción de la operación de la potencia"}`       | 200                       |
| POST        | /power     | -            | {"base": 2, "exponent": 3}               | `{"result": 8}`                                                 | 200, 400                  |
