# API del juego hunde la flota

**Recursos identificados:**
- **Usuario (Users):** Jugadores registrados o invitados.
- **Partida (Games):** Instancia de un juego entre dos jugadores.
- **Barco (Ships):** Piezas colocadas en la cuadrícula de un jugador.
- **Disparo (Shots):** Intentos de ataque realizados durante la partida.

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users` | - | `{"name": "Capitán", "guest": false}` | `{"id": "u1", "name": "Capitán"}` | 201, 400, 500 |
| `GET` | `/api/v1/users/{id}` | - | - | `{"id": "u1", "name": "Capitán", "stats": {...}}` | 200, 404, 500 |
| `DELETE` | `/api/v1/users/{id}` | - | - | - | 204, 404, 500 |
| `POST` | `/api/v1/games` | - | `{"player1": "u1", "player2": "u2"}` | `{"id": "g88", "status": "setup"}` | 201, 400, 500 |
| `GET` | `/api/v1/games/{id}` | - | - | `{"id": "g88", "players": [...], "winner": null, "status": "playing"}` | 200, 404, 500 |
| `PATCH` | `/api/v1/games/{id}` | - | `{"status": "started"}` | `{"id": "g88", "status": "started"}` | 200, 400, 404 |
| `DELETE` | `/api/v1/games/{id}` | - | - | - | 204, 404, 500 |
| `POST` | `/api/v1/games/{id}/players/{uId}/ships` | - | `{"type": "4x1", "x": 1, "y": 1, "dir": "H"}` | `{"id": "s1", "placed": true}` | 201, 400, 422 |
| `GET` | `/api/v1/games/{id}/players/{uId}/ships` | - | - | `{"ships": [{"id": "s1", "type": "4x1", ...}]}` | 200, 404, 500 |
| `DELETE` | `/api/v1/games/{id}/players/{uId}/ships/{sId}` | - | - | - | 204, 404, 500 |
| `POST` | `/api/v1/games/{id}/shots` | - | `{"playerId": "u1", "x": 5, "y": 5}` | `{"result": "tocado", "extra_shot": true}` | 201, 400, 403, 422 |

---

**Descripción de los Recursos:**

- **USERS**: Permite gestionar la identidad de los jugadores. Se diferencia entre usuarios registrados y anónimos mediante el cuerpo de la petición.
- **GAMES**: Es el recurso central. 
    - El `POST` crea la instancia de la partida en estado "setup" (preparación).
    - El `PATCH` se utiliza para **Iniciar** o **Finalizar** la partida cambiando su atributo `status`.
    - El `GET` retorna el estado completo, incluyendo quién va ganando y los datos de ambos jugadores.
- **SHIPS (Sub-recurso de Game/Player)**: 
    - Representa los barcos en la cuadrícula de un jugador específico dentro de una partida.
    - El `POST` debe validar las reglas del juego (no solapamiento, distancia de 1 cuadro, tamaño del barco). Si se rompe una regla de posición, devuelve `422`.
    - El `DELETE` permite reubicar barcos eliminándolos antes de empezar la partida.
- **SHOTS**: 
    - Registra el ataque de un jugador. 
    - El servidor calcula si el resultado es "agua", "tocado" o "hundido" y lo devuelve en el cuerpo de respuesta.
    - Devuelve `403 Forbidden` si un jugador intenta disparar fuera de su turno.

