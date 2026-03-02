# API REST – Juego hunde el barco

Las operaciones que la API debe soportar son las siguientes:
- Crear una partida.
- Eliminar una partida.
- Modificar datos de una partida.
- Iniciar una partida.
- Finalizar una partida.
- Consultar todos los datos (jugadores asociados, barcos de cada jugador, disparos realizados, ganador...) de una partida.
- Añadir un barco a la cuadrícula de un jugador en una partida.
- Eliminar un barco de la cuadrícula de un jugador en una partida.
- Consultar todos los barcos de un jugador de una partida.
- Registrar un disparo de un jugador a otro en una partida.
- Crear un usuario.
- Obtener datos de un usuario.
- Eliminar un usuario.

---

## Endpoints de la API

| Recurso | Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
|--------|-------------|-----|--------------|--------------|---------------|--------------|
| Users | POST | /api/v1/users | - | `{ "username": "player1", "email": "p1@test.com" }` | `{ "id": "u1", "username": "player1" }` | 201, 400 |
| Users | GET | /api/v1/users/{id} | - | - | `{ "id": "u1", "username": "player1" }` | 200, 404 |
| Users | DELETE | /api/v1/users/{id} | - | - | - | 204, 404 |
| Games | POST | /api/v1/games | - | `{ "players": [ { "userId": "u1" }, { "guestName": "Invitado" } ] }` | `{ "id": "g1", "status": "CREATED" }` | 201, 400 |
| Games | PUT | /api/v1/games/{id} | - | `{ "status": "STARTED" }` | `{ "id": "g1", "status": "STARTED" }` | 200, 400, 404 |
| Games | DELETE | /api/v1/games/{id} | - | - | - | 204, 404 |
| Games | GET | /api/v1/games/{id} | - | - | `{ "id": "g1", "status": "FINISHED", "winner": "p1", "players": [...] }` | 200, 404 |
| Ships | POST | /api/v1/games/{gameId}/players/{playerId}/ships | - | `{ "type": 3, "orientation": "H", "positions": ["A1","A2","A3"] }` | `{ "id": "s1", "type": 3, "destroyed": false }` | 201, 400, 404 |
| Ships | GET | /api/v1/games/{gameId}/players/{playerId}/ships | `type`, `destroyed` | - | `[ { "id": "s1", "type": 3 } ]` | 200 |
| Ships | DELETE | /api/v1/games/{gameId}/players/{playerId}/ships/{id} | - | - | - | 204, 404 |
| Shots | POST | /api/v1/games/{gameId}/shots | - | `{ "fromPlayerId": "p1", "toPlayerId": "p2", "position": "B4" }` | `{ "result": "HIT" }` | 201, 400, 404 |

---