# API REST de Calculadora
* **Calculos :** Representa los calculos u operaciones matematicas. Cada calculo usara un tipo diferente.
	* Get : Describe los parametros necesarios para la operacion seleccionada pueden ser 
		* Suma
		* Resta
		* Multiplicacion
		* Division
		* Raiz
		* Potencia

| M&eacute;todo HTTP | URI                   | Query Params | Request Body | Response Body																		 | C&oacute;digos HTTP de respuesta            |
| :------------ | :---------------------: | :------------: | :------------: | :---------------------------------------------------------------------------------------------: |-------------------------------------: |
| GET         | /api/v1/calculos/tipo/{tipo} | -            | -            |{ "Tipo": "Suma","Elementos ": 3,"Posiciones": [{"valor": 0,"correspondencia": "sumando"},	{"valor": 1,"correspondencia": "sumando"},{"valor": 2,"correspondencia": "sumando"}],"Ejemplo" : {"Tipo":"Suma","Valores": [1,2,3]}}  	|200=> Correcto, 404=> Operacion no encontrada  |    
| GET         | /api/v1/calculos/id/{id} | -            | -            | {"Resultado" : 6, "Id":1, "Tipo":"Suma","Valores": [1,2,3]}   	|200=> Correcto, 404=> Operacion no encontrada  |    
| POST | /calculos | - | {"tipo": "SUMA", "Valores": [1,2,3]} | {"Resultado" : 6, "Id":1, "Tipo":"Suma","Valores": [1,2,3]} | 200=> Correcto, 404=> Operacion no encontrada, 500=>Numero de valores incorrectos |


