# API de un sistema de reserva de butacas de cine

En este ejercicio vamos a diseñar la API REST para el cine en el que venimos trabajando en los ejercicios de los anteriores temas.

Las operaciones que la API debe soportar son las siguientes:

- Crear, eliminar y modificar películas.
- Crear, eliminar y modificar (parcialmente) salas.
- Crear, eliminar y modificar (parcialmente) usuarios.
- Crear una reserva para un usuario en una sala.
- Cancelar una reserva para un usuario en una sala.
- Modificar una reserva para un usuario en una sala.
- Registrar un pago de una reserva.

## Recursos identificados

- films: elemento de las películas
- rooms: elemento de la sala
- users: elemnto de los usuarios
- bookings: elemento de las reservas

## API Endpoints

| Método HTTP | URI                    | Query Params | Request Body                                       | Response Body                                                       | Códigos HTTP de respuesta |
| ----------- | ---------------------- | ------------ | -------------------------------------------------- | ------------------------------------------------------------------- | ------------------------- |
| GET         | /films                 | -            | -                                                  | `[{"id":1,"title":"...", "director":"..."}]`                        | 200                       |
| GET         | /films/{id}            | -            | -                                                  | `{"id":1,"title":"...","director":"...","duration":120}`            | 200, 404                  |
| POST        | /films                 | -            | `{"title":"...","director":"...","duration":120}`  | `{"id":1,"title":"...","director":"..."}`                           | 201, 400                  |
| PUT         | /films/{id}            | -            | `{"title":"...","director":"...","duration":120}`  | `{"id":1,"title":"...","director":"..."}`                           | 200, 400, 404             |
| DELETE      | /films/{id}            | -            | -                                                  | `{"detail":"Película eliminada"}`                                   | 204, 404                  |
| GET         | /rooms                 | -            | -                                                  | `[{"id":1,"name":"Sala A","capacity":100}]`                         | 200                       |
| GET         | /rooms/{id}            | -            | -                                                  | `{"id":1,"name":"Sala A","capacity":100,"seats":[...]}`             | 200, 404                  |
| POST        | /rooms                 | -            | `{"name":"Sala A","capacity":100}`                 | `{"id":1,"name":"Sala A","capacity":100}`                           | 201, 400                  |
| PATCH       | /rooms/{id}            | -            | `{"name":"Sala B"}`                                | `{"id":1,"name":"Sala B","capacity":100}`                           | 200, 400, 404             |
| DELETE      | /rooms/{id}            | -            | -                                                  | `{"detail":"Sala eliminada"}`                                       | 204, 404                  |
| GET         | /users                 | -            | -                                                  | `[{"id":1,"name":"Juan","email":"juan@..."}]`                       | 200                       |
| GET         | /users/{id}            | -            | -                                                  | `{"id":1,"name":"Juan","email":"juan@...","phone":"..."}`           | 200, 404                  |
| POST        | /users                 | -            | `{"name":"Juan","email":"juan@...","phone":"..."}` | `{"id":1,"name":"Juan","email":"juan@..."}`                         | 201, 400                  |
| PATCH       | /users/{id}            | -            | `{"name":"Juan"}`                                  | `{"id":1,"name":"Juan","email":"juan@..."}`                         | 200, 400, 404             |
| DELETE      | /users/{id}            | -            | -                                                  | `{"detail":"Usuario eliminado"}`                                    | 204, 404                  |
| GET         | /bookings              | -            | -                                                  | `[{"id":1,"user_id":1,"room_id":1,"seats":[1,2]}]`                  | 200                       |
| POST        | /bookings              | -            | `{"user_id":1,"room_id":1,"seats":[1,2]}`          | `{"id":1,"user_id":1,"room_id":1,"seats":[1,2],"status":"pending"}` | 201, 400, 404, 409        |
| PUT         | /bookings/{id}         | -            | `{"seats":[3,4]}`                                  | `{"id":1,"user_id":1,"room_id":1,"seats":[3,4],"status":"pending"}` | 200, 400, 404, 409        |
| DELETE      | /bookings/{id}         | -            | -                                                  | `{"detail":"Reserva cancelada"}`                                    | 204, 404                  |
| POST        | /bookings/{id}/payment | -            | `{"amount":50.00,"payment_method":"card"}`         | `{"id":1,"booking_id":1,"amount":50.00,"status":"completed"}`       | 201, 400, 404             |
