# API REST - Hundir la Flota (Battleship).

## Descripción del Juego.

Juego de batalla naval para dos jugadores. Cada jugador dispone de una cuadrícula 10x10 donde coloca su flota:

| Tipo de Barco | Tamaño | Cantidad |
| :--- | :---: | :---: |
| Portaaviones | 4 cuadrados | 1 |
| Submarino | 3 cuadrados | 2 |
| Crucero | 2 cuadrados | 3 |
| Lancha | 1 cuadrado | 4 |

**Reglas de colocación:**
- Los barcos se colocan en horizontal o vertical (no en forma de L).
- Debe haber al menos 1 cuadrado de distancia entre barcos.
- Los barcos pueden pegarse al borde de la cuadrícula.

---

## Recursos Identificados.

| Recurso | URI Base | Descripción |
| :--- | :--- | :--- |
| **Usuarios** | `/api/v1/users` | Jugadores registrados o invitados |
| **Partidas** | `/api/v1/games` | Partidas entre dos jugadores |
| **Barcos** | `/api/v1/games/{gameId}/players/{playerId}/ships` | Barcos en la cuadrícula de un jugador |
| **Disparos** | `/api/v1/games/{gameId}/shots` | Disparos realizados en una partida |

---

## Endpoints.

### Usuarios (Users).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users` | - | `{"username": "player1", "email": "p1@email.com", "password": "***"}` | `{"id": 1, "username": "player1", "email": "p1@email.com", "createdAt": "2025-01-20"}` | 201, 400, 409, 500 |
| `GET` | `/api/v1/users/{id}` | - | - | `{"id": 1, "username": "player1", "email": "p1@email.com", "stats": {"wins": 10, "losses": 5}}` | 200, 404, 500 |
| `DELETE` | `/api/v1/users/{id}` | - | - | - | 204, 404, 500 |

---

### Partidas (Games).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/games` | - | `{"player1Id": 1, "player2Id": 2}` | `{"id": 100, "player1Id": 1, "player2Id": 2, "status": "setup", "createdAt": "2025-01-20T10:00:00"}` | 201, 400, 500 |
| `GET` | `/api/v1/games/{id}` | - | - | `{"id": 100, "player1": {...}, "player2": {...}, "status": "in_progress", "currentTurn": 1, "winner": null, "ships": {...}, "shots": [...]}` | 200, 404, 500 |
| `PATCH` | `/api/v1/games/{id}` | - | `{"player2Id": 3}` | `{"id": 100, "player1Id": 1, "player2Id": 3, "status": "setup"}` | 200, 400, 404, 500 |
| `DELETE` | `/api/v1/games/{id}` | - | - | - | 204, 404, 500 |

---

### Acciones de Partida (Game Actions).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/games/{id}/start` | - | - | `{"id": 100, "status": "in_progress", "currentTurn": 1, "startedAt": "2025-01-20T10:05:00"}` | 200, 400, 404, 409, 500 |
| `POST` | `/api/v1/games/{id}/finish` | - | `{"winnerId": 1}` | `{"id": 100, "status": "finished", "winnerId": 1, "finishedAt": "2025-01-20T11:00:00"}` | 200, 400, 404, 409, 500 |

---

### Barcos (Ships)

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/games/{gameId}/players/{playerId}/ships` | - | `{"type": "submarine", "size": 3, "orientation": "horizontal", "startPosition": {"x": 2, "y": 5}}` | `{"id": 50, "type": "submarine", "size": 3, "positions": [{"x": 2, "y": 5}, {"x": 3, "y": 5}, {"x": 4, "y": 5}]}` | 201, 400, 404, 409, 500 |
| `GET` | `/api/v1/games/{gameId}/players/{playerId}/ships` | - | - | `[{"id": 50, "type": "submarine", "size": 3, "positions": [...], "hits": 1, "sunk": false}, ...]` | 200, 404, 500 |
| `DELETE` | `/api/v1/games/{gameId}/players/{playerId}/ships/{shipId}` | - | - | - | 204, 404, 409, 500 |

---

### Disparos (Shots).

| Método HTTP | URI | Query Params | Request Body | Response Body | Códigos HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/games/{gameId}/shots` | - | `{"attackerId": 1, "targetId": 2, "position": {"x": 5, "y": 3}}` | `{"id": 200, "attackerId": 1, "targetId": 2, "position": {"x": 5, "y": 3}, "result": "hit", "shipSunk": null, "timestamp": "2025-01-20T10:15:00"}` | 201, 400, 404, 409, 500 |

---

## Códigos de Respuesta HTTP.

| Código | Descripción |
| :--- | :--- |
| `200` | OK - Operación exitosa |
| `201` | Created - Recurso creado exitosamente |
| `204` | No Content - Eliminación exitosa |
| `400` | Bad Request - Datos inválidos (posición fuera de cuadrícula, barco mal colocado, etc.) |
| `404` | Not Found - Recurso no encontrado |
| `409` | Conflict - Conflicto de estado (partida ya iniciada, posición ocupada, no es tu turno, etc.) |
| `500` | Internal Server Error - Error del servidor |

---

## Estados de una Partida.

| Estado | Descripción |
| :--- | :--- |
| `setup` | Partida creada, jugadores colocando barcos |
| `in_progress` | Partida iniciada, jugadores disparando por turnos |
| `finished` | Partida finalizada, hay un ganador |

---

## Resultados de Disparo.

| Resultado | Descripción |
| :--- | :--- |
| `miss` | Agua - No impactó ningún barco |
| `hit` | Tocado - Impactó un barco |
| `sunk` | Hundido - El barco fue completamente destruido |

---

## Notas de Diseño.

- **Barcos como subrecurso**: Los barcos pertenecen a un jugador dentro de una partida específica (`/games/{gameId}/players/{playerId}/ships`).
- **Acciones como endpoints**: Iniciar y finalizar partida usan `POST` en URIs de acción (`/start`, `/finish`) ya que representan transiciones de estado.
- **Validaciones importantes**:
  - Un barco no puede colocarse si viola las reglas de distancia.
  - Un disparo solo es válido si es el turno del jugador atacante.
  - La partida no puede iniciarse hasta que ambos jugadores hayan colocado todos sus barcos.
- **Jugadores invitados**: Se pueden crear partidas con `player2Id: null` para partidas contra invitados anónimos.
