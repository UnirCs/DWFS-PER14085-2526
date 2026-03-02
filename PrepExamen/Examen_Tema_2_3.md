# Preguntas de Examen - JavaScript: Hoisting, Callbacks y Event Loop

## Pregunta 1: Hoisting

**Observa el siguiente código. ¿Cuál será la salida por consola?**

```javascript
console.log(nombre);
console.log(saludar());
console.log(despedirse());

var nombre = "Ana";

function saludar() {
    return "Hola!";
}

var despedirse = function() {
    return "Adiós!";
};
```

**Opciones:**

- a) `Ana`, `Hola!`, `Adiós!`
- b) `ReferenceError`, `ReferenceError`, `ReferenceError`
- c) `undefined`, `Hola!`, `TypeError`
- d) `undefined`, `TypeError`, `undefined`

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: c) `undefined`, `Hola!`, `TypeError`**

**Explicación:**
El **hoisting** es el mecanismo por el cual JavaScript mueve las declaraciones al inicio de su ámbito antes de ejecutar el código. Sin embargo, el comportamiento varía según cómo se declare cada identificador:

| Tipo de declaración | ¿Se eleva la declaración? | ¿Se eleva la inicialización? |
|---------------------|--------------------------|------------------------------|
| `var`               | ✅ Sí                    | ❌ No (vale `undefined`)     |
| `function` (declaración) | ✅ Sí              | ✅ Sí (función completa)     |
| `let` / `const`     | ✅ Sí (TDZ)              | ❌ No (lanza `ReferenceError`)|

Lo que JavaScript "ve" internamente antes de ejecutar el código del ejemplo es:

```javascript
var nombre;               // hoisted → undefined
var despedirse;           // hoisted → undefined
function saludar() { return "Hola!"; }  // hoisted completa

console.log(nombre);      // → undefined
console.log(saludar());   // → "Hola!" (función completa disponible)
console.log(despedirse()); // → TypeError: despedirse is not a function
                           //   (aún vale undefined, no se ha asignado la función)

nombre = "Ana";
despedirse = function() { return "Adiós!"; };
```

- `console.log(nombre)` → **`undefined`**: la variable existe (fue elevada) pero todavía no se le ha asignado el valor `"Ana"`.
- `console.log(saludar())` → **`"Hola!"`**: las declaraciones de función se elevan completas, incluyendo su cuerpo.
- `console.log(despedirse())` → **`TypeError`**: `despedirse` fue elevada como `var` (vale `undefined`), y llamar a `undefined()` lanza un `TypeError`, no un `ReferenceError`.

> 💡 **Consejo:** Usar `const` y `let` en lugar de `var` y preferir funciones declaradas evita comportamientos inesperados por hoisting.

</details>

---

## Pregunta 2: Ejecución con Callbacks

**Dado el siguiente código, ¿cuál será el contenido del array `resultado` al finalizar la ejecución?**

```javascript
function transformar(valor, doblar, incrementar, esPar) {
    if (esPar(valor)) {
        return doblar(valor);
    } else {
        return incrementar(valor);
    }
}

const lista = [7, 4, 3, 10];
const resultado = [];

lista.forEach(n => {
    resultado.push(
        transformar(
            n,
            x => x * 2,
            x => x + 10,
            x => x % 2 === 0
        )
    );
});

console.log(resultado);
```

**Opciones:**

- a) `[14, 8, 6, 20]`
- b) `[17, 8, 13, 20]`
- c) `[7, 4, 3, 10]`
- d) `[14, 14, 13, 20]`

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) `[17, 8, 13, 20]`**

**Explicación:**
La función `transformar` recibe un valor y tres callbacks:
- `doblar`: multiplica el valor por 2.
- `incrementar`: suma 10 al valor.
- `esPar`: devuelve `true` si el número es par.

La lógica aplica `doblar` si el número es par, o `incrementar` si es impar. Veamos cada iteración del `forEach`:

| `n` | `espar(n)` | Callback ejecutado | Operación | Resultado |
|-----|------------|--------------------|-----------|-----------|
| `7` | `false` (impar) | `incrementar` | `7 + 10` | **17** |
| `4` | `true` (par) | `doblar` | `4 * 2` | **8** |
| `3` | `false` (impar) | `incrementar` | `3 + 10` | **13** |
| `10` | `true` (par) | `doblar` | `10 * 2` | **20** |

Por tanto, `resultado = [17, 8, 13, 20]`.

Este patrón es un ejemplo de **callbacks como estrategias intercambiables** (Strategy Pattern): la función `transformar` no sabe qué operaciones se realizarán, simplemente delega la lógica en los callbacks que recibe.

</details>

---

## Pregunta 3: Event Loop

**¿Cuál es el orden exacto de impresión en consola al ejecutar el siguiente código?**

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("3");
    })
    .then(() => {
        console.log("4");
    });

setTimeout(() => {
    console.log("5");
}, 0);

console.log("6");
```

**Opciones:**

- a) `1, 2, 3, 4, 5, 6`
- b) `1, 6, 2, 5, 3, 4`
- c) `1, 6, 3, 4, 2, 5`
- d) `1, 6, 3, 2, 4, 5`

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: c) `1, 6, 3, 4, 2, 5`**

**Explicación:**
El Event Loop de JavaScript gestiona dos tipos de colas de tareas asíncronas con distinta prioridad:

| Cola | Tipo | Ejemplos | Prioridad |
|------|------|----------|-----------|
| **Microtask Queue** | Microtareas | `Promise.then`, `queueMicrotask` | 🔴 Alta — se vacía **completamente** antes de la siguiente macrotarea |
| **Macrotask Queue** (Task Queue) | Macrotareas | `setTimeout`, `setInterval`, eventos | 🟡 Baja — se procesa **de una en una** |

El flujo de ejecución es el siguiente:

```
1. Call Stack (código síncrono)
2. Al vaciarse el Stack → procesar TODAS las microtareas pendientes
3. Tomar UNA macrotarea → ejecutarla → volver al paso 2
```

Aplicado al código del enunciado:

**Fase 1 — Código síncrono (Call Stack):**
- `console.log("1")` → imprime **1**
- `setTimeout(..., 0)` → encola callback "2" en Macrotask Queue
- `Promise.resolve().then(...)` → encola callback "3" en Microtask Queue
- `setTimeout(..., 0)` → encola callback "5" en Macrotask Queue
- `console.log("6")` → imprime **6**

**Fase 2 — Call Stack vacío → vaciar Microtask Queue:**
- Se ejecuta `.then(() => console.log("3"))` → imprime **3** → encola `.then(() => console.log("4"))` en Microtask Queue
- Se ejecuta `.then(() => console.log("4"))` → imprime **4**
- Microtask Queue vacía.

**Fase 3 — Procesar macrotareas (una por una):**
- Se ejecuta callback "2" del primer `setTimeout` → imprime **2** → volver a fase 2 (sin microtareas)
- Se ejecuta callback "5" del segundo `setTimeout` → imprime **5**

**Resultado final:** `1 → 6 → 3 → 4 → 2 → 5`

> 💡 **Clave:** Las **promesas** (microtareas) siempre se ejecutan **antes** que los callbacks de `setTimeout` (macrotareas), aunque el `setTimeout` tenga un delay de `0ms`.

</details>
