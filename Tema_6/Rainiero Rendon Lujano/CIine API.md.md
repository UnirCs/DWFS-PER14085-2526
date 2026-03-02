|Metodo| Endpoint| Query Proms| Solcitud Json | Respuesta Json|Codigos de Https| 
|----------|-----------|-----------------|----------------|-------------------|-
|POST|`/peliculas`|-|`{ "titulo": "El resplandor", "duracion":"120m", "genero": "Accion","disponible": "si"}`|`{ "id_movie": movie-15, "titulo": "El resplandor", "duracion":"120m", "genero": "Accion", "disponible": True, "message": "Creado Exitosamente"}`|**201 ok**,**500 internal error server, 400 bad request**
|PUT|`/peliculas/{peliculasid}`|-|`{ "titulo": "El resplandor ", "duracion":"120m", "genero": "Accion", "disponible": "no"}`|`{"id_movie": "movie-15", "titulo": "El resplandor", "duracion":"120m", "genero": "Accion", "disponible": False, "message":"Editado Exitosamente"}`|**200ok**, **404 not found**, **400  bad request**, **500 internal server error**|
DELETE|`/peliculas/{peliculasid}`|-|-|`{"message":"pelicula eliminada exitosamente"}`|**200 ok**, **404 nor found**, **500 internal server error**|
|POST|`/salas`|-|`{"nombre": "N15","disponible": "si", "capacidad":120}`|`{ "id_sala": "sala-16", "nombre": "N15","disponible": "True","capacidad":120,"message": "Creado Exitosamente"}`|**201 ok**,**500 internal error server, 400 bad request**
PATCH|`/salas/{salasid}`|-|`{"disponible": "no"}`|{"id_sala": "sala-16", "nombre": "N15","capacidad":120,"disponible": False, "message": "Editado Exitosamente"}`|**200ok**, **404 not found**, **400  bad request**, **500 internal server error**|
|DELETE|`/salas/{salasid}`|-|-|`{"message":"pelicula eliminada exitosamente"}`|**200 ok**, **404 nor found**, **500 internal server error**|
POST|`usario/`|-|`{"Nombre": "Rainiero", "Apellido": "Rendon","edad" : 28, "afiliado": "si"}`|`{"id_user": "user-54","Nombre":  "Rainiero", "Apellido": "Rendon","edad" : 28, "afiliado": true, "message" : "creado exitosamente"}`|**201ok**,  **400  bad request**, **500 internal server error**||
PATCH|`usuario/{id}`|-|`{"afiliado": "no" }`|`{"id_user": "user-54","Nombre":  "Rainiero", "Apellido": "Rendon","edad" : 28, "afiliado": false, "message" : "Editado exitosamente"}`|**200ok**, **404 not found**, **400  bad request**, **500 internal server error**|
DELETE|`usuario/{usuarioid}`|-|-|`{"message":"user eliminado exitosamente"}`|**200 ok**, **404 nor found**, **500 internal server error**|
POST|`reservaciones/`|-|`{"id_user": "user-54", "id_sala": "sala-16", "id_movie":"movie-15", "id_seat": "seat-15""}`|`{"id_reservation": "reservacion-2", "id_user": user-54,"id_sala": "sala-16", "id_movie":movie-15, "id_seat":seat-15","message": "Creado Exitosamente"}`|**201 ok**,**500 internal error server, 400 bad request**|
FETCH|`reservaciones/{reservacionesid}`|-|`{"id_user": "user-68"}`|`{"id_reservation": "reservacion-2", "id_user": user-68, "id_movie":movie-15, "id_seat":seat-15","message": "editado Exitosamente"}`|**200 ok**,**500 internal error server, 400 bad request**|
DELETE|`reservaciones/{id}`|-|-|`{"message": "eliminada Exitosamente"}`|**200ok**, **404 not found**, **500 internal server error**|
POST|`/reservaciones/{reservacionesid}/pagos`|-|`{"id_reservation": "reservacion-2", "detalle_compra":"1-entrada-El-resplandor", "precio":"$12" "metodo-pagos": "tarjeta_bancaria"}`|`{"id": "reservacion-2", "message": "Compra Exitosa", "comprobante": "ER_2025_1_11_DD"}`|**200ok**, **404 not found**, **400  bad request**, **500 internal server error**|






