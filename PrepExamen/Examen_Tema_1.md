# Preguntas de Examen - CSS: Sintaxis y Selectores

## Pregunta 1: Sintaxis básica de reglas CSS

**¿Cuál de las siguientes declaraciones CSS es sintácticamente correcta?**

**Opción a)**
```css
p { color = red; }
```

**Opción b)**
```css
p { color: red }
```

**Opción c)**
```css
p color: red;
```

**Opción d)**
```css
p { color: red: }
```

**Opciones:**

- a) La opción a) es correcta
- b) La opción b) es correcta
- c) La opción c) es correcta
- d) La opción d) es correcta

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) `p { color: red }`**

**Explicación:**
Una regla CSS válida se compone de tres partes:
1. **Selector**: indica a qué elementos se aplica el estilo (en este caso `p`).
2. **Bloque de declaraciones**: delimitado por llaves `{ }`.
3. **Declaraciones**: pares `propiedad: valor;` separados por punto y coma `;`.

Analizando cada opción:
- **a)** `p { color = red; }` → ❌ Incorrecto. Se usa `=` para asignar el valor, pero en CSS el separador entre propiedad y valor es `:`, no `=`.
- **b)** `p { color: red }` → ✅ Correcto. Usa el separador `:` y las llaves `{ }`. El punto y coma final es **opcional** en la última (o única) declaración de un bloque, aunque es buena práctica incluirlo.
- **c)** `p color: red;` → ❌ Incorrecto. Faltan las llaves `{ }` que delimitan el bloque de declaraciones.
- **d)** `p { color: red: }` → ❌ Incorrecto. Se usan dos puntos `:` en lugar de un punto y coma `;` al final de la declaración.

La estructura correcta de una regla CSS es:
```css
selector {
    propiedad: valor;
}
```

</details>

---

## Pregunta 2: Selectores combinados — ¿qué elementos seleccionan?

**Dado el siguiente fragmento HTML:**

```html
<div>
    <p>Párrafo A</p>
    <section>
        <p>Párrafo B</p>
    </section>
</div>
<p>Párrafo C</p>
```

**¿Qué selector CSS selecciona ÚNICAMENTE el "Párrafo A"?**

**Opciones:**

- a) `div p`
- b) `div > p`
- c) `div + p`
- d) `div ~ p`

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) `div > p`**

**Explicación:**
Los selectores combinados en CSS definen relaciones entre elementos del DOM. Los cuatro tipos principales son:

| Selector | Nombre | Selecciona |
|----------|--------|------------|
| `A B` | Descendiente | Todos los `B` dentro de `A`, a cualquier nivel de profundidad |
| `A > B` | Hijo directo | Solo los `B` que son **hijos inmediatos** de `A` |
| `A + B` | Hermano adyacente | El primer `B` que es **hermano inmediatamente posterior** de `A` |
| `A ~ B` | Hermanos generales | **Todos** los `B` que son hermanos posteriores de `A` |

Aplicado al HTML del enunciado:
- **a)** `div p` → Selecciona "Párrafo A" **y** "Párrafo B", ya que ambos son descendientes del `<div>` (a distintos niveles). ❌
- **b)** `div > p` → Selecciona **solo** "Párrafo A", porque es el único `<p>` que es **hijo directo** del `<div>`. "Párrafo B" está dentro de un `<section>` y no es hijo directo del `<div>`. ✅
- **c)** `div + p` → Selecciona "Párrafo C", que es el hermano adyacente (inmediatamente posterior) del `<div>`, no un `<p>` dentro de él. ❌
- **d)** `div ~ p` → También selecciona "Párrafo C" (y cualquier otro `<p>` hermano posterior del `<div>` que hubiese). ❌

</details>

---

## Pregunta 3: Selectores combinados — ¿qué estilos se aplican?

**Dado el siguiente CSS y HTML, ¿de qué color se mostrará el texto del elemento `<p id="texto">`?**

```css
p { color: blue; }
div p { color: green; }
div > p { color: red; }
#texto { color: orange; }
```

```html
<div>
    <p id="texto">Hola mundo</p>
</div>
```

**Opciones:**

- a) `blue`
- b) `green`
- c) `red`
- d) `orange`

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: d) `orange`**

**Explicación:**
Cuando varios selectores apuntan al mismo elemento, CSS aplica el de **mayor especificidad**. El algoritmo de especificidad se calcula con cuatro categorías:

| Categoría | Descripción | Valor |
|-----------|-------------|-------|
| Estilos en línea (`style=""`) | Máxima prioridad | (1,0,0,0) |
| Selectores de ID (`#id`) | Alta prioridad | (0,1,0,0) |
| Clases, atributos, pseudoclases | Media prioridad | (0,0,1,0) |
| Elementos y pseudoelementos | Baja prioridad | (0,0,0,1) |

Calculando la especificidad de cada regla aplicable al `<p id="texto">`:
- `p` → especificidad **(0,0,0,1)** → color: blue
- `div p` → especificidad **(0,0,0,2)** → color: green
- `div > p` → especificidad **(0,0,0,2)** → color: red *(mismo nivel que `div p`, gana por orden de aparición)*
- `#texto` → especificidad **(0,1,0,0)** → color: orange ✅

El selector `#texto` tiene una especificidad de **ID (0,1,0,0)**, que es categóricamente superior a cualquier combinación de selectores de tipo o de descendencia. Por eso, independientemente del orden de las reglas, el color resultante es **orange**.

> 💡 **Nota:** Si se quisiese forzar `red` sobre el ID habría que usar `!important`, aunque esta práctica se considera mala costumbre en proyectos mantenibles.

</details>
