# API de reserva de butacas de cine

## Recursos identificados

- **movies**: películas disponibles en el cine.
- **rooms**: salas del cine con su distribución de asientos.
- **users**: usuarios del sistema.
- **reservations**: reservas de butacas realizadas por los usuarios.
- **payments**: pagos asociados a una reserva.

## Endpoints

| Método HTTP | URI                       | Query Params  | Request Body                                                        | Response Body                              |Códigos HTTP de respuesta|
|-------------|---------------------------|---------------|---------------------------------------------------------------------|--------------------------------------------|-------------------------|
| GET         | /api/v1/movies            | title, genre  |---------------------------------------------------------------------| {"movies":[...]}                           | 200                     |
| POST        | /api/v1/movies            |---------------| {"title":"Dune","genre":"Sci-Fi"}                                   | {"id":"m_1","title":"Dune"}                | 201, 400                |
| PATCH       | /api/v1/movies/{id}       |---------------| {"title":"Dune Part One"}                                           | {"id":"m_1","title":"Dune Part One"}       | 200, 400, 404           |
| DELETE      | /api/v1/movies/{id}       |---------------|---------------------------------------------------------------------|--------------------------------------------| 204, 404                |
| GET         | /api/v1/rooms             |---------------|---------------------------------------------------------------------| {"rooms":[...]}                            | 200                     |
| POST        | /api/v1/rooms             |---------------| {"name":"Sala 1","rows":10,"cols":12}                               | {"id":"r_1"}                               | 201, 400                |
| POST        | /api/v1/users             |---------------| {"name":"Ana","email":"ana@mail.com"}                               | {"id":"u_1"}                               | 201, 400, 409           |
| POST        | /api/v1/reservations      |---------------| {"userId":"u_1","movieId":"m_1","roomId":"r_1","seats":["A1","A2"]} | {"id":"res_1","status":"CREATED"}          | 201, 400, 404, 409      |
| PATCH       | /api/v1/reservations/{id} |---------------| {"seats":["A3","A4"]}                                               | {"id":"res_1","status":"UPDATED"}          | 200, 400, 404, 409      |
| DELETE      | /api/v1/reservations/{id} |---------------|---------------------------------------------------------------------|--------------------------------------------| 204, 404                |
| POST        | /api/v1/payments          |---------------| {"reservationId":"res_1","amount":200}                              | {"id":"pay_1","status":"PAID"}             | 201, 400, 404, 409      |

