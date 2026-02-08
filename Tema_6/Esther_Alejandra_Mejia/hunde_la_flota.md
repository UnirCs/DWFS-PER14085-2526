# API del juego Hundir la flota

## Recursos identificados

- **users**: usuarios del sistema.
- **games**: partidas del juego.
- **players**: jugadores asociados a una partida.
- **boards**: tableros de cada jugador.
- **ships**: barcos colocados en el tablero.
- **shots**: disparos realizados durante la partida.

## Endpoints

| Método HTTP | URI                                        | Query Params  | Request Body                                                        | Response Body                             |Códigos HTTP de respuesta|
|-------------|--------------------------------------------|---------------|---------------------------------------------------------------------|-------------------------------------------|-------------------------|
| POST        | /api/v1/users                              |---------------| {"name":"Carlos","email":"c@mail.com"}                              | {"id":"u_1"}                              | 201, 400, 409           |
| POST        | /api/v1/games                              |---------------| {"createdBy":"u_1"}                                                 | {"id":"g_1","status":"CREATED"}           | 201, 400                |
| PATCH       | /api/v1/games/{id}                         |---------------| {"status":"STARTED"}                                                | {"id":"g_1","status":"STARTED"}           | 200, 404, 409           |
| PATCH       | /api/v1/games/{id}                         |---------------| {"status":"FINISHED","winnerPlayerId":"p_2"}                        | {"id":"g_1","status":"FINISHED"}          | 200, 404, 409           |
| GET         | /api/v1/games/{id}                         |---------------|---------------------------------------------------------------------| {"id":"g_1","status":"STARTED"}           | 200, 404                |
| POST        | /api/v1/games/{id}/players                 |---------------| {"userId":"u_2"}                                                    | {"playerId":"p_2"}                        | 201, 400, 404, 409      |
| POST        | /api/v1/games/{id}/boards/{playerId}/ships |---------------| {"cells":["A1","A2","A3","A4"]}                                     | {"shipId":"s_1"}                          | 201, 400, 404, 422      |
| POST        | /api/v1/games/{id}/shots                   |---------------| {"shooterPlayerId":"p_1","targetPlayerId":"p_2","cell":"B7"}        | {"result":"HIT"}                          | 201, 400, 404, 409      |
