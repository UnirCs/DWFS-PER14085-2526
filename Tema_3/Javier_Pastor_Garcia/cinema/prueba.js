// Función para inicializar matriz parseando DOM REAL (ignora huecos)
function setup() {
  const filas = document.querySelectorAll('.fila');
  let idContador = 1;
  let butacas = [];
  
  filas.forEach((filaElement, i) => {
    const elementos = filaElement.querySelectorAll('.butacas > *'); // Todos spans/buttons en .butacas
    let fila = [];
    elementos.forEach((el) => {
      if (el.tagName === 'BUTTON' && el.classList.contains('asiento')) { // SOLO butacas reales
        fila.push({ id: idContador++, domElement: el, estado: false });
      }
      // Ignora span.hueco automáticamente
    });
    butacas.push(fila);
    console.log(`Fila ${i+1}: ${fila.length} butacas reales (huecos ignorados)`);
  });
  
  console.log('Matriz DOM-based:', butacas);
  return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);