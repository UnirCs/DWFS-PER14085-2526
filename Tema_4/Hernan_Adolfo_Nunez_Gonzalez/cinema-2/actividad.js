//====== actividad.js ======
const express = require("express");
const path = require("node:path"); //✅ Moderno: node:path recomendado.
const app = express();
const PORT = 3000;

//Seguridad: oculta la versión del framework Express:
app.disable("x-powered-by");

//Middleware: parsea JSON.
app.use(express.json());


//=========================
//CONFIGURACIÓN DE BUTACAS.
//=========================
const N = 10;//Filas.
const M = 10;//Columnas.
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
         if (inicio === -1)
            inicio = j;
            
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


//==============================================
//Sugerir asientos evitando la silla preseleccionada (ID 100).
//==============================================
function suggest(numAsientos) {
  
  //la silla preseleccionada que bloquea la fila 10.
  const preselectedId = 100;
  
  const filaFinalIndex = N - 1;// índice 9 (Fila 10).
  const filaPrevIndex  = N - 2;// índice 8 (Fila 9).

  const fila10 = butacas[filaFinalIndex];
  const fila9  = butacas[filaPrevIndex];

  //====================================================
  // ⚡ Caso 1: piden de 1 a 9 asientos → sugerir 91..99
  //====================================================
  if (numAsientos >= 1 && numAsientos <= 9) {

    // fila 10 sin la silla preseleccionada
    const libresFila10 = fila10.filter(b => b.id !== preselectedId && b.estado === false);

    if (libresFila10.length >= numAsientos) {
      return new Set(
        libresFila10
          .slice(0, numAsientos)
          .map(b => b.id)
      );
    }
  }

  //====================================================
  // ⚡ Caso 2: piden EXACTAMENTE 10 asientos → fila 9 completa
  //====================================================
  if (numAsientos === 10) {
    const fila9Libre = fila9.every(b => b.estado === false);
    if (fila9Libre) {
      return new Set(fila9.map(b => b.id)); // 81–90
    }
  }

  //====================================================
  // ⚠️ Caso 3: fallback clásico si no aplica lo anterior
  //====================================================
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

// *** NUEVO ORDEN ***
// Hacer que la primera página sea registro.html (esta ruta debe ir ANTES del static)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "registro.html"));
});

// Servir archivos estáticos (CSS, JS, imágenes, páginas secundarias, etc.)
app.use(express.static(__dirname));

// Devuelve todas las butacas
app.get("/butacas", (_, res) => {
  res.json(butacas);
});

// Sugerir butacas contiguos
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