# Caso de Uso: Calculadora Online

## Descripción

API REST para la realización de operaciones matemáticas básicas y avanzadas.  
Cada operación realizada se almacena en memoria como un recurso independiente, permitiendo consultar posteriormente su resultado y datos de entrada mediante un identificador.


---

## Recursos Identificados

- **/operaciones**  
  Representa las operaciones matemáticas realizadas por la calculadora.

- **/operaciones/{id}**  
  Permite consultar el detalle de una operación almacenada en memoria.

---

## Operaciones

### Crear una operación matemática

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /operaciones | - | `{ "tipo": "suma", "numeros": [2, 2, 2] }` | `{ "id": 1, "resultado": 6 }` | 201 Creado<br>400 Solicitud incorrecta |

#### Tipos de operación soportados
- `suma` → suma N elementos  
- `resta` → resta N elementos  
- `multiplicacion` → multiplica dos elementos  
- `division` → divide dos elementos  
- `raiz` → raíz N-ésima  
- `potencia` → potencia N-ésima  

---

### Consultar el detalle de una operación

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-------------------------------|----------------------|
| GET | /operaciones/{id} | - | - | `{ "id": 1, "tipo": "suma", "entrada": [2,2,2], "resultado": 6 }` | 200 Correcto<br>404 No encontrado |

---

