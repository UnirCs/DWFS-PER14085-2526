// ====== actividad.js ======
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Sirve index.html, script.js, style.css, etc.

// =========================
// CONFIGURACIÓN DE BUTACAS:
// =========================
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
        estado: false,//false = libre, true = ocupado
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

//Función suggest: busca asientos contiguos disponibles.
function suggest(numAsientos) {
  //Si se piden más asientos que los que caben en una fila → vacío
  if (numAsientos > M) {
    console.log("❌ No caben tantos asientos en una sola fila.");
    return new Set();
  }

  //Buscar desde la fila más lejana (última) hacia la más cercana (primera).
  for (let i = N - 1; i >= 0; i--) {
    let consecutivos = 0;
    let inicio = -1;

    for (let j = 0; j < M; j++) {
      if (!butacas[i][j].estado) {
        consecutivos=consecutivos+1;
        if (inicio === -1) inicio = j;
        if (consecutivos === numAsientos) {
          // Encontró suficientes asientos contiguos
          const seleccion = new Set();
          for (let k = inicio; k < inicio + numAsientos; k++) {
            seleccion.add(butacas[i][k].id);
          }
          console.log(`🎟️ Sugerencia encontrada en fila ${i + 1}:`, Array.from(seleccion));
          return seleccion;
        }
      } else {
        //Reinicia si hay un asiento ocupado.
        consecutivos = 0;
        inicio = -1;
      }
    }
  }

  console.log("⚠️ No hay suficientes asientos contiguos disponibles.");
  return new Set(); // No hay suficientes juntos
}

//==================================
//RUTAS DEL SERVIDOR:
//==================================

// Devuelve todas las butacas (para renderizar la sala)
app.get("/butacas", (req, res) => {
  res.json(butacas);
});

//Sugerir butacas contiguas.
app.post("/suggest", (req, res) => {
  const { cantidad } = req.body;
  const sugeridos = suggest(cantidad);
  res.json(Array.from(sugeridos)); // Enviar como array
});

//Confirmar una reserva (actualiza el estado).
app.post("/reservar", (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: "Formato incorrecto de datos" });
  }

  for (let i = 0; i < butacas.length; i++) {
    for (let j = 0; j < butacas[i].length; j++) {
      if (ids.includes(butacas[i][j].id)) {
        butacas[i][j].estado = true;
      }
    }
  }

  console.log(`✅ Reserva confirmada: ${ids.join(", ")}`);
  res.json({ mensaje: "Reserva confirmada", butacas });
});

// ==============================
// INICIAR SERVIDOR:
// ==============================
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en: http://localhost:${PORT}`);
});