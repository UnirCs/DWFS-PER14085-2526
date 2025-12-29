# API de un sistema de reserva de butacas de cine

| Metodo HTTP | URI | Query Params | Cuerpo de la peticion | Cuerpo de la respuesta | Codigos de respuestas |
|-------------|-----|--------------|----------------------|----------------------|---------------------|
| POST | `/movie` | N/A | `{"name": "Iron Man", "synopsis": "asdasdasdasdasdasdasdasdasd", "duration": 120}` | `{"movieId": 1, "name": "Iron Man", "synopsis": "asdasdasdasdasdasdasdasdasd", "duration": 120}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| PUT | `/movie` | `movieId` | `{"name": "Iron Man", "synopsis": "asdasdasdasdasdasdasdasdasd", "duration": 120}` | `{"message": "Movie updated"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| DELETE | `/movie` | `movieId` | N/A | `{"message": "Movie deleted"}` | `200 OK`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/hall` | N/A | `{"hallNumber": 5, "seats": 100}` | `{"hallId": 1, "hallNumber": 5, "seats": 100}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| PATCH | `/hall` | `hallId` | `{"seats": 120}` | `{"message": "Hall updated"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| DELETE | `/hall` | `hallId` | N/A | `{"message": "Hall deleted"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/user` | N/A | `{"username": "gerardohqz", "password": "12345", "status": "activo"}` | `{"userId": 1, "username": "gerardohqz", "password": "skdjwpokhflapji23j", "status": "activo"}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| PATCH | `/user` | `userId` | `{"status": "inactivo"}` | `{"message": "User updated"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| DELETE | `/user` | `userId` | N/A | `{"message": "User deleted"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/reservation` | N/A | `{"userId": 1, "seats": ["30J", "31J", "32J"], "hall": 5, "status": "activo"}` | `{"reservationId": 1, "userId": 1, "seats": ["30J", "31J", "32J"], "hall": 5, "status": "activo"}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| PATCH | `/reservation` | `reservationId` | `{"status": "inactivo", "userId": 1, "seats": ["20H", "21H", "22H", "23H"], "hall": 5}` | `{"message": "Reservation updated"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| PUT | `/reservation` | `reservationId` | `{"status": "activo"}` | `{"message": "Reservation updated"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/pay` | N/A | `{"userId": 1, "reservationId": 1, "amount": 10}` | `{"paymentId": 1, "userId": 1, "reservationId": 1, "amount": 10}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
