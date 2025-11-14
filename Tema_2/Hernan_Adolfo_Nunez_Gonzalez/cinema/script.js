//=========================
//🎬UNIR-CINEMA - script.js:
//=========================

//====== script.js ======

//Elementos del DOM:
const sala = document.getElementById("sala");
const inputCantidad = document.getElementById("cantidad");
const btnSugerir = document.getElementById("sugerir");

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

//🔧AJUSTE IMPORTANTE: antes lo agregabas a .container (que está cerca del pie de página).
//Para evitar que quede debajo del pie de página, lo movemos a .formulario.
document.querySelector(".formulario").appendChild(indicesDiv);

let butacas = [];
let seleccionActual = new Set();

//==============================
//Renderizar la sala de cine:
//==============================
function renderSala() {
  sala.innerHTML = "";
  
  butacas.forEach((fila, i) => {
    const filaDiv = document.createElement("div");
    filaDiv.classList.add("fila");

    const etiquetaFila = document.createElement("span");
    etiquetaFila.classList.add("numero-fila");
    etiquetaFila.textContent = `Fila ${i + 1}`;
    filaDiv.appendChild(etiquetaFila);

    fila.forEach((butaca) => {
      const asiento = document.createElement("div");
      asiento.classList.add("asiento");

      if (butaca.estado) asiento.classList.add("ocupado");
      if (seleccionActual.has(butaca.id)) asiento.classList.add("seleccionado");

      asiento.textContent = butaca.id;
      asiento.dataset.id = butaca.id;
      filaDiv.appendChild(asiento);
    });

    sala.appendChild(filaDiv);
  });
}

//==============================
//Cargar las butacas del servidor:
//==============================
async function cargarButacas() {
  const res = await fetch("/butacas");
  butacas = await res.json();
  renderSala();
}

//==============================
//Solicitar sugerencia de asientos:
//==============================
btnSugerir.addEventListener("click", async () => {
  const cantidad = parseInt(inputCantidad.value);
  if (!cantidad || cantidad < 1) {
    mostrarMensaje("⚠️ Ingresa una cantidad válida.", "warning");
    return;
  }

  const res = await fetch("/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });

  const sugeridos = await res.json();
  seleccionActual = new Set(sugeridos);

  if (sugeridos.length === 0) {
    mostrarMensaje("❌ No hay suficientes asientos juntos o excede la capacidad de una fila.", "error");
    indicesDiv.textContent = "";
  } else {
    const filaEncontrada = obtenerFilaDeAsiento(sugeridos[0]);
    mostrarMensaje(`🎟️ Sugerencia encontrada en fila ${filaEncontrada}. Asientos: ${sugeridos.join(", ")}.`, "success");

    const confirmar = confirm("¿Deseas confirmar esta reserva?");
    if (confirmar) {
      await fetch("/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: sugeridos }),
      });
      await cargarButacas();
      seleccionActual.clear();
      mostrarMensaje("✅ ¡Reserva confirmada!", "success");

      const indices = sugeridos.map(id => obtenerIndicesDeAsiento(id));
      indicesDiv.textContent = `🪑 Índices de los asientos reservados: ${indices.join(" | ")}`;
    }
  }

  renderSala();
});

//==============================
//Mostrar mensajes dinámicos:
//==============================
function mostrarMensaje(texto, tipo) {
  mensajeDiv.textContent = texto;
  if (tipo === "error") mensajeDiv.style.color = "#d32f2f";
  else if (tipo === "warning") mensajeDiv.style.color = "#f57c00";
  else if (tipo === "success") mensajeDiv.style.color = "#388e3c";
  else mensajeDiv.style.color = "white";
}

//==============================
//Obtener número de fila de un asiento:
//==============================
function obtenerFilaDeAsiento(idAsiento) {
  for (let i = 0; i < butacas.length; i++) {
    for (let j = 0; j < butacas[i].length; j++) {
      if (butacas[i][j].id === idAsiento) {
        return i + 1;
      }
    }
  }
  return "?";
}

//==============================
//Obtener índices [fila][columna] de un asiento:
//==============================
function obtenerIndicesDeAsiento(idAsiento) {
  for (let i = 0; i < butacas.length; i++) {
    for (let j = 0; j < butacas[i].length; j++) {
      if (butacas[i][j].id === idAsiento) {
        return `[${i}][${j}]`;
      }
    }
  }
  return "";
}

//==============================
//Inicialización:
//==============================
cargarButacas();