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

//==============================
// ⚡ NUEVO SISTEMA DE PRESELECCIÓN
//==============================
let preseleccionInicial = new Set();     // ← la butaca 100
let preseleccionSugerencia = new Set();  // ← las que vienen de /suggest

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

      // Ocupados
      if (butaca.estado === true) asiento.classList.add("ocupado");

      // Selección confirmada
      if (seleccionActual.has(butaca.id)) asiento.classList.add("seleccionado");

      // ⚡ PRESELECCIÓN INICIAL SIEMPRE ACTIVA (si no está ocupada)
      if (preseleccionInicial.has(butaca.id) && butaca.estado === false) {
        asiento.classList.add("preseleccion");
      }

      // ⚡ PRESELECCIÓN POR SUGERENCIA (si no está ocupada)
      if (preseleccionSugerencia.has(butaca.id) && butaca.estado === false) {
        asiento.classList.add("preseleccion");
      }

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

  //===============================================
  // ⚡ NUEVO — PRESELECCIÓN TRAS REGISTRO (EJ. 4)
  //===============================================
  const flag = localStorage.getItem("preseleccionarButaca");

  if (flag === "1") {
    const filaFinal = butacas.length - 1;
    const colFinal = butacas[0].length - 1;
    const idUltima = butacas[filaFinal][colFinal].id; // ID 100

    // ⚡ HACER QUE LA 100 ESTÉ OCUPADA EN EL BACKEND
    await fetch("/reservar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [idUltima] })
    });

    // ⚡ QUITARLA DE PRESELECCIÓN, YA NO ES AMARILLA
    preseleccionInicial.clear();

    localStorage.removeItem("preseleccionarButaca");

    // Recargar matriz ya con asiento 100 ocupado
    const r2 = await fetch("/butacas");
    butacas = await r2.json();
  }

  renderSala();
}

//==============================
// PRESELECCIÓN AUTOMÁTICA (EJERCICIO 4)
// Al cambiar el input, se consulta /suggest
//==============================
inputCantidad.addEventListener("input", async () => {
  preseleccionSugerencia.clear(); // ← SOLO borro sugerencias

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

    //===========================================
    // ⚡ QUITAR DE PRESELECCIÓN LOS ASIENTOS RESERVADOS
    //===========================================
    for (const id of sugeridos) {
      preseleccionSugerencia.delete(id);
      preseleccionInicial.delete(id);
    }

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
  switch (tipo) {
    case "error":
      mensajeDiv.style.color = "#d32f2f";
      break;
    case "warning":
      mensajeDiv.style.color = "#f57c00";
      break;
    case "success":
      mensajeDiv.style.color = "#388e3c";
      break;
    default:
      mensajeDiv.style.color = "white";
  }
}

//==============================
//Obtener número de fila de un asiento:
//==============================
function obtenerFilaDeAsiento(idAsiento) {
  for (const [i, fila] of butacas.entries()) {
    for (const butaca of fila) {
      if (butaca.id === idAsiento) return i + 1;
    }
  }
  return null;
}

//==============================
//Obtener índices [fila][columna] de un asiento:
//==============================
function obtenerIndicesDeAsiento(idAsiento) {
  for (const [i, fila] of butacas.entries()) {
    for (const [j, butaca] of fila.entries()) {
      if (butaca.id === idAsiento) return `[${i}][${j}]`;
    }
  }
  return "";
}

//==============================
//Inicialización con top-level await (ES2022):
//==============================
await cargarButacas();