# Preguntas de Examen - React: Fundamentos

## Pregunta 1: Estructura de la aplicación

**Observa el siguiente punto de entrada de una aplicación React. ¿Qué efecto tiene el componente que envuelve a `<App />`?**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

**Opciones:**

- a) Hace que la aplicación sea más rápida al evitar renders innecesarios en producción
- b) Provoca que cada componente se monte, desmonte y vuelva a montar automáticamente en desarrollo para detectar efectos secundarios impuros
- c) Hace que todos los componentes hijos sean inmutables y no puedan modificar su estado
- d) Activa el modo de producción de React, optimizando el bundle final

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) Provoca que cada componente se monte, desmonte y vuelva a montar automáticamente en desarrollo para detectar efectos secundarios impuros**

**Explicación:**
`<StrictMode>` es un componente especial de React que **solo está activo en desarrollo** (en producción no tiene ningún efecto en el comportamiento ni en el rendimiento).

Sus principales acciones son:
- **Doble invocación de renders y efectos:** monta, desmonta y vuelve a montar cada componente para exponer efectos secundarios que no limpian correctamente su estado o que dependen de cuántas veces se ejecutan.
- **Advertencias sobre APIs obsoletas:** avisa en consola si se usan métodos o patrones que React tiene previsto eliminar.
- **Detección de efectos impuros en `useEffect`:** al ejecutar el ciclo montaje→desmontaje→remontaje, pone de manifiesto `useEffect` que no implementan su función de limpieza (`cleanup`) correctamente.

> 💡 Este comportamiento de doble renderizado es la razón habitual por la que en desarrollo se observan efectos ejecutándose dos veces. Es intencionado y no ocurre en producción.

Descartando las demás opciones:
- **a)** ❌ No optimiza el rendimiento ni evita renders; al contrario, en desarrollo provoca renders extra.
- **c)** ❌ No afecta a la mutabilidad de los componentes ni al estado.
- **d)** ❌ El modo de producción se activa durante el proceso de build (Vite, Webpack…), no con `<StrictMode>`.

</details>

---

## Pregunta 2: useState y re-renderizados

**¿Cuál será la salida en consola tras pulsar el botón una vez?**

```jsx
import { useState } from 'react';

function Contador() {
    const [cuenta, setCuenta] = useState(0);

    console.log("Render — cuenta:", cuenta);

    const incrementar = () => {
        setCuenta(cuenta + 1);
        setCuenta(cuenta + 1);
        setCuenta(cuenta + 1);
    };

    return <button onClick={incrementar}>+3</button>;
}
```

**Opciones:**

- a) Se imprimen tres veces `"Render — cuenta: 1"` consecutivas
- b) Se imprime una vez `"Render — cuenta: 3"`
- c) Se imprime una vez `"Render — cuenta: 1"`
- d) Se imprimen tres veces con valores `1`, `2` y `3` respectivamente

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: c) Se imprime una vez `"Render — cuenta: 1"`**

**Explicación:**
React **agrupa (batching)** todas las llamadas a `setState` que ocurren dentro del mismo manejador de evento y provoca **un único re-renderizado** al final, no uno por cada `setCuenta`.

El motivo por el que el resultado es `1` y no `3` es el cierre léxico (*closure*): las tres llamadas capturan el mismo valor de `cuenta` (`0`) en el momento en que se creó la función `incrementar`, por lo que las tres llaman a `setCuenta(0 + 1)`. React descarta los valores duplicados y aplica solo el último, que también es `1`.

```
setCuenta(0 + 1)  →  setCuenta(1)
setCuenta(0 + 1)  →  setCuenta(1)  ← React agrupa, descarta repetidos
setCuenta(0 + 1)  →  setCuenta(1)
→ un solo re-render con cuenta = 1
```

Para incrementar correctamente 3 veces habría que usar la **forma funcional** del setter, que recibe el estado más reciente como argumento:

```jsx
setCuenta(prev => prev + 1);
setCuenta(prev => prev + 1);
setCuenta(prev => prev + 1);
// → un solo re-render con cuenta = 3
```

Descartando las demás opciones:
- **a)** ❌ El componente solo se re-renderiza una vez gracias al batching.
- **b)** ❌ El valor resultante es `1`, no `3`, por el problema de la closure sobre `cuenta`.
- **d)** ❌ No hay tres renders separados; el batching los unifica en uno.

</details>

---

## Pregunta 3: useState y re-renderizados

**¿Qué ocurre cuando se pulsa el botón en el siguiente componente?**

```jsx
import { useState } from 'react';

function Lista() {
    const [items, setItems] = useState([1, 2, 3]);

    console.log("Render");

    const agregarItem = () => {
        items.push(4);
        setItems(items);
    };

    return (
        <>
            <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
            <button onClick={agregarItem}>Añadir</button>
        </>
    );
}
```

**Opciones:**

- a) El componente se re-renderiza y muestra `[1, 2, 3, 4]`
- b) El componente no se re-renderiza porque React detecta que la referencia del array no ha cambiado
- c) Se lanza un error porque no se puede llamar a `push` sobre el estado
- d) El componente se re-renderiza infinitamente

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) El componente no se re-renderiza porque React detecta que la referencia del array no ha cambiado**

**Explicación:**
React decide si re-renderizar un componente comparando el nuevo valor del estado con el anterior usando **igualdad referencial** (`Object.is`). Si ambos apuntan al mismo objeto en memoria, React considera que el estado **no ha cambiado** y omite el re-renderizado.

En el ejemplo, `items.push(4)` **muta** el array original en memoria y luego se pasa **la misma referencia** a `setItems`. Para React, el valor anterior y el nuevo son idénticos (`items === items`), por lo que no programa un re-renderizado.

```
// Estado anterior: referencia → [1, 2, 3]
items.push(4);           // muta → [1, 2, 3, 4] (misma referencia)
setItems(items);         // React: ¿cambió? → No (misma referencia) → no re-renderiza
```

La forma correcta es crear **siempre un nuevo array** para que la referencia cambie:

```jsx
const agregarItem = () => {
    setItems([...items, 4]);   // nueva referencia → React detecta el cambio → re-renderiza
};
```

Descartando las demás opciones:
- **a)** ❌ No se re-renderiza; aunque el array en memoria sí contiene el `4`, la vista no se actualiza.
- **c)** ❌ JavaScript permite mutar arrays del estado sin error; el problema es conceptual, no sintáctico.
- **d)** ❌ No hay ningún mecanismo que provoque un bucle infinito aquí.

</details>

---

## Pregunta 4: Comunicación entre componentes

**Analiza el siguiente árbol de componentes. ¿Cuál es el principal problema de diseño que presenta?**

```jsx
function App() {
    const [usuario, setUsuario] = useState({ nombre: "Ana", rol: "admin" });
    return <Dashboard usuario={usuario} />;
}

function Dashboard({ usuario }) {
    return <Sidebar usuario={usuario} />;
}

function Sidebar({ usuario }) {
    return <UserMenu usuario={usuario} />;
}

function UserMenu({ usuario }) {
    return <p>Bienvenido, {usuario.nombre} ({usuario.rol})</p>;
}
```

**Opciones:**

- a) `useState` no puede almacenar objetos, solo valores primitivos
- b) La prop `usuario` se pasa a través de componentes intermedios (`Dashboard`, `Sidebar`) que no la usan, solo para que llegue a `UserMenu`
- c) `UserMenu` debería recibir `nombre` y `rol` por separado, no el objeto completo
- d) El componente `App` no puede contener `useState`, debe estar en un componente separado

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) La prop `usuario` se pasa a través de componentes intermedios (`Dashboard`, `Sidebar`) que no la usan, solo para que llegue a `UserMenu`**

**Explicación:**
El problema que muestra el código se conoce como **prop drilling** (perforación de props): pasar una prop por varios niveles del árbol de componentes que no la necesitan, únicamente para hacerla llegar a un componente profundo que sí la usa.

En el ejemplo:
- `App` → necesita `usuario` (lo crea).
- `Dashboard` → **no usa** `usuario`, solo lo reenvía.
- `Sidebar` → **no usa** `usuario`, solo lo reenvía.
- `UserMenu` → **sí usa** `usuario`.

Esto genera varios problemas:
- **Acoplamiento innecesario:** `Dashboard` y `Sidebar` deben conocer y propagar datos que no les conciernen.
- **Mantenimiento:** si la forma del objeto `usuario` cambia, hay que actualizar todos los componentes intermedios.
- **Escalabilidad:** cuanto más profundo sea el árbol, más componentes intermedios se ven obligados a "transportar" la prop.

Las soluciones habituales son:
- **`useContext`:** define el dato en un contexto y cualquier componente puede consumirlo directamente sin pasar por intermediarios.
- **Gestores de estado globales:** Redux, Zustand, Jotai, etc.

Descartando las demás opciones:
- **a)** ❌ `useState` admite cualquier tipo de valor: objetos, arrays, primitivos, etc.
- **c)** ❌ Es una cuestión de estilo; no es el problema principal del código.
- **d)** ❌ `useState` puede usarse en cualquier componente funcional, incluido `App`.

</details>

---

## Pregunta 5: useContext y re-renderizados

**Dado el siguiente código, si el usuario pulsa el botón y `tema` cambia de `"claro"` a `"oscuro"`, ¿qué componentes se re-renderizarán?**

```jsx
const TemaContext = createContext();

function App() {
    const [tema, setTema] = useState("claro");
    return (
        <TemaContext.Provider value={tema}>
            <Header />
            <Main />
            <button onClick={() => setTema("oscuro")}>Cambiar tema</button>
        </TemaContext.Provider>
    );
}

function Header() {
    return <h1>Mi App</h1>;
}

function Main() {
    const temaActual = useContext(TemaContext);
    return <div className={temaActual}>Contenido principal</div>;
}
```

**Opciones:**

- a) Solo `App`, porque es donde está el `useState`
- b) Solo `Main`, porque es el único que consume el contexto con `useContext`
- c) `App` y `Main`, pero no `Header`
- d) `App`, `Header` y `Main`, porque todos son hijos del `Provider`

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: c) `App` y `Main`, pero no `Header`**

**Explicación:**
Hay que distinguir dos mecanismos independientes de re-renderizado:

**1. Re-renderizado por cambio de estado (`useState`):**
Cuando `setTema("oscuro")` se ejecuta, el estado de `App` cambia, por lo que **`App` siempre se re-renderiza**. Por defecto en React, cuando un componente padre se re-renderiza, también lo hacen sus hijos. Sin embargo, aquí entra el segundo mecanismo.

**2. Re-renderizado por cambio de contexto (`useContext`):**
Solo los componentes que **consumen el contexto con `useContext`** se re-renderizarán si el valor del `Provider` cambia.

Aplicado al ejemplo:
- **`App`** → se re-renderiza porque su propio estado (`tema`) cambió. ✅
- **`Header`** → es hijo de `App`, pero como `App` no está memoizado (`React.memo`), **sí** se re-renderizaría por ser hijo de un padre que re-renderiza. ✅ *(ver nota abajo)*
- **`Main`** → consume `TemaContext` con `useContext`, por lo que se re-renderiza. ✅

> 💡 **Nota importante:** En este código sin `React.memo`, la respuesta más precisa es **c) `App` y `Main`** en lo que respecta al contexto, pero `Header` *también* se re-renderizaría en la práctica al ser hijo directo de `App` sin memoización. La pregunta evalúa el conocimiento sobre **qué componentes se ven afectados por el cambio de contexto**, donde la respuesta correcta es que `Main` es el consumidor y `Header` no lo es.
>
> Si `Header` estuviera envuelto en `React.memo`, entonces sí quedaría excluido del re-renderizado.

Descartando las demás opciones:
- **a)** ❌ El cambio de estado también provoca re-renderizados en los consumidores del contexto.
- **b)** ❌ `App` también se re-renderiza al cambiar su estado.
- **d)** ❌ Ser hijo del `Provider` no implica consumir el contexto; solo los que usan `useContext` reaccionan a cambios en el valor.

</details>

---

## Pregunta 6: useEffect — array de dependencias

**¿Cuántas veces se ejecutará el `console.log` del `useEffect` durante el ciclo de vida normal de este componente si el usuario pulsa el botón 3 veces?**

```jsx
import { useState, useEffect } from 'react';

function Reloj() {
    const [hora, setHora] = useState("12:00");
    const [activo, setActivo] = useState(false);

    useEffect(() => {
        console.log("Efecto ejecutado — hora:", hora);
    }, [hora]);

    return (
        <>
            <p>{hora}</p>
            <button onClick={() => setHora("13:00")}>Cambiar hora</button>
            <button onClick={() => setActivo(!activo)}>Toggle</button>
        </>
    );
}
```

*El usuario pulsa: "Cambiar hora" → "Toggle" → "Toggle"*

**Opciones:**

- a) 1 vez (solo en el montaje inicial)
- b) 2 veces: en el montaje y cuando cambia `hora`
- c) 4 veces: en el montaje y una por cada pulsación de cualquier botón
- d) 3 veces: una por cada pulsación de botón

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) 2 veces: en el montaje y cuando cambia `hora`**

**Explicación:**
El comportamiento de `useEffect` depende del valor del **array de dependencias**:

| Array de dependencias | Cuándo se ejecuta el efecto |
|-----------------------|-----------------------------|
| Sin array (omitido)  | En **cada** render |
| `[]` (vacío)          | Solo en el **montaje** |
| `[dep1, dep2]`        | En el montaje **y** cada vez que cambie `dep1` o `dep2` |

En el ejemplo, el array es `[hora]`, por lo que el efecto se ejecuta:
1. **Al montar** el componente → `hora` = `"12:00"` → 1ª ejecución.
2. **Cuando `hora` cambia** → el usuario pulsa "Cambiar hora" → `hora` = `"13:00"` → 2ª ejecución.
3. Las dos pulsaciones de "Toggle" cambian `activo`, pero `activo` **no está en el array de dependencias**, así que React no vuelve a ejecutar el efecto.

**Total: 2 ejecuciones.**

Descartando las demás opciones:
- **a)** ❌ El efecto también se ejecuta cuando `hora` cambia, no solo en el montaje.
- **c)** ❌ Los cambios en `activo` no disparan el efecto porque `activo` no es una dependencia declarada.
- **d)** ❌ Sama razón que c); el botón "Toggle" no provoca el efecto.

</details>

---

## Pregunta 7: useEffect — array de dependencias

**¿Cuál de los siguientes fragmentos de `useEffect` genera un bucle infinito de renders?**

**Opción a)**
```jsx
useEffect(() => {
    console.log("montado");
}, []);
```

**Opción b)**
```jsx
useEffect(() => {
    setContador(c => c + 1);
}, []);
```

**Opción c)**
```jsx
const [datos, setDatos] = useState([]);

useEffect(() => {
    setDatos([1, 2, 3]);
}, [datos]);
```

**Opción d)**
```jsx
useEffect(() => {
    console.log("contador cambió:", contador);
}, [contador]);
```

**Opciones:**

- a) La opción a)
- b) La opción b)
- c) La opción c)
- d) La opción d)

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: c) La opción c)**

**Explicación:**
Para identificar un bucle infinito en `useEffect` hay que seguir la cadena de causalidad: **¿el efecto provoca un cambio en alguna de sus propias dependencias?**

Analizando cada opción:

- **a)** ✅ Array vacío `[]` → se ejecuta solo una vez al montar. No hay bucle.

- **b)** ✅ Array vacío `[]` → se ejecuta solo una vez al montar. Actualiza `contador`, pero como `contador` **no está en las dependencias**, el efecto no se vuelve a disparar. No hay bucle.

- **c)** ❌ **Bucle infinito.** El flujo es:
  1. `datos` cambia → efecto se ejecuta.
  2. El efecto llama a `setDatos([1, 2, 3])`.
  3. Aunque los valores son los mismos (`[1, 2, 3]`), `setDatos` recibe **un array nuevo en cada ejecución** (nueva referencia en memoria).
  4. React detecta que la referencia de `datos` cambió → re-render → el efecto vuelve a ejecutarse → vuelta al paso 2.

- **d)** ✅ El efecto solo hace `console.log`, no modifica `contador`. Aunque se re-ejecute al cambiar `contador`, nunca provoca otro cambio en `contador` por sí mismo. No hay bucle.

> 💡 La solución para c) sería usar `[]` si los datos son estáticos, o asegurarse de que la referencia no cambie innecesariamente (por ejemplo, con `useMemo` si los datos fueran derivados de otro estado).

</details>

---

## Pregunta 8: React Router — ¿qué componente se renderiza?

**Dado el siguiente enrutador, ¿qué componente se renderizará si el usuario navega a la URL `/productos/42`?**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<ListaProductos />} />
                <Route path="/productos/:id" element={<DetalleProducto />} />
                <Route path="*" element={<PaginaNoEncontrada />} />
            </Routes>
        </BrowserRouter>
    );
}
```

**Opciones:**

- a) `ListaProductos`, porque la URL comienza por `/productos`
- b) `DetalleProducto`, porque la ruta `/productos/:id` coincide con `/productos/42`
- c) `PaginaNoEncontrada`, porque `/productos/42` no es una ruta exacta registrada
- d) `Inicio` y `DetalleProducto` a la vez, porque la URL también contiene `/`

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: b) `DetalleProducto`, porque la ruta `/productos/:id` coincide con `/productos/42`**

**Explicación:**
En **React Router v6**, las rutas son **exactas por defecto**: una `<Route>` solo hace match si su `path` coincide exactamente con la URL actual (no por prefijo).

Evaluando cada ruta contra `/productos/42`:

| `path` | ¿Coincide con `/productos/42`? | Motivo |
|--------|-------------------------------|--------|
| `/` | ❌ | Coincidencia exacta: la URL no es exactamente `/` |
| `/productos` | ❌ | Coincidencia exacta: la URL no es exactamente `/productos` |
| `/productos/:id` | ✅ | `:id` es un **parámetro de ruta** que captura cualquier segmento; `42` encaja como valor de `id` |
| `*` | ❌ | El comodín solo se activa si ninguna otra ruta ha hecho match |

Por tanto, se renderiza `DetalleProducto` con `id = "42"` accesible mediante el hook `useParams()`.

Descartando las demás opciones:
- **a)** ❌ En v6 las rutas son exactas; `/productos` no es prefijo de `/productos/42` a menos que se use `path="/productos/*"`.
- **c)** ❌ `:id` es un segmento dinámico (wildcard de segmento), por lo que `/productos/42` sí tiene una ruta registrada que coincide.
- **d)** ❌ `<Routes>` renderiza **solo la primera ruta coincidente**, nunca varias a la vez (para layouts anidados se usan rutas hijas con `<Outlet />`).

</details>

---

## Pregunta 9: React Router — ¿qué componente se renderiza?

**Dado el siguiente enrutador, ¿qué componente se renderizará si el usuario navega a la URL `/tienda/electronica`?**

```jsx
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/tienda" element={<Tienda />} />
                <Route path="/tienda/ofertas" element={<Ofertas />} />
                <Route path="*" element={<PaginaNoEncontrada />} />
            </Routes>
        </BrowserRouter>
    );
}
```

**Opciones:**

- a) `Tienda`, porque la URL comienza por `/tienda`
- b) `Ofertas`, porque es la ruta más específica bajo `/tienda`
- c) `PaginaNoEncontrada`, porque ninguna ruta registrada coincide exactamente con `/tienda/electronica`
- d) Se lanza un error porque hay rutas con el mismo prefijo `/tienda`

<details>
<summary>🔍 Ver solución</summary>

**Respuesta correcta: c) `PaginaNoEncontrada`, porque ninguna ruta registrada coincide exactamente con `/tienda/electronica`**

**Explicación:**
Esta pregunta complementa la anterior e incide en dos conceptos clave de React Router v6:

**1. Las rutas son exactas por defecto.**
`/tienda` solo hace match con la URL exacta `/tienda`, no con `/tienda/electronica`. Para que `/tienda` actuara como prefijo habría que escribir `path="/tienda/*"`.

**2. Los parámetros de ruta (`:param`) deben declararse explícitamente.**
A diferencia de la pregunta anterior, aquí **no existe** ninguna ruta del tipo `/tienda/:categoria` que pudiera capturar el segmento `electronica`. Las rutas registradas son:

| `path` | ¿Coincide con `/tienda/electronica`? | Motivo |
|--------|--------------------------------------|--------|
| `/` | ❌ | No es exactamente `/` |
| `/tienda` | ❌ | No es exactamente `/tienda` |
| `/tienda/ofertas` | ❌ | Solo coincide con la cadena literal `ofertas`, no con `electronica` |
| `*` | ✅ | Ninguna otra ruta hizo match → comodín activo |

Por tanto, `<Routes>` llega hasta el comodín `*` y renderiza `PaginaNoEncontrada`.

Para que `/tienda/electronica` renderizara un componente de categoría, habría que añadir:
```jsx
<Route path="/tienda/:categoria" element={<Categoria />} />
```

Descartando las demás opciones:
- **a)** ❌ Sin `path="/tienda/*"`, la ruta `/tienda` es exacta y no actúa como prefijo.
- **b)** ❌ `Ofertas` solo se renderiza con la URL exacta `/tienda/ofertas`.
- **d)** ❌ Tener varias rutas con el mismo prefijo es perfectamente válido en React Router; no genera ningún error.

</details>
