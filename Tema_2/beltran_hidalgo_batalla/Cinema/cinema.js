function suggest(butacas, numAsientos) {
  let solution = new Set();
  let encontrado = false;

  if (butacas[0].length < numAsientos) return solution;

  let filaBusqueda = butacas.length - 1;
  while (!encontrado && filaBusqueda >= 0) {
    for (let i = 0; i < butacas[filaBusqueda].length && !encontrado; i++) {
      if (!butacas[filaBusqueda][i].estado) {
        solution.add(butacas[filaBusqueda][i].id);
        if (solution.size === numAsientos) encontrado = true;
      } else {
        solution.clear();
      }
    }
    filaBusqueda--;
    if (!encontrado) solution.clear();
  }
  return solution;
}

// CÓDIGO GENERADO POR IA PARA TESTEO DE LA SOLUCIÓN

// Función auxiliar para imprimir estado de una fila (para debugging)
function printFila(fila, numeroFila) {
  const estados = fila
    .map((asiento) => (asiento.estado ? "❌" : "✓"))
    .join(" ");
  console.log(`Fila ${numeroFila}: ${estados}`);
}

// CASO 1: Todas las butacas libres (caso ideal)
console.log("\n=== CASO 1: Todas las butacas libres ===");
function case1() {
  let butacas = [];
  for (let i = 0; i < 5; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      fila.push({
        id: i * 10 + j + 1,
        estado: false,
      });
    }
    butacas.push(fila);
  }
  console.log("Buscando 5 asientos...");
  let resultado = suggest(butacas, 5);
  console.log("Resultado:", Array.from(resultado));
  console.log("Esperado: Primeros 5 asientos de la última fila (41-45)");
}
case1();

// CASO 2: Algunos asientos ocupados (estado: ocupado)
console.log("\n=== CASO 2: Asientos ocupados en la última fila ===");
function case2() {
  let butacas = [];
  for (let i = 0; i < 5; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      // Última fila con algunos ocupados
      const ocupado = i === 4 && j > 3 && j < 8;
      fila.push({
        id: i * 10 + j + 1,
        estado: ocupado,
      });
    }
    butacas.push(fila);
  }
  printFila(butacas[4], 4);
  console.log("Buscando 3 asientos...");
  let resultado = suggest(butacas, 3);
  console.log("Resultado:", Array.from(resultado));
  console.log("Esperado: Primeros 3 asientos libres (41-43)");
}
case2();

// CASO 3: Butaca cortada por asientos ocupados en la última fila
console.log("\n=== CASO 3: Asientos ocupados en el medio (última fila) ===");
function case3() {
  let butacas = [];
  for (let i = 0; i < 5; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      // Última fila con ocupados en medio
      const ocupado = i === 4 && (j === 5 || j === 6);
      fila.push({
        id: i * 10 + j + 1,
        estado: ocupado,
      });
    }
    butacas.push(fila);
  }
  printFila(butacas[4], 4);
  console.log("Buscando 4 asientos...");
  let resultado = suggest(butacas, 4);
  console.log("Resultado:", Array.from(resultado));
  console.log("Esperado: Últimos 4 asientos consecutivos (46-49) o (47-50)");
}
case3();

// CASO 4: Última fila llena, buscar en penúltima
console.log("\n=== CASO 4: Última fila completamente ocupada ===");
function case4() {
  let butacas = [];
  for (let i = 0; i < 5; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      fila.push({
        id: i * 10 + j + 1,
        estado: i === 4, // Última fila ocupada
      });
    }
    butacas.push(fila);
  }
  printFila(butacas[4], 4);
  console.log("Buscando 3 asientos...");
  let resultado = suggest(butacas, 3);
  console.log("Resultado:", Array.from(resultado));
  console.log("Esperado: Primeros 3 asientos de penúltima fila (36-38)");
}
case4();

// CASO 5: No hay suficientes asientos consecutivos
console.log("\n=== CASO 5: No hay asientos consecutivos ===");
function case5() {
  let butacas = [];
  for (let i = 0; i < 5; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      // Patrón alternado: ocupado, libre, ocupado, libre...
      const ocupado = j % 2 === 0;
      fila.push({
        id: i * 10 + j + 1,
        estado: ocupado,
      });
    }
    butacas.push(fila);
  }
  printFila(butacas[4], 4);
  console.log("Buscando 2 asientos...");
  let resultado = suggest(butacas, 2);
  console.log("Resultado:", Array.from(resultado));
  console.log("Esperado: SET VACÍO (no hay 2 asientos consecutivos libres)");
}
case5();

// CASO 6: Solicitar más asientos que columnas
console.log("\n=== CASO 6: Solicitar más asientos que número de columnas ===");
function case6() {
  let butacas = [];
  for (let i = 0; i < 5; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      fila.push({
        id: i * 10 + j + 1,
        estado: false,
      });
    }
    butacas.push(fila);
  }
  console.log("Buscando 15 asientos (más que columnas)...");
  let resultado = suggest(butacas, 15);
  console.log("Resultado:", Array.from(resultado));
  console.log("Esperado: SET VACÍO");
}
case6();

// CASO 7: Ocupados en inicio y final, libres en medio
console.log("\n=== CASO 7: Asientos libres en el medio de la última fila ===");
function case7() {
  let butacas = [];
  for (let i = 0; i < 5; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      // Última fila: ocupados en bordes, libres en medio
      const ocupado = i === 4 && (j < 2 || j > 7);
      fila.push({
        id: i * 10 + j + 1,
        estado: ocupado,
      });
    }
    butacas.push(fila);
  }
  printFila(butacas[4], 4);
  console.log("Buscando 5 asientos...");
  let resultado = suggest(butacas, 5);
  console.log("Resultado:", Array.from(resultado));
  console.log("Nota: Analiza si este es el comportamiento esperado");
}
case7();

// CASO 8: Asiento único solicitado
console.log("\n=== CASO 8: Solicitar 1 asiento ===");
function case8() {
  let butacas = [];
  for (let i = 0; i < 5; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      const ocupado = i === 4 && j > 3 && j < 8;
      fila.push({
        id: i * 10 + j + 1,
        estado: ocupado,
      });
    }
    butacas.push(fila);
  }
  console.log("Buscando 1 asiento...");
  let resultado = suggest(butacas, 1);
  console.log("Resultado:", Array.from(resultado));
  console.log("Esperado: El primer asiento libre (41)");
}
case8();
