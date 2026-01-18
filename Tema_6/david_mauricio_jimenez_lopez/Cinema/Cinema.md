# API de un sistema de reserva de butacas de cine


**Recursos identificados:**
- **Película (Movies):** Títulos disponibles en el cine.
- **Sala (Rooms):** Espacios físicos donde se proyectan las películas.
- **Usuario (Users):** Clientes registrados en el sistema.
- **Reserva (Reservations):** Vinculación entre un usuario, una sala y sus butacas.
- **Pago (Payments):** Registro transaccional asociado a una reserva.



| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/movies` | - | `{"title": "Avatar", "duration": 160}` | `{"id": 1, "title": "Avatar"}` | 201, 400, 500 |
| `PUT` | `/api/v1/movies/{id}` | - | `{"title": "Avatar 2", "duration": 190}` | `{"id": 1, "title": "Avatar 2"}` | 200, 404, 500 |
| `DELETE` | `/api/v1/movies/{id}` | - | - | - | 204, 404, 500 |
| `POST` | `/api/v1/rooms` | - | `{"name": "Sala 1", "capacity": 50}` | `{"id": 10, "name": "Sala 1"}` | 201, 400, 500 |
| `PATCH` | `/api/v1/rooms/{id}` | - | `{"capacity": 60}` | `{"id": 10, "capacity": 60}` | 200, 404, 500 |
| `DELETE` | `/api/v1/rooms/{id}` | - | - | - | 204, 404, 500 |
| `POST` | `/api/v1/users` | - | `{"name": "Juan", "email": "j@test.com"}` | `{"id": 100, "name": "Juan"}` | 201, 400, 500 |
| `PATCH` | `/api/v1/users/{id}` | - | `{"email": "nuevo@test.com"}` | `{"id": 100, "email": "nuevo@..."}` | 200, 404, 500 |
| `DELETE` | `/api/v1/users/{id}` | - | - | - | 204, 404, 500 |
| `POST` | `/api/v1/reservations` | - | `{"userId": 100, "roomId": 10, "seats": ["A1", "A2"]}` | `{"id": 500, "status": "pending"}` | 201, 400, 500 |
| `PATCH` | `/api/v1/reservations/{id}` | - | `{"seats": ["B1", "B2"]}` | `{"id": 500, "seats": ["B1", "B2"]}` | 200, 404, 500 |
| `DELETE` | `/api/v1/reservations/{id}` | - | - | - | 204, 404, 500 |
| `POST` | `/api/v1/reservations/{id}/payments` | - | `{"amount": 15.50, "method": "card"}` | `{"paymentId": 99, "status": "paid"}` | 201, 400, 404, 500 |

---
