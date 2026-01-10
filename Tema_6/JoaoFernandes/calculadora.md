# Caso de Uso: API Calculadora Online

## Descripción

API REST que permite realizar operaciones matemáticas básicas y avanzadas.  
La calculadora dispone de memoria, por lo que cada operación realizada se almacena y puede consultarse posteriormente mediante un ID de operación.

---

## Recursos Identificados

- **/suma**  
  Permite sumar N números.

- **/resta**  
  Permite restar N números.

- **/multiplicacion**  
  Permite multiplicar dos números.

- **/division**  
  Permite dividir dos números.

- **/raiz**  
  Permite calcular la raíz N-ésima de un número.

- **/potencia**  
  Permite calcular la potencia N-ésima de un número.

- **/operaciones/{id}**  
  Permite consultar el detalle de una operación almacenada en memoria.

---

## Endpoints de la API

### Sumar N elementos

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /suma | - | `{ "numeros": [2, 2, 2] }` | `{ "id": 1, "resultado": 6 }` | 200 Correcto<br>400 Solicitud incorrecta |

---


### Restar N elementos

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /resta | - | `{ "numeros": [10, 2, 3] }` | `{ "id": 2, "resultado": 5 }` | 200 Correcto<br>400 Solicitud incorrecta |

---

### Multiplicar 2 elementos

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /multiplicacion | - | `{ "a": 2, "b": 4 }` | `{ "id": 3, "resultado": 8 }` | 200 Correcto<br>400 Solicitud incorrecta |

---


### Dividir 2 elementos

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /division | - | `{ "a": 10, "b": 2 }` | `{ "id": 4, "resultado": 5 }` | 200 Correcto<br>400 Solicitud incorrecta |

---

### Raíz N-ésima de un número

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /raiz | - | `{ "radicando": 8, "indice": 3 }` | `{ "id": 5, "resultado": 2 }` | 200 Correcto<br>400 Solicitud incorrecta |

---
### Potencia N-ésima de un número

| Método HTTP | URI | Query Params | Cuerpo de la Petición (JSON) | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|------------------------------|-------------------------------|----------------------|
| POST | /potencia | - | `{ "base": 3, "exponente": 3 }` | `{ "id": 6, "resultado": 27 }` | 200 Correcto<br>400 Solicitud incorrecta |

---

### Consultar detalle de una operación

| Método HTTP | URI | Query Params | Cuerpo de la Petición | Cuerpo de la Respuesta (JSON) | Códigos de Respuesta |
|------------|-----|--------------|-----------------------|-------------------------------|----------------------|
| GET | /operaciones/{id} | - | - | `{ "id": 3, "tipo": "multiplicacion", "entrada": [2, 4], "resultado": 8 }` | 200 Correcto<br>404 No encontrado |

---
