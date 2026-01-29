
En este ejercicio vamos a diseñar la API REST para el cine en el que venimos trabajando en los ejercicios de los anteriores temas.

Las operaciones que la API debe soportar son las siguientes:

Crear, eliminar y modificar películas.
Crear, eliminar y modificar (parcialmente) salas.
Crear, eliminar y modificar (parcialmente) usuarios.
Crear una reserva para un usuario en una sala.
Cancelar una reserva para un usuario en una sala.
Modificar una reserva para un usuario en una sala.
Registrar un pago de una reserva.

Recursos identificados: Películas, salas, usuarios, reserva y pago


---


# Cine: Películas, Salas, Usuarios, Reservas y Pagos

## Películas
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| **POST**    | `/peliculas` | Crear una película | `{ "titulo": "Matrix", "duracion": 136, "genero": "Sci-Fi" }` | 201 Created, 400 Bad Request |
| **PUT**     | `/peliculas/{id}` | Modificar película (completa) | `{ "titulo": "Matrix Reloaded", "duracion": 138, "genero": "Sci-Fi" }` | 200 OK, 404 Not Found |
| **PATCH**   | `/peliculas/{id}` | Modificar película (parcial) | `{ "duracion": 140 }` | 200 OK, 404 Not Found |
| **DELETE**  | `/peliculas/{id}` | Eliminar película | N/A | 204 No Content, 404 Not Found |

---

## Salas
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| **POST**    | `/salas` | Crear una sala | `{ "nombre": "Sala 1", "capacidad": 100 }` | 201 Created |
| **PUT**     | `/salas/{id}` | Modificar sala (completa) | `{ "nombre": "Sala VIP", "capacidad": 80 }` | 200 OK |
| **PATCH**   | `/salas/{id}` | Modificar sala (parcial) | `{ "capacidad": 120 }` | 200 OK |
| **DELETE**  | `/salas/{id}` | Eliminar sala | N/A | 204 No Content |

---

##  Usuarios
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| **POST**    | `/usuarios` | Crear usuario | `{ "nombre": "Ana", "email": "ana@mail.com" }` | 201 Created |
| **PUT**     | `/usuarios/{id}` | Modificar usuario (completo) | `{ "nombre": "Ana López", "email": "ana@mail.com" }` | 200 OK |
| **PATCH**   | `/usuarios/{id}` | Modificar usuario (parcial) | `{ "email": "nuevo@mail.com" }` | 200 OK |
| **DELETE**  | `/usuarios/{id}` | Eliminar usuario | N/A | 204 No Content |

---

##  Reservas
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| **POST**    | `/reservas` | Crear reserva | `{ "usuarioId": "u123", "salaId": "s456", "peliculaId": "p789", "fecha": "2026-01-10T20:00:00Z" }` | 201 Created |
| **PUT**     | `/reservas/{id}` | Modificar reserva (completa) | `{ "fecha": "2026-01-11T18:00:00Z" }` | 200 OK |
| **PATCH**   | `/reservas/{id}` | Modificar reserva (parcial) | `{ "fecha": "2026-01-12T21:00:00Z" }` | 200 OK |
| **DELETE**  | `/reservas/{id}` | Cancelar reserva | N/A | 204 No Content |

---

## Pagos (asociado a una reservas)
| Método HTTP | Endpoint | Descripción | Ejemplo de cuerpo JSON | Respuestas posibles |
|-------------|----------|-------------|------------------------|---------------------|
| **POST**    | `/reservas/{reservaId}/pagos` | Registrar pago de una reserva | `{ "monto": 25.00, "metodo": "tarjeta" }` | 201 Created, 400 Bad Request, 402 Payment Required, 404 Not Found |
| **GET**     | `/reservas/{reservaId}/pagos/{pagoId}` | Obtener detalles de un pago | N/A | 200 OK, 404 Not Found |
| **PATCH**   | `/reservas/{reservaId}/pagos/{pagoId}` | Cancelar o modificar un pago | `{ "estado": "cancelado", "motivo": "cliente solicitó cancelación" }` | 200 OK, 404 Not Found |
| **DELETE**  | `/reservas/{reservaId}/pagos/{pagoId}` | Eliminar un pago | N/A | 204 No Content, 404 Not Found |
