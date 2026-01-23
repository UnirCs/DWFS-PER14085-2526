# Caso de Uso: Juego Hundir la Flota

## Descripción

API REST para la gestión de partidas del juego *Hundir la flota* entre usuarios registrados o invitados.  
La API permite crear y administrar partidas, gestionar la colocación de barcos en las cuadrículas de los jugadores, registrar los disparos realizados durante la partida y consultar el estado completo de cada partida.

## Recursos Identificados

- **/usuarios**  
  Gestión de usuarios registrados o invitados.

- **/partidas**  
  Gestión de partidas del juego.

- **/partidas/{id}/barcos**  
  Gestión de barcos de un jugador en una partida.

- **/partidas/{id}/disparos**  
  Registro de disparos entre jugadores en una partida.

---

## Usuarios

### Crear un usuario

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /usuarios | - | `{ "nombre": "Jugador1", "tipo": "registrado" }` | `{ "id": 1, "nombre": "Jugador1" }` | 201 Creado<br>400 Solicitud incorrecta |

---

### Obtener datos de un usuario

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-------------------------------|----------------------|
| GET | /usuarios/{id} | - | - | `{ "id": 1, "nombre": "Jugador1", "tipo": "registrado" }` | 200 Correcto<br>404 No encontrado |

---

### Eliminar un usuario

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-----------------------|----------------------|
| DELETE | /usuarios/{id} | - | - | - | 204 Sin contenido<br>404 No encontrado |

---

## Partidas

### Crear una partida

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /partidas | - | `{ "jugador1_id": 1, "jugador2_id": 2 }` | `{ "id": 1, "estado": "creada" }` | 201 Creado<br>400 Solicitud incorrecta |

---

### Modificar datos de una partida

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| PATCH | /partidas/{id} | - | `{ "nombre": "Partida amistosa" }` | `{ "id": 1, "nombre": "Partida amistosa" }` | 200 Correcto<br>400 Solicitud incorrecta<br>404 No encontrado |

---

### Iniciar una partida


| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| PATCH | /partidas/{id} | - | `{ "estado": "en_juego" }` | `{ "id": 1, "estado": "en_juego" }` | 200 Correcto<br>404 No encontrado |

---

### Finalizar una partida

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| PATCH | /partidas/{id} | - | `{ "estado": "finalizada", "ganador_id": 1 }` | `{ "id": 1, "estado": "finalizada", "ganador_id": 1 }` | 200 Correcto<br>404 No encontrado |


### Eliminar una partida

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-----------------------|----------------------|
| DELETE | /partidas/{id} | - | - | - | 204 Sin contenido<br>404 No encontrado |

---

### Consultar todos los datos de una partida

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-------------------------------|----------------------|
| GET | /partidas/{id} | - | - | `{ "id": 1, "estado": "en_juego", "jugadores": [ { "id": 1, "nombre": "Jugador1", "barcos": [ { "id": 1, "tamano": 3, "orientacion": "horizontal", "coordenadas": ["B2","B3","B4"] } ] }, { "id": 2, "nombre": "Jugador2", "barcos": [ { "id": 2, "tamano": 2, "orientacion": "vertical", "coordenadas": ["E5","F5"] } ] } ], "disparos": [ { "jugador_id": 1, "objetivo": "C5", "resultado": "agua" }, { "jugador_id": 2, "objetivo": "B3", "resultado": "tocado" } ], "ganador_id": null }` | 200 Correcto<br>404 No encontrado |


## Barcos

### Añadir un barco a un jugador en una partida

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /partidas/{id}/barcos | - | `{ "jugador_id": 1, "tamano": 3, "orientacion": "horizontal", "coordenadas": ["A2","A3","A4"] }` | `{ "id": 1, "tamano": 3 }` | 201 Creado<br>400 Solicitud incorrecta<br>404 No encontrado |

---

### Eliminar un barco

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-----------------------|----------------------|
| DELETE | /partidas/{id}/barcos/{barco_id} | - | - | - | 204 Sin contenido<br>404 No encontrado |

---

### Consultar todos los barcos de un jugador

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-------------------------------|----------------------|
| GET | /partidas/{id}/barcos?jugador_id=1 | - | - | `{ "barcos": [] }` | 200 Correcto<br>404 No encontrado |

---

## Disparos

### Registrar un disparo

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /partidas/{id}/disparos | - | `{ "jugador_id": 1, "objetivo": "C9" }` | `{ "resultado": "agua" }` | 200 Correcto<br>400 Solicitud incorrecta<br>404 No encontrado |

---

