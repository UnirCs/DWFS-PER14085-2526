
En este ejercicio vamos a diseñar la API REST de una calculadora.

Las operaciones que la API debe soportar son las siguientes:

Sumar N elementos (2+2, 2+2+2).
Restar N elementos (2-2, 2-2-2).
Multiplicar 2 elementos (2x2).
Dividir 2 elementos (2/2).
Raíz N-ésima de un número (Raíz cuadrada de 4, Raíz cúbica de 8).
Potencia Nésima de un número (2^2, 3^3, 4^4).
Detalle de operacion
Nuestra calculadora tendrá memoria y siempre se podrán consultar los datos de operaciones realizadas, a través de un ID de operación.

Recursos identificados:

Operación: Representa una operación matemática, que contiene la siguiente información

Atributos:
id: identificador único.
tipo: suma, resta, multiplicación, división, raíz, potencia.
valores: números sobre los que se aplica la operación.
indice:  numeros utilizados en las operaciones raiz y potencia nésima, no se requiere definir en las otras operaciones

Resultado: cálculo obtenido.

Operacion{id}: Representa los datos de la operación a ser consultadas


| Método HTTP | Punto final   | Parámetros de consulta | Cuerpo JSON de la petición | Respuesta JSON de la petición | Códigos HTTP de respuesta posible |
|-------------|---------------|------------------------|----------------------------|-------------------------------|-----------------------------------|
| **POST**    | `/operaciones`  | Ninguno                | `{ "tipo": (para los tipos de operacion suma, resta, multiplicación, división, raiz y potencia), "valores": [2, 2, 2],"indice":(utilizado en las operaciones raiz y potencia nésima ) }` | `{ "resultado": 6, "operacionId": "abc123" }` | 200 OK, 400 Bad  Request, 500 Internal  Server Error, 422 Unprocessable   |
| **GET**     | `/operaciones/{id}` | `id` (en la ruta)   | Ninguno                    | `{ "id": "abc123", "tipo": "suma", "valores": [2,2,2], "resultado": 6, "fecha": "2025-12-20T23:43:00Z" }` | 200 OK, 404 Not Found, 500 Internal Server Error |
| **GET**     | `/operaciones`  | Opcionales: `tipo`, `fecha` | Ninguno                | `[ { "id": "abc123", "tipo": "suma", "resultado": 6 }, { "id": "def456", "tipo": "resta", "resultado": 5 } ]` | 200 OK, 500 Internal Server Error |
