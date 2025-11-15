//====== actividad.js ======
const express = require("express");
const path = require("node:path"); // ✅ Moderno: node:path recomendado
const app = express();
const PORT = 3000;

//Seguridad: oculta la versión del framework Express:
app.disable("x-powered-by");

// Middleware: parsea JSON y sirve archivos estáticos
app.use(express.json());
app.use(express.static(__dirname)); // Sirve index.html, script.js, style.css, etc.

//=========================
//CONFIGURACIÓN DE BUTACAS:
//=========================
const N = 10; // Número de filas
const M = 10; // Número de columnas
let butacas = [];

//Inicializa la matriz de butacas:
function setup() {
  let idContador = 1;
  const matriz = [];

  for (let i = 0; i < N; i++) {
    const fila = [];
    for (let j = 0; j < M; j++) {
      fila.push({
        id: idContador++,
        estado: false, // false = libre, true = ocupado
      });
    }
    matriz.push(fila);
  }

  return matriz;
}

butacas = setup();

//==============================
//FUNCIONES DE LÓGICA DEL CINE:
//==============================

//✅ Reemplazo “negated condition” → uso explícito para mayor legibilidad.
function buscarAsientosDisponibles(fila, numAsientos) {
  let consecutivos = 0;
  let inicio = -1;

  //✅ Sustitución de “for clásico” por “for...of” para claridad y consistencia.
  for (const [j, asiento] of fila.entries()) {
    if (asiento.estado === false) { // condición explícita
      consecutivos++;
      if (inicio === -1) inicio = j;
      if (consecutivos === numAsientos) {
        // Devuelve IDs de los asientos contiguos disponibles
        return fila.slice(inicio, inicio + numAsientos).map(b => b.id);
      }
    } else {
      consecutivos = 0;
      inicio = -1;
    }
  }

  return null; // No hay suficientes asientos contiguos en esta fila
}

//Función principal: sugiere asientos contiguos disponibles
function suggest(numAsientos) {
  if (numAsientos > M) {
    console.log("❌ No caben tantos asientos en una sola fila.");
    return new Set();
  }

  //✅ for → for...of combinado con índice descendente manual.
  for (let i = N - 1; i >= 0; i--) {
    const fila = butacas[i];
    const seleccion = buscarAsientosDisponibles(fila, numAsientos);
    if (seleccion) {
      console.log(`🎟️ Sugerencia encontrada en fila ${i + 1}:`, seleccion);
      return new Set(seleccion);
    }
  }

  console.log("⚠️ No hay suficientes asientos contiguos disponibles.");
  return new Set();
}

//==================================
//RUTAS DEL SERVIDOR (ENDPOINTS):
//==================================

//Devuelve todas las butacas (para renderizar la sala).
app.get("/butacas", (_, res) => {
  res.json(butacas);
});

//Sugerir butacas contiguas.
app.post("/suggest", (req, res) => {
  const { cantidad } = req.body;
  const sugeridos = suggest(cantidad);
  res.json([...sugeridos]); // spread más claro que Array.from
});

//Confirmar una reserva (actualiza el estado).
app.post("/reservar", (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "Formato incorrecto de datos" });
  }

  //✅ Sustituir bucles anidados for → for...of
  for (const fila of butacas) {
    for (const butaca of fila) {
      if (ids.includes(butaca.id)) {
        butaca.estado = true;
      }
    }
  }

  console.log(`✅ Reserva confirmada: ${ids.join(", ")}`);
  res.json({ mensaje: "Reserva confirmada", butacas });
});

//==============================
//INICIAR SERVIDOR:
//==============================
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en: http://localhost:${PORT}`);
});