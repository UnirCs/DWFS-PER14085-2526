# API REST - Sistema de Reserva de Butacas de Cine.

## Recursos Identificados.

| Recurso | URI Base | Descripción |
| :--- | :--- | :--- |
| **Películas** | `/api/v1/movies` | Títulos disponibles en cartelera |
| **Salas** | `/api/v1/rooms` | Espacios físicos de proyección |
| **Usuarios** | `/api/v1/users` | Clientes registrados en el sistema |
| **Reservas** | `/api/v1/reservations` | Reservas de butacas por usuario |
| **Pagos** | `/api/v1/reservations/{id}/payments` | Transacciones asociadas a reservas |

---

## Endpoints.

### Películas (Movies).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/movies` | - | `{"title": "Avatar", "duration": 160, "genre": "Sci-Fi"}` | `{"id": 1, "title": "Avatar", "duration": 160, "genre": "Sci-Fi"}` | 201, 400, 500 |
| `PUT` | `/api/v1/movies/{id}` | - | `{"title": "Avatar 2", "duration": 190, "genre": "Sci-Fi"}` | `{"id": 1, "title": "Avatar 2", "duration": 190, "genre": "Sci-Fi"}` | 200, 400, 404, 500 |
| `DELETE` | `/api/v1/movies/{id}` | - | - | - | 204, 404, 500 |

---

### Salas (Rooms).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/rooms` | - | `{"name": "Sala 1", "capacity": 50, "type": "standard"}` | `{"id": 10, "name": "Sala 1", "capacity": 50, "type": "standard"}` | 201, 400, 500 |
| `PATCH` | `/api/v1/rooms/{id}` | - | `{"capacity": 60}` | `{"id": 10, "name": "Sala 1", "capacity": 60, "type": "standard"}` | 200, 400, 404, 500 |
| `DELETE` | `/api/v1/rooms/{id}` | - | - | - | 204, 404, 500 |

---

### Usuarios (Users).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users` | - | `{"name": "Juan Pérez", "email": "juan@email.com", "phone": "123456789"}` | `{"id": 100, "name": "Juan Pérez", "email": "juan@email.com"}` | 201, 400, 500 |
| `PATCH` | `/api/v1/users/{id}` | - | `{"email": "nuevo@email.com"}` | `{"id": 100, "name": "Juan Pérez", "email": "nuevo@email.com"}` | 200, 400, 404, 500 |
| `DELETE` | `/api/v1/users/{id}` | - | - | - | 204, 404, 500 |

---

### Reservas (Reservations).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/reservations` | - | `{"userId": 100, "roomId": 10, "movieId": 1, "seats": ["A1", "A2"], "showtime": "2025-01-20T18:00:00"}` | `{"id": 500, "userId": 100, "roomId": 10, "seats": ["A1", "A2"], "status": "pending"}` | 201, 400, 409, 500 |
| `PATCH` | `/api/v1/reservations/{id}` | - | `{"seats": ["B1", "B2"]}` | `{"id": 500, "userId": 100, "seats": ["B1", "B2"], "status": "pending"}` | 200, 400, 404, 409, 500 |
| `DELETE` | `/api/v1/reservations/{id}` | - | - | - | 204, 404, 500 |

---

### Pagos (Payments).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/reservations/{id}/payments` | - | `{"amount": 25.00, "method": "card", "cardLast4": "1234"}` | `{"paymentId": 99, "reservationId": 500, "amount": 25.00, "status": "completed"}` | 201, 400, 404, 500 |

---

## Códigos de Respuesta HTTP.

| Código | Descripción |
| :--- | :--- |
| `200` | OK - Operación exitosa |
| `201` | Created - Recurso creado exitosamente |
| `204` | No Content - Eliminación exitosa |
| `400` | Bad Request - Datos de entrada inválidos |
| `404` | Not Found - Recurso no encontrado |
| `409` | Conflict - Conflicto (ej: butaca ya reservada) |
| `500` | Internal Server Error - Error del servidor |

---

## Notas de Diseño.

- **PUT vs PATCH**: Se usa `PUT` para películas (reemplazo completo) y `PATCH` para salas y usuarios (modificación parcial).
- **Pagos como subrecurso**: Los pagos están anidados bajo reservas (`/reservations/{id}/payments`) ya que siempre pertenecen a una reserva específica.
- **Cancelación de reserva**: Se implementa mediante `DELETE` sobre el recurso de reserva.
