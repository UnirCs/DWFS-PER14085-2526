| metodo http | endpoint | query param | Solcitud Peticion Json| Respuesta Json| Codigos HTTP| 
|----------------|-------------|-----------------|---------------------------|------------------|-------------------|
|**Post**| `/operaciones` |-|`{ "tipo_operacion_select": "suma","N_numeros": [9,5]`} tipo_operacion_selector : se escoge suma, resta, división, multiplicación, raíz, potencia,  |{`"id": 1, "type":"suma","N_numeros":[9,5],"resultado": 14`}|**201 ok**, **400 bad request**,  **500 internal server error** | 
|**Get**|`operaciones/{operacionesid}`|-|-|`{"id": 1, "type":"suma","N_numeros":[9,5],"resultado": 14}`|**200 ok**,**400 not found**,**404**,**500 internal error server** 
 
