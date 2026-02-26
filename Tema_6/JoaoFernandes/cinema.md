# Caso de Uso: Sistema de Reserva de Butacas de Cine

## Descripción

API REST para la gestión de un sistema de cine que permite administrar películas, salas y usuarios, así como realizar reservas de butacas y registrar pagos asociados a dichas reservas.

El sistema permite crear, modificar y eliminar los recursos principales y gestionar el ciclo completo de una reserva.

---

## Recursos Identificados

- **/peliculas**  
  Gestión de películas del cine.

- **/salas**  
  Gestión de salas del cine.

- **/usuarios**  
  Gestión de usuarios del sistema.

- **/reservas**  
  Gestión de reservas de butacas para usuarios en salas.

- **/pagos**  
  Registro de pagos asociados a reservas.


## Endpoints de la API

## Películas (peliculas)

### Crear una película

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /peliculas | - | `{ "titulo": "El Señor de los Anillos: La Comunidad del Anillo", "duracion_min": 178, "clasificacion": "TP" }` | `{ "id": 1, "titulo": "El Señor de los Anillos: La Comunidad del Anillo", "fecha_creacion": "2024-03-01T10:00:00Z" }` | 201 Creado<br>400 Solicitud incorrecta |

---

### Modificar una película

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| PUT | /peliculas/{id} | - | `{ "titulo": "El Señor de los Anillos: Las Dos Torres" }` | `{ "id": 1, "titulo": "El Señor de los Anillos: Las Dos Torres" }` | 200 Correcto<br>400 Solicitud incorrecta<br>404 No encontrado |

---

### Eliminar una película

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-----------------------|----------------------|
| DELETE | /peliculas/{id} | - | - | - | 204 Sin contenido<br>404 No encontrado |

---

## Salas (salas)

### Crear una sala

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /salas | - | `{ "nombre": "Sala Principal", "capacidad": 150, "tipo_pantalla": "3D" }` | `{ "id": 1, "nombre": "Sala Principal" }` | 201 Creado<br>400 Solicitud incorrecta |

---

### Modificar parcialmente una sala

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| PATCH | /salas/{id} | - | `{ "capacidad": 160 }` | `{ "id": 1, "capacidad": 160 }` | 200 Correcto<br>400 Solicitud incorrecta<br>404 No encontrado |

---

### Eliminar una sala

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-----------------------|----------------------|
| DELETE | /salas/{id} | - | - | - | 204 Sin contenido<br>404 No encontrado |

---

## Usuarios (usuarios)

### Crear un usuario

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /usuarios | - | `{ "nombre": "Carlos Pérez", "correo": "carlos@mail.com" }` | `{ "id": 1, "nombre": "Carlos Pérez" }` | 201 Creado<br>400 Solicitud incorrecta |

---

### Modificar parcialmente un usuario

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| PATCH | /usuarios/{id} | - | `{ "correo": "carlos.nuevo@mail.com" }` | `{ "id": 1, "correo": "carlos.nuevo@mail.com" }` | 200 Correcto<br>400 Solicitud incorrecta<br>404 No encontrado |

---

### Eliminar un usuario

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-----------------------|----------------------|
| DELETE | /usuarios/{id} | - | - | - | 204 Sin contenido<br>404 No encontrado |

---

## Reservas (reservas)

### Crear una reserva

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /reservas | - | `{ "usuario_id": 1, "sala_id": 1, "butaca": "C8" }` | `{ "id": 1, "estado": "reservada" }` | 201 Creado<br>400 Solicitud incorrecta<br>404 No encontrado |

---

### Modificar una reserva

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| PATCH | /reservas/{id} | - | `{ "butaca": "C9" }` | `{ "id": 1, "butaca": "C9", "estado": "reservada" }` | 200 Correcto<br>400 Solicitud incorrecta<br>404 No encontrado |

---

### Cancelar una reserva

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-----------------------|----------------------|
| DELETE | /reservas/{id} | - | - | - | 204 Sin contenido<br>404 No encontrado |

---

## Pagos (pagos)

### Registrar un pago

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /pagos | - | `{ "reserva_id": 1, "importe": 7.50, "metodo_pago": "tarjeta" }` | `{ "id": 1, "estado": "pagado" }` | 201 Creado<br>400 Solicitud incorrecta<br>404 No encontrado |
