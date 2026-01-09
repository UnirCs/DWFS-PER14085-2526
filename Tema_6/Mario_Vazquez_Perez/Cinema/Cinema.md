## Recursos identificados

- Películas (movies): Representa las películas disponibles en el cine, incluyendo detalles como título, duración, género y clasificación por edades.
- Salas (rooms): Representa las salas de cine donde se proyectan las películas, incluyendo capacidad y tipo de sala (2D, 3D, IMAX).
- Usuarios (users): Representa a los usuarios registrados en el sistema, incluyendo información personal y preferencias.
- Reservas (bookings): Representa las reservas realizadas por los usuarios para asistir a una sesión específica.
- Pagos (payments): Representa los pagos realizados por los usuarios para sus reservas.

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP de respuesta |
|-------------|-----|--------------|--------------|---------------|---------------------------|
| GET | /movies | `genre=action&rating=PG-13&page=1&limit=20` | - | `{"movies": [{"id": "uuid", "title": "Movie Title", "duration": 120, "genre": "action", "rating": "PG-13"}], "total": 50, "page": 1, "limit": 20}` | 200 |
| GET | /movies/{id} | - | - | `{"id": "uuid", "title": "Movie Title", "duration": 120, "genre": "action", "rating": "PG-13", "synopsis": "..."}` | 200, 404 |
| POST | /movies | - | `{"title": "Movie Title", "duration": 120, "genre": "action", "rating": "PG-13", "synopsis": "..."}` | `{"id": "uuid", "title": "Movie Title", "duration": 120, "genre": "action", "rating": "PG-13", "synopsis": "..."}` | 201, 400 |
| PUT | /movies/{id} | - | `{"title": "Updated Title", "duration": 125, "genre": "action", "rating": "PG-13"}` | `{"id": "uuid", "title": "Updated Title", "duration": 125, "genre": "action", "rating": "PG-13"}` | 200, 400, 404 |
| DELETE | /movies/{id} | - | - | - | 204, 404 |
| GET | /rooms | `type=IMAX&page=1&limit=20` | - | `{"rooms": [{"id": "uuid", "name": "Sala 1", "capacity": 200, "type": "IMAX"}], "total": 10, "page": 1, "limit": 20}` | 200 |
| GET | /rooms/{id} | - | - | `{"id": "uuid", "name": "Sala 1", "capacity": 200, "type": "IMAX"}` | 200, 404 |
| POST | /rooms | - | `{"name": "Sala 1", "capacity": 200, "type": "IMAX"}` | `{"id": "uuid", "name": "Sala 1", "capacity": 200, "type": "IMAX"}` | 201, 400 |
| PUT | /rooms/{id} | - | `{"name": "Sala 1", "capacity": 250, "type": "3D"}` | `{"id": "uuid", "name": "Sala 1", "capacity": 250, "type": "3D"}` | 200, 400, 404 |
| DELETE | /rooms/{id} | - | - | - | 204, 404 |
| GET | /users | `page=1&limit=20` | - | `{"users": [{"id": "uuid", "name": "John Doe", "email": "john@example.com", "preferences": {...}}], "total": 100, "page": 1, "limit": 20}` | 200 |
| GET | /users/{id} | - | - | `{"id": "uuid", "name": "John Doe", "email": "john@example.com", "phone": "123456789", "preferences": {...}}` | 200, 404 |
| POST | /users | - | `{"name": "John Doe", "email": "john@example.com", "password": "****", "phone": "123456789"}` | `{"id": "uuid", "name": "John Doe", "email": "john@example.com", "phone": "123456789"}` | 201, 400, 409 |
| PUT | /users/{id} | - | `{"name": "John Doe", "email": "john@example.com", "phone": "987654321"}` | `{"id": "uuid", "name": "John Doe", "email": "john@example.com", "phone": "987654321"}` | 200, 400, 404 |
| DELETE | /users/{id} | - | - | - | 204, 404 |
| GET | /bookings | `userId=uuid&movieId=uuid&date=2026-01-10&page=1&limit=20` | - | `{"bookings": [{"id": "uuid", "userId": "uuid", "sessionId": "uuid", "seats": ["A1", "A2"], "status": "confirmed"}], "total": 50, "page": 1, "limit": 20}` | 200 |
| GET | /bookings/{id} | - | - | `{"id": "uuid", "userId": "uuid", "sessionId": "uuid", "movieTitle": "...", "roomName": "Sala 1", "seats": ["A1", "A2"], "totalPrice": 20.00, "status": "confirmed", "createdAt": "2026-01-06T10:30:00Z"}` | 200, 404 |
| POST | /bookings | - | `{"userId": "uuid", "sessionId": "uuid", "seats": ["A1", "A2"]}` | `{"id": "uuid", "userId": "uuid", "sessionId": "uuid", "seats": ["A1", "A2"], "totalPrice": 20.00, "status": "pending"}` | 201, 400, 409 |
| PUT | /bookings/{id} | - | `{"seats": ["A1", "A2", "A3"], "status": "confirmed"}` | `{"id": "uuid", "seats": ["A1", "A2", "A3"], "status": "confirmed", "totalPrice": 30.00}` | 200, 400, 404 |
| DELETE | /bookings/{id} | - | - | - | 204, 404 |
| GET | /payments | `userId=uuid&bookingId=uuid&page=1&limit=20` | - | `{"payments": [{"id": "uuid", "bookingId": "uuid", "amount": 20.00, "method": "credit_card", "status": "completed"}], "total": 30, "page": 1, "limit": 20}` | 200 |
| GET | /payments/{id} | - | - | `{"id": "uuid", "bookingId": "uuid", "userId": "uuid", "amount": 20.00, "method": "credit_card", "status": "completed", "transactionId": "TXN123", "createdAt": "2026-01-06T10:30:00Z"}` | 200, 404 |
| POST | /payments | - | `{"bookingId": "uuid", "amount": 20.00, "method": "credit_card", "cardDetails": {...}}` | `{"id": "uuid", "bookingId": "uuid", "amount": 20.00, "status": "completed", "transactionId": "TXN123"}` | 201, 400, 402 |