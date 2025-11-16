//====== actividad.js ======
const express = require("express");
const path = require("node:path");//✅ Moderno: node:path recomendado.
const app = express();
const PORT = 3000;

//Seguridad: oculta la versión del framework Express:
app.disable("x-powered-by");

//Middleware: parsea JSON y sirve archivos estáticos:
app.use(express.json());
app.use(express.static(__dirname));

//=========================
//CONFIGURACIÓN DE BUTACAS.
//=========================
const N = 10; // Filas
const M = 10; // Columnas
let butacas = [];

// Inicializa la matriz de butacas
function setup() {
  let idContador = 1;
  const matriz = [];

  for (let i = 0; i < N; i++) {
    const fila = [];
    for (let j = 0; j < M; j++) {
      fila.push({
        id: idContador++,
        estado: false // false = libre, true = ocupado
      });
    }
    matriz.push(fila);
  }
  return matriz;
}

butacas = setup();

//==============================
//FUNCIONES DE LÓGICA DEL CINE.
//==============================

//Buscar asientos contiguos disponibles sin usar return dentro del bucle.
function buscarAsientosDisponibles(fila, numAsientos) {
  let consecutivos = 0;
  let inicio = -1;
  let resultado = null;

  for (const [j, asiento] of fila.entries()) {
    if (asiento.estado === false) {
      consecutivos++;
      if (inicio === -1) inicio = j;

      if (consecutivos === numAsientos && resultado === null) {
        resultado = fila.slice(inicio, inicio + numAsientos).map(b => b.id);
        //No se usa return; solo se guarda el resultado.
      }
    } else {
      consecutivos = 0;
      inicio = -1;
    }
  }

  return resultado;
}

//Sugerir asientos contiguos disponibles.
function suggest(numAsientos) {
  if (numAsientos > M) {
    console.log("❌ No caben tantos asientos en una sola fila.");
    return new Set();
  }

  let resultado = new Set();

  for (let i = N - 1; i >= 0; i--) {
    const fila = butacas[i];
    const seleccion = buscarAsientosDisponibles(fila, numAsientos);
    if (seleccion && resultado.size === 0) {
      console.log(`🎟️ Sugerencia encontrada en fila ${i + 1}:`, seleccion);
      resultado = new Set(seleccion);
      //No se usa return dentro del bucle.
    }
  }

  if (resultado.size === 0) {
    console.log("⚠️ No hay suficientes asientos contiguos disponibles.");
  }

  return resultado;
}

//==================================
// RUTAS DEL SERVIDOR (ENDPOINTS).
//==================================

// Devuelve todas las butacas
app.get("/butacas", (_, res) => {
  res.json(butacas);
});

// Sugerir butacas contiguas
app.post("/suggest", (req, res) => {
  const { cantidad } = req.body;
  const sugeridos = suggest(cantidad);
  res.json([...sugeridos]);
});

//Confirmar reserva (actualiza el estado).
app.post("/reservar", (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "Formato incorrecto de datos" });
  }

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
// INICIAR SERVIDOR:
//==============================
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en: http://localhost:${PORT}`);
});