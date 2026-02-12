# API del juego hunde la flota

En este ejercicio vamos a diseñar la API REST que podría usar la App del juego 'Hundir la flota' o 'Juego de los barcos'.

Si no conoces este juego puedes echar un vistazo al PDF de instrucciones que se encuentra en esta misma ruta, o descarga una App existente para jugar una partida. La aplicación gestionará principalmente partidas entre usuarios registrados o invitados (es decir, sin registro, anónimos). Cada partida tiene asociadas dos cuadrículas de 10x10 cuadrados, una por cada jugador, y estos jugadores deben poner sobre dicha cuadrícula las localizaciones de sus barcos. Tal como se indica en las instrucciones, deberá haber:

- 1 barco de 4 cuadrados.
- 2 barcos de 3 cuadrados.
- 3 barcos de 2 cuadrados.
- 4 barcos de 1 cuadrado.

También es necesario que, como dicen las instrucciones, se respeten dos reglas:

- Los barcos se colocan enteramente en horizontal o enteramente en vertical, es decir, no puede haber un barco en forma de L.
- Siempre debe haber un cuadrado de distancia entre cualquier punto de cualquier barco, y se pueden pegar al borde de la cuadrícula.

El objetivo del ejercicio es diseñar una API REST que será implementada (en otros ejercicios) por un microservicio o aplicación que se encargará de tratar todos los datos de las diferentes partidas. En este ejercicio nos centraremos únicamente en el diseño de la API y no trataremos ningún detalle de la implementación.

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

## Recursos identificados

- **users**: usuarios registrados del juego
- **games**: partidas creadas
- **ships**: barcos colocados en la cuadrícula de un jugador
- **shots**: disparos realizados durante una partida

## Relaciones entre recursos

- Un usuario puede tener múltiples partidas (1:N)
- Una partida tiene asociados 2 usuarios (jugadores) (N:N)
- Una partida tiene múltiples barcos de cada jugador (1:N)
- Una partida tiene múltiples disparos entre jugadores (1:N)
- Un disparo es realizado por un usuario contra otro (N:N)

## Atributos de cada recurso

**users**: id, name, email, created_at

**games**: id, player1_id, player2_id, status (pending/in_progress/finished), winner_id, current_turn_user_id, created_at, started_at, finished_at

**ships**: id, game_id, user_id, size, orientation (horizontal/vertical), start_row, start_col, status (intact/damaged/sunk)

**shots**: id, game_id, attacker_id, defender_id, row, col, result (hit/miss), created_at

## API Endpoints

| Método HTTP | URI                         | Query Params | Request Body                                                                    | Response Body                                                                                                                  | Códigos HTTP de respuesta |
| ----------- | --------------------------- | ------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| GET         | /users                      | -            | -                                                                               | `[{"id":1,"name":"Juan","email":"juan@...","created_at":"2024-01-15"}]`                                                        | 200                       |
| GET         | /users/{id}                 | -            | -                                                                               | `{"id":1,"name":"Juan","email":"juan@...","created_at":"2024-01-15"}`                                                          | 200, 404                  |
| POST        | /users                      | -            | `{"name":"Juan","email":"juan@..."}`                                            | `{"id":1,"name":"Juan","email":"juan@...","created_at":"2024-01-15"}`                                                          | 201, 400                  |
| DELETE      | /users/{id}                 | -            | -                                                                               | `{"detail":"Usuario eliminado"}`                                                                                               | 204, 404                  |
| GET         | /games                      | status       | -                                                                               | `[{"id":1,"player1_id":1,"player2_id":2,"status":"in_progress","winner_id":null}]`                                             | 200                       |
| GET         | /games/{id}                 | -            | -                                                                               | `{"id":1,"player1_id":1,"player2_id":2,"status":"in_progress","winner_id":null,"ships":[...],"shots":[...]}`                   | 200, 404                  |
| POST        | /games                      | -            | `{"player1_id":1,"player2_id":2}`                                               | `{"id":1,"player1_id":1,"player2_id":2,"status":"pending","created_at":"2024-01-15"}`                                          | 201, 400                  |
| PATCH       | /games/{id}                 | -            | `{"status":"in_progress"}`                                                      | `{"id":1,"player1_id":1,"player2_id":2,"status":"in_progress","started_at":"2024-01-15T10:30:00"}`                             | 200, 400, 404             |
| DELETE      | /games/{id}                 | -            | -                                                                               | `{"detail":"Partida eliminada"}`                                                                                               | 204, 404                  |
| POST        | /games/{id}/ships           | -            | `{"user_id":1,"size":4,"orientation":"horizontal","start_row":0,"start_col":0}` | `{"id":1,"game_id":1,"user_id":1,"size":4,"orientation":"horizontal","start_row":0,"start_col":0,"status":"intact"}`           | 201, 400, 404, 409        |
| GET         | /games/{id}/ships           | user_id      | -                                                                               | `[{"id":1,"user_id":1,"size":4,"orientation":"horizontal","start_row":0,"start_col":0,"status":"intact"}]`                     | 200, 404                  |
| DELETE      | /games/{id}/ships/{ship_id} | -            | -                                                                               | `{"detail":"Barco eliminado"}`                                                                                                 | 204, 404                  |
| POST        | /games/{id}/shots           | -            | `{"attacker_id":1,"defender_id":2,"row":5,"col":3}`                             | `{"id":1,"game_id":1,"attacker_id":1,"defender_id":2,"row":5,"col":3,"result":"hit","created_at":"2024-01-15T10:45:00"}`       | 201, 400, 404, 409        |
| GET         | /games/{id}/shots           | -            | -                                                                               | `[{"id":1,"attacker_id":1,"defender_id":2,"row":5,"col":3,"result":"hit"}]`                                                    | 200, 404                  |
| GET         | /games/{id}/status          | -            | -                                                                               | `{"game_id":1,"status":"in_progress","current_turn_user_id":1,"winner_id":null,"player1_ships_sunk":1,"player2_ships_sunk":0}` | 200, 404                  |
