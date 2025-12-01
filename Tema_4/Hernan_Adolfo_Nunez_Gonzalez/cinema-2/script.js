/* 
===========================================
UNIR - Desarrollo Web - TEMA 4: DOM y Backend
Este archivo es una versión avanzada distinta al Tema 2.
Posee cambios de preselección, mejoras de renderizado,
refactorización SonarQube y lógica extendida.
===========================================
*/
//=========================
//🎬 UNIR-CINEMA - script.js:
//=========================

//Elementos del DOM:
const sala = document.getElementById("sala");
const inputCantidad = document.getElementById("cantidad");
const btnConfirmar = document.getElementById("sugerir"); // ahora es confirmar

//Crear elementos dinámicos:
const mensajeDiv = document.createElement("div");
mensajeDiv.id = "mensaje";
mensajeDiv.style.marginTop = "10px";
mensajeDiv.style.fontWeight = "bold";
mensajeDiv.style.textAlign = "center";
document.querySelector(".formulario").appendChild(mensajeDiv);

//Nuevo contenedor para los índices reservados:
const indicesDiv = document.createElement("div");
indicesDiv.id = "indices-reservados";
indicesDiv.style.marginTop = "10px";
indicesDiv.style.textAlign = "center";
indicesDiv.style.fontSize = "14px";
document.querySelector(".formulario").appendChild(indicesDiv);

let butacas = [];
let seleccionActual = new Set();

//==============
//⚡ PRESELECCIÓN
//==============
let preseleccionSugerencia = new Set();  // ← solo se usa esta


//=====================================================
// ⚡ FUNCIÓN: asignar clases visuales a un asiento
//=====================================================
function aplicarClases(asiento, butaca) {

  if (butaca.estado === true) {
    asiento.classList.add("ocupado");
    return;
  }

  if (seleccionActual.has(butaca.id)) {
    asiento.classList.add("seleccionado");
    return;
  }

  if (preseleccionSugerencia.has(butaca.id)) {
    asiento.classList.add("preseleccion");
  }
}


//==============================
// Renderizar la sala de cine:
//==============================
function renderSala() {
  sala.innerHTML = "";

  for (const [i, fila] of butacas.entries()) {
    const filaDiv = document.createElement("div");
    filaDiv.classList.add("fila");

    const etiquetaFila = document.createElement("span");
    etiquetaFila.classList.add("numero-fila");
    etiquetaFila.textContent = `Fila ${i + 1}`;
    filaDiv.appendChild(etiquetaFila);

    for (const butaca of fila) {
      const asiento = document.createElement("div");
      asiento.classList.add("asiento");

      //⚡ Menos complejidad
      aplicarClases(asiento, butaca);

      asiento.textContent = butaca.id;
      asiento.dataset.id = butaca.id;

      filaDiv.appendChild(asiento);
    }

    sala.appendChild(filaDiv);
  }
}


//==============================
// Cargar butacas del servidor:
//==============================
async function cargarButacas() {
  const respuesta = await fetch("/butacas");
  butacas = await respuesta.json();

  //⚡ PRESELECCIÓN TRAS REGISTRO
  const flag = localStorage.getItem("preseleccionarButaca");

  if (flag === "1") {
    const filaFinal = butacas.length - 1;
    const colFinal = butacas[0].length - 1;
    const idUltima = butacas[filaFinal][colFinal].id; // ID 100

    // marcar la 100 como ocupada en backend
    await fetch("/reservar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [idUltima] })
    });

    localStorage.removeItem("preseleccionarButaca");

    // recargar después de ocuparla
    const r2 = await fetch("/butacas");
    butacas = await r2.json();
  }

  renderSala();
}


//==============================
// PRESELECCIÓN AUTOMÁTICA
//==============================
inputCantidad.addEventListener("input", async () => {
  preseleccionSugerencia.clear();

  const cantidad = Number.parseInt(inputCantidad.value, 10);
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    renderSala();
    return;
  }

  const respuesta = await fetch("/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });

  const sugeridos = await respuesta.json();
  preseleccionSugerencia = new Set(sugeridos);

  renderSala();
});


//==============================
// Botón de confirmar reserva
//==============================
btnConfirmar.addEventListener("click", async () => {

  const cantidad = Number.parseInt(inputCantidad.value, 10);

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    mostrarMensaje("⚠️ Ingresa una cantidad válida.", "warning");
    return;
  }

  const respuesta = await fetch("/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });

  const sugeridos = await respuesta.json();
  seleccionActual = new Set(sugeridos);

  if (sugeridos.length === 0) {
    mostrarMensaje("❌ No hay suficientes asientos juntos.", "error");
    indicesDiv.textContent = "";
    return;
  }

  const confirmar = confirm(`¿Deseas confirmar la reserva de ${sugeridos.join(", ")}?`);

  if (confirmar) {

    await fetch("/reservar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: sugeridos }),
    });

    await cargarButacas();

    // limpiar preselecciones
    preseleccionSugerencia.clear();

    mostrarMensaje("✅ ¡Reserva confirmada!", "success");
    const indices = sugeridos.map(id => obtenerIndicesDeAsiento(id));
    indicesDiv.textContent = `🪑 Índices de los asientos reservados: ${indices.join(" | ")}`;

    renderSala();
  }
});


//==============================
//Mostrar mensajes dinámicos:
//==============================
function mostrarMensaje(texto, tipo) {
  mensajeDiv.textContent = texto;
  const colores = {
    error: "#d32f2f",
    warning: "#f57c00",
    success: "#388e3c"
  };
  mensajeDiv.style.color = colores[tipo] || "white";
}


//==============================
//Obtener número de fila:
//==============================
function obtenerFilaDeAsiento(idAsiento) {
  for (const [i, fila] of butacas.entries()) {
    if (fila.some(b => b.id === idAsiento)) return i + 1;
  }
  return null;
}


//==============================
//Obtener índices:
//==============================
function obtenerIndicesDeAsiento(idAsiento) {
  for (const [i, fila] of butacas.entries()) {
    const j = fila.findIndex(b => b.id === idAsiento);
    if (j !== -1) return `[${i}][${j}]`;
  }
  return "";
}


//==============================
// Inicialización:
//==============================
await cargarButacas();