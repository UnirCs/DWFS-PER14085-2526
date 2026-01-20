# API REST Cinema
* **Peliculas:** Permite realizar las operaciones de crear, modificar y eliminar las peliculas
* **Salas:** Permite realizar las operaciones crear, modificar y eliminar las salas
* **Usuarios:** Permite realizar las operaciones crear, modificar y eliminar los usuarios
* **Reservas:** Permnite generar las reservas, cancelar reserva, modificar una reserva de un usuario en la sala
* **Pagos:** Permite pagar una reserva. Se tendra las siguientes formas de pago
    * *Efectivo = 1*
    * *Tarjeta Debito/Credito = 2*
    * *Transferencia = 3*
    * *PuntosCineClub = 4*

| M&eacute;todo HTTP | URI                   | Query Params | Request Body | Response Body																		 | C&oacute;digos HTTP de respuesta            |
| :------------ | :---------------------: | :------------: | :------------: | :---------------------------------------------------------------------------------------------: |-------------------------------------: |
| POST | /api/v1/peliculas | - |  {"titulo" : "pelicula 1","Reseña": "reseña pelicula 1","Elenco" :"Elenco de la pelicula","Puntuacion": 9, "Estado":true} | {"idPelicula":1}| 200=> correcto, 500 => error inteno|
| PATCH | /api/v1/peliculas | - |  { "idpelicula":1, "titulo" : "pelicula 1","Reseña": "reseña pelicula 1","Elenco" :"Elenco de la pelicula","Puntuacion": 9, "Estado":true} | {"idPelicula":1}| 200=> correcto, 500 => error inteno, 404=> no encontrado|
| DELETE | /api/v1/peliculas/Id/{id} | - | - | - | 200=> correcto, 500 => error inteno, 404=> no encontrado|
| POST | /api/v1/salas | - | {"NumeroAsientos":30, "Horarios":["13:00", "17:00", "Estado":true]} | {"IdSala":1} |  200=> correcto, 500 => error inteno|
| PATCH | /api/v1/salas | - | { "IdSala":1, "Horarios":["16:00", "19:00", "Estado":true]} | {"IdSala":1} |  200=> correcto, 500 => error inteno, 404=> no encontrado|
| DELETE | /api/v1/salas/id/{id} | - | - | - |  200=> correcto, 500 => error inteno, 404=> no encontrado|
| POST | /api/v1/usuarios | - | { "Identificacion":"123456789" "NombreUsuario":"Juancho","nombre":"Juan Perez", "FechaNacimiento":"1991-01-15", "Email":"prueba@email.com", "Telefono":"0999999999", "EStado": true} | {"idUsuario":1} | 200=> correcto, 500 => error inteno|
| PATCH | /api/v1/usuarios | - | { "IdUsuario":1, "Identificacion":"123456789" "NombreUsuario":"Juancho","FechaNacimiento":"1991-01-15", "Email":"prueba@email.com", "Telefono":"0999999999", "EStado": true} | {"idUsuario":1} | 200=> correcto, 500 => error inteno, 404=> no encontrado|
| DELETE | /api/v1/usuarios/id/{id} | - | - | - | 200=> correcto, 500 => error inteno, 404=> no encontrado|
| POST | /api/v1/reserva | - | {"IdUSuario": 1, "IdSala":1, "Horario":"15:00", "IdPelicula":1, "Estado": true } | {"idReserva":1} | 200=> correcto, 500 => error inteno |
| PATCH | /api/v1/reserva | - | { "IdReserva":1,  "IdUSuario": 1, "IdSala":1, "Horario":"19:00", "IdPelicula":1, "Estado": true } | {"idReserva":1} | 200=> correcto, 500 => error inteno, 404=> no encontrado |
| POST | /api/v1/pagos | - | {"IdReserva": 1, "ValorTotal":20.00, "FormaPago": 1,"Estado": true } | {"idReserva":1} | 200=> correcto, 500 => error inteno |