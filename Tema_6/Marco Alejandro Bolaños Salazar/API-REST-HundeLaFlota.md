# API REST Hunde la flota
* **Usuarios:**  Permite el manejo de usuarios.
* **Partida:** Permite manejar la partida entre 2 jugadores.
    * _Agua :_ 0
    * _Tocado :_ 1
    * _Hundido :_ 2

| M&eacute;todo HTTP | URI                   | Query Params | Request Body | Response Body																		 | C&oacute;digos HTTP de respuesta            |
| :------------ | :---------------------: | :------------: | :------------: | :---------------------------------------------------------------------------------------------: |-------------------------------------: |
| POST | /api/v1/partidas/cargar | - |  { "Barcos": [{"Inicio": "A1","Fin": "A3"},{"Inicio": "C5","Fin": "C9"}]} | - | 200=>correcto, 500=> Barco ya existe en esa posicion, 501=> No existe esa posicion, 502=>numero de barcos incorrectos, 503=> debe haber una separacion entre los barcos |
| POST | /api/v1/partidas/disparo | - | {"Disparo":"A2"} | {"Estado":2, "NuevoDisparo":true, "Ganador":false} | 200=>correcto, 501=> No existe la posicion |
| GET | /api/v1/partidas/tablero/{idJugador} | - | - |  {"Barcos": [{"Inicio": "A1","Fin": "A3"},{"Inicio": "C5","Fin": "C9"}],"Disparos": [{"Casilla": "A1","Estado": 2},{"Casilla": "A7","Estado": 0}]} | 200=> correcto, 404=> No Encontrado |
