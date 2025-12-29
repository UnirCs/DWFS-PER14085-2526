# API del juego hunde la flota

| Metodo HTTP | URI | Query Params | Cuerpo de la peticion | Cuerpo de la respuesta | Codigos de respuestas |
|-------------|-----|--------------|----------------------|----------------------|---------------------|
| POST | `/game` | N/A | `{"userId1": 1, "userId2": 2}` o `{"username1": "guest1", "username2": "guest2"}` | `{"gameId": 1, "userId1": 1, "userId2": 2, "username1": null, "username2": null, "status": "Creado", "currentTurn": null, "userWinner": null}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| PATCH | `/game` | `gameId` | `{"status": "Iniciado"}` o `{"status": "Finalizado", "userWinner": 1}` | `{"message": "Game Updated"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| DELETE | `/game` | `gameId` | N/A | `{"message": "Game Deleted"}` | `200 OK`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| PUT | `/game` | `gameId` | `{"userId1": 1, "userId2": 2, "status": "Creado", "currentTurn": 1}` | `{"message": "Game Updated"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| GET | `/game` | `gameId` | N/A | `{"gameId": 1, "userId1": 1, "userId2": 2, "username1": null, "username2": null, "status": "Iniciado", "currentTurn": 1, "userWinner": null, "boats": {"player1": [...], "player2": [...]}, "shots": [...]}` | `200 Ok`<br>`404 Not Found`<br>`500 Internal Server Error` |
| POST | `/boat` | N/A | `{"gameId": 1, "userId": 1, "position": ["C9", "C10"], "size": 2, "orientation": "horizontal"}` | `{"boatId": 1, "gameId": 1, "userId": 1, "position": ["C9", "C10"], "size": 2, "orientation": "horizontal", "isSunk": false, "status": "activo"}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| DELETE | `/boat` | `boatId` | N/A | `{"message": "Boat Deleted"}` | `200 OK`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| GET | `/boat` | `userId`, `gameId` | N/A | `{"boats": [{"boatId": 1, "gameId": 1, "userId": 1, "position": ["C9", "C10"], "size": 2, "orientation": "horizontal", "isSunk": false, "status": "activo"}]}` | `200 Ok`<br>`404 Not Found`<br>`500 Internal Server Error` |
| POST | `/shot` | N/A | `{"gameId": 1, "userAttackId": 1, "position": "C9", "userEnemyId": 2}` | `{"shotId": 1, "gameId": 1, "userId": 1, "position": "C9", "hit": true, "sunkBoatId": null}` | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| POST | `/user` | N/A | `{"username": "test1", "password": "1234"}` | `{"userId": 1, "username": "test1", "password": "sadwoih1233", "status": "activo", "role": "user"}`<br>role: "user" o "guest" | `201 Created`<br>`400 Bad Request`<br>`500 Internal Server Error` |
| GET | `/user` | `username` | N/A | `{"userId": 1, "username": "test1", "password": "sadwoih1233", "status": "activo", "role": "user"}`<br>role: "user" o "guest" | `200 Ok`<br>`404 Not Found`<br>`500 Internal Server Error` |
| DELETE | `/user` | `userId` | N/A | `{"message": "User Deleted"}` | `200 Ok`<br>`400 Bad Request`<br>`500 Internal Server Error` |
