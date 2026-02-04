# API REST – Sistema de reserva de Butacas de Cine

Las operaciones que la API debe soportar son las siguientes:

1. Crear, eliminar y modificar películas.
2. Crear, eliminar y modificar (parcialmente) salas.
3. Crear, eliminar y modificar (parcialmente) usuarios.
4. Crear una reserva para un usuario en una sala.
5. Cancelar una reserva para un usuario en una sala.
6. Modificar una reserva para un usuario en una sala.
7. Registrar un pago de una reserva.

---

## Endpoints de la API

| Recurso | Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP de respuesta |
|-----------|-----------|-----|--------------|--------------|---------------|---------------------------|
| Movies | POST | /api/v1/movies | - | `{ "title": "Inception", "duration": 148, "rating": "PG-13" }` | `{ "id": "mov123", "title": "Inception", "duration": 148, "rating": "PG-13" }` | 201, 400 |
| Movies | GET | /api/v1/movies | `rating`, `title` | - | `[ { "id": "mov123", "title": "Inception", "duration": 148, "rating": "PG-13" }, { "id": "mov456", "title": "Titanic", "duration": 195, "rating": "PG-13" } ]` | 200 |
| Movies | GET | /api/v1/movies/{id} | - | - | `{ "id": "mov123", "title": "Inception", "duration": 148, "rating": "PG-13" }` | 200, 404 |
| Movies | PUT | /api/v1/movies/{id} | - | `{ "title": "Inception", "duration": 150, "rating": "PG-13" }` | `{ "id": "mov123", "title": "Inception", "duration": 150, "rating": "PG-13" }` | 200, 400, 404 |
| Movies | DELETE | /api/v1/movies/{id} | - | - | - | 204, 404 |
| Rooms | POST | /api/v1/rooms | - | `{ "name": "Sala 1", "seats": 50 }` | `{ "id": "r1", "name": "Sala 1", "seats": 50 }` | 201, 400 |
| Rooms | GET | /api/v1/rooms | `name` | - | `[ { "id": "r1", "name": "Sala 1", "seats": 50 }, { "id": "r2", "name": "Sala 2", "seats": 70 } ]` | 200 |
| Rooms | GET | /api/v1/rooms/{id} | - | - | `{ "id": "r1", "name": "Sala 1", "seats": 50 }` | 200, 404 |
| Rooms | PUT | /api/v1/rooms/{id} | - | `{ "name": "Sala Principal", "seats": 60 }` | `{ "id": "r1", "name": "Sala Principal", "seats": 60 }` | 200, 400, 404 |
| Rooms | DELETE | /api/v1/rooms/{id} | - | - | - | 204, 404 |
| Users | POST | /api/v1/users | - | `{ "name": "Camilo", "lastname": "Rodriguez", "email": "camilo.r@test.com", "password": "camiR123" }` | `{ "id": "001", "name": "Camilo", "lastname": "Rodriguez", "email": "camilo.r@test.com" }` | 201, 400, 409, 422 |
| Users | GET | /api/v1/users | `email`, `lastname` | - | `[ { "id": "001", "name": "Camilo", "lastname": "Rodriguez", "email": "camilo.r@test.com" }, { "id": "002", "name": "Andrea", "lastname": "Paz", "email": "andre.123@test.com" } ]` | 200 |
| Users | GET | /api/v1/users/{id} | - | - | `{ "id": "001", "name": "Camilo", "lastname": "Rodriguez", "email": "camilo.r@test.com" }` | 200, 404 |
| Users | PUT | /api/v1/users/{id} | - | `{ "name": "Camila", "lastname": "Rodriguez", "email": "camilo.r@test.com", "password": "camiabc" }` | `{ "id": "001", "name": "Camila", "lastname": "Rodriguez", "email": "camilo.r@test.com" }` | 200, 400, 404 |
| Users | DELETE | /api/v1/users/{id} | - | - | - | 204, 404 |
| Reservations | POST | /api/v1/reservations | - | `{ "userId": "001", "roomId": "r1", "movieId": "mov123", "seat": "A10", "date": "2026-01-15" }` | `{ "id": "res1", "userId": "001", "roomId": "r1", "movieId": "mov123", "seat": "A10", "date": "2026-01-15", "status": "ACTIVE" }` | 201, 400, 404 |
| Reservations | PUT | /api/v1/reservations/{id} | - | `{ "seat": "A12", "date": "2026-01-16" }` | `{ "id": "res1", "userId": "001", "roomId": "r1", "movieId": "mov123", "seat": "A12", "date": "2026-01-16", "status": "ACTIVE" }` | 200, 400, 404 |
| Reservations | DELETE | /api/v1/reservations/{id} | - | - | - | 204, 404 |
| Payments | POST | /api/v1/payments | - | `{ "reservationId": "res1", "amount": 25000, "method": "CREDIT_CARD" }` | `{ "id": "pay1", "reservationId": "res1", "amount": 25000, "method": "CREDIT_CARD", "status": "PAID" }` | 201, 400, 404 |

---
