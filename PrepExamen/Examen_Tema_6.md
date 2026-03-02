# Preguntas de Examen - APIs REST

## Pregunta 1: Diseño de endpoints REST

**Indica cuáles de los siguientes endpoints son correctos desde un punto de vista RESTful (Sí/No) y justifica tu respuesta:**

| # | Verbo HTTP | Endpoint |
|---|-----------|----------|
| 1 | `GET` | `/api/users/search?name=Ana` |
| 2 | `GET` | `/api/getUsers` |
| 3 | `DELETE` | `/api/users/42` |

**Opciones:**

- a) 1 → Sí, 2 → No, 3 → Sí
- b) 1 → No, 2 → No, 3 → Sí
- c) 1 → No, 2 → Sí, 3 → Sí
- d) 1 → No, 2 → No, 3 → No

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) 1 → No, 2 → No, 3 → Sí**

**Análisis de cada endpoint:**

**Endpoint 1 — `GET /api/users/search?name=Ana` → ❌ No**
- El segmento `/search` es un **verbo disfrazado de sustantivo** en el path. En REST la acción de buscar ya está implícita en el verbo HTTP `GET`; añadir `/search` es redundante e introduce lógica de acción en la URL.
- Además, hardcodear `/search` como segmento fuerza a crear rutas distintas si en el futuro se quiere filtrar de otra forma.
- La forma correcta es usar directamente el recurso con un **query param**: `GET /api/users?name=Ana`. ✅

**Endpoint 2 — `GET /api/getUsers` → ❌ No**
- Incluye un **verbo en el path** (`getUsers`). En REST, la semántica de la acción la aporta el **verbo HTTP** (`GET`, `POST`, `PUT`…), no la URL.
- El path debería ser simplemente `/api/users`.

**Endpoint 3 — `DELETE /api/users/42` → ✅ Sí**
- Usa el sustantivo en plural `/users`. ✅
- Usa un **path param** (`/42`) para identificar de forma unívoca el recurso concreto que se quiere eliminar. ✅
- La semántica de la acción (eliminar) la aporta el verbo HTTP `DELETE`, no el path. ✅

**Resumen de reglas aplicadas:**

| Regla REST | Endpoint 1 | Endpoint 2 | Endpoint 3 |
|------------|-----------|-----------|-----------|
| Sustantivos en plural | ✅ | ✅ | ✅ |
| Sin verbos en el path | ❌ `search` | ❌ `getUsers` | ✅ |
| Path param para identificar recurso | — | — | ✅ `/42` |
| Query param para filtrar por atributo | ✅ `?name=` (bien usado) | — | — |
| Semántica en el verbo HTTP | ❌ redundante con `search` | ❌ redundante | ✅ `DELETE` |

</details>

---

## Pregunta 2: Diseño de endpoints REST

**Indica cuáles de los siguientes endpoints son correctos desde un punto de vista RESTful (Sí/No) y justifica tu respuesta:**

| # | Verbo HTTP | Endpoint |
|---|-----------|----------|
| 1 | `GET` | `/api/orders/99/products` |
| 2 | `GET` | `/api/products/active` |
| 3 | `POST` | `/api/users/create` |

**Opciones:**

- a) 1 → Sí, 2 → Sí, 3 → Sí
- b) 1 → No, 2 → Sí, 3 → No
- c) 1 → Sí, 2 → No, 3 → No
- d) 1 → Sí, 2 → Sí, 3 → No

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: c) 1 → Sí, 2 → No, 3 → No**

**Análisis de cada endpoint:**

**Endpoint 1 — `GET /api/orders/99/products` → ✅ Sí**
- Usa sustantivos en plural para ambos recursos: `/orders` y `/products`. ✅
- Usa un **path param** (`/99`) para identificar el pedido concreto. ✅
- La **anidación tiene sentido semántico**: "los productos que pertenecen al pedido 99" es una relación de pertenencia real entre recursos. ✅
- El verbo `GET` expresa la intención (obtener), no el path. ✅

**Endpoint 2 — `GET /api/products/active` → ❌ No**
- `active` es un **atributo del recurso** (estado del producto), no un identificador de recurso ni un subrecurso.
- Usar un atributo hardcodeado en el path es un anti-patrón REST: si mañana existiera el estado `"inactive"` o `"pending"`, habría que añadir nuevos segmentos en la URL.
- La forma correcta es usar un **query param** para filtrar por atributo: `GET /api/products?status=active`. ✅

**Endpoint 3 — `POST /api/users/create` → ❌ No**
- Incluye un **verbo en el path** (`create`). La acción de crear ya está expresada por el verbo HTTP `POST`.
- El path correcto es simplemente `POST /api/users`: enviar un `POST` a la colección `/users` es la convención REST para crear un nuevo recurso en ella.

**Resumen de reglas aplicadas:**

| Regla REST | Endpoint 1 | Endpoint 2 | Endpoint 3 |
|------------|-----------|-----------|-----------|
| Sustantivos en plural | ✅ | ✅ | ✅ |
| Sin verbos en el path | ✅ | ✅ | ❌ `create` |
| Sin atributos hardcodeados en el path | ✅ | ❌ `active` | ✅ |
| Path param para identificar recurso | ✅ `/99` | — | — |
| Anidación con sentido semántico | ✅ | — | — |
| Semántica en el verbo HTTP | ✅ `GET` | ✅ `GET` | ❌ redundante con `create` |

</details>

---

## Pregunta 3: Diseño de endpoints REST

**Indica cuáles de los siguientes endpoints son correctos desde un punto de vista RESTful (Sí/No) y justifica tu respuesta:**

| # | Verbo HTTP | Endpoint |
|---|-----------|----------|
| 1 | `PUT` | `/api/users/7/updateEmail` |
| 2 | `GET` | `/api/courses/5/students?enrolled=true` |
| 3 | `GET` | `/api/category/books` |

**Opciones:**

- a) 1 → Sí, 2 → No, 3 → Sí
- b) 1 → No, 2 → No, 3 → No
- c) 1 → No, 2 → Sí, 3 → No
- d) 1 → Sí, 2 → Sí, 3 → No

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: c) 1 → No, 2 → Sí, 3 → No**

**Análisis de cada endpoint:**

**Endpoint 1 — `PUT /api/users/7/updateEmail` → ❌ No**
- Incluye un **verbo en el path** (`updateEmail`). La acción de actualizar ya la expresa el verbo HTTP `PUT` (o `PATCH` si la actualización es parcial).
- Además, **hardcodea un atributo concreto** del recurso (`email`) en la URL: si en el futuro se quiere actualizar el teléfono o el nombre, habría que crear nuevos endpoints (`/updatePhone`, `/updateName`…), lo que rompe la escalabilidad del diseño.
- La forma correcta es `PUT /api/users/7` (o `PATCH /api/users/7`) enviando en el cuerpo de la petición solo los campos a actualizar.

**Endpoint 2 — `GET /api/courses/5/students?enrolled=true` → ✅ Sí**
- Usa sustantivos en plural: `/courses` y `/students`. ✅
- Usa un **path param** (`/5`) para identificar el curso concreto. ✅
- La **anidación tiene sentido**: "los estudiantes del curso 5" es una relación legítima entre recursos. ✅
- Usa un **query param** (`?enrolled=true`) para filtrar por un atributo del subrecurso. ✅
- El verbo `GET` expresa la intención sin necesidad de verbo en el path. ✅

**Endpoint 3 — `GET /api/category/books` → ❌ No**
- Usa el sustantivo en **singular** (`category`) en lugar del plural (`categories`). En REST la convención es usar siempre el plural para nombrar colecciones.
- Además, `books` es un **valor concreto del atributo categoría**, no un subrecurso ni un identificador de recurso. Se está hardcodeando en el path.
- La forma correcta sería `GET /api/products?category=books` (filtrar por atributo con query param) o, si "categoría" es un recurso de primera clase, `GET /api/categories/books/products`.

**Resumen de reglas aplicadas:**

| Regla REST | Endpoint 1 | Endpoint 2 | Endpoint 3 |
|------------|-----------|-----------|-----------|
| Sustantivos en plural | ✅ | ✅ | ❌ `category` |
| Sin verbos en el path | ❌ `updateEmail` | ✅ | ✅ |
| Sin atributos hardcodeados en el path | ❌ `email` implícito | ✅ | ❌ `books` |
| Path param para identificar recurso | ✅ `/7` | ✅ `/5` | — |
| Query param para filtrar por atributo | — | ✅ `?enrolled=` | — |
| Anidación con sentido semántico | ❌ | ✅ | — |
| Semántica en el verbo HTTP | ❌ redundante | ✅ `GET` | ✅ `GET` |

</details>

---

## Pregunta 4: PUT vs PATCH

**Un cliente tiene en base de datos el siguiente recurso:**

```json
{
    "id": 12,
    "nombre": "Carlos",
    "email": "carlos@email.com",
    "rol": "usuario",
    "activo": true
}
```

**Se quiere actualizar únicamente el campo `email` a `"carlos.nuevo@email.com"`, manteniendo el resto de campos intactos. ¿Qué verbo HTTP y qué cuerpo de petición son los correctos para esta operación?**

**Opciones:**

- a) `PUT /api/users/12` con body `{ "email": "carlos.nuevo@email.com" }`
- b) `PATCH /api/users/12` con body `{ "email": "carlos.nuevo@email.com" }`
- c) `PUT /api/users/12` con body `{ "id": 12, "nombre": "Carlos", "email": "carlos.nuevo@email.com", "rol": "usuario", "activo": true }`
- d) Las opciones b) y c) son igualmente correctas para esta operación

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) `PATCH /api/users/12` con body `{ "email": "carlos.nuevo@email.com" }`**

**Explicación:**
`PUT` y `PATCH` son los dos verbos HTTP destinados a actualizar recursos, pero tienen semánticas bien diferenciadas:

| Verbo | Semántica | Body esperado | Comportamiento sobre campos no enviados |
|-------|-----------|---------------|----------------------------------------|
| `PUT` | **Reemplaza** el recurso completo | Representación **completa** del recurso | Se eliminan o se resetean a su valor por defecto |
| `PATCH` | **Modifica parcialmente** el recurso | Solo los **campos a modificar** | Se mantienen sin cambios |

Aplicado al caso del enunciado:

- **`PATCH /api/users/12`** con `{ "email": "carlos.nuevo@email.com" }` → ✅ Correcto. Solo se envía el campo que cambia; el servidor actualiza únicamente `email` y deja `nombre`, `rol` y `activo` intactos.

- **`PUT /api/users/12`** con `{ "email": "carlos.nuevo@email.com" }` → ❌ Incorrecto. Un `PUT` con un body parcial indica al servidor que el recurso completo es eso: `{ "email": "carlos.nuevo@email.com" }`. El resultado sería que `nombre`, `rol` y `activo` se perderían o quedarían en `null`/valor por defecto.

- **`PUT /api/users/12`** con el recurso completo (opción c) → ❌ También incorrecto para **esta operación concreta**. Aunque el body sea correcto para un `PUT` (representación completa), usar `PUT` para modificar un solo campo es semánticamente impropio y obliga al cliente a conocer y reenviar todos los campos del recurso, lo que es ineficiente y propenso a errores de concurrencia.

- **Opción d)** → ❌ `PATCH` y `PUT` no son intercambiables; tienen contratos distintos con el servidor.

> 💡 **Regla práctica:**
> - ¿Quieres **reemplazar** el recurso entero? → `PUT` con body completo.
> - ¿Quieres **modificar uno o varios campos** sin tocar el resto? → `PATCH` con solo los campos a cambiar.

</details>
