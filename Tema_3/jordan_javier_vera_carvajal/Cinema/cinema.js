// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

function suggest(numeroAsientosSelecionados){
   if(numeroAsientosSelecionados > butacas[0].length){
      return [];
   }
   let asientosSelecionados = 0;
   let asientosPreselecionados = [];
   for (let fila = butacas.length-1; fila >= 0 && asientosSelecionados < numeroAsientosSelecionados; fila--) {
      asientosSelecionados = 0;
      asientosPreselecionados = [];
      for (let asiento = butacas[fila].length-1; asiento >= 0 && asientosSelecionados < numeroAsientosSelecionados; asiento--){
         if(butacas[fila][asiento].estado == false){
              asientosSelecionados++;
              asientosPreselecionados.push(butacas[fila][asiento]);
         } else {
              asientosPreselecionados = [];
              asientosSelecionados = 0;
         }
      }
    } 
    console.log("Butacas segeridas: ")
    console.log(asientosPreselecionados)
    return asientosPreselecionados;
}

// Iniciar
let butacas = setup();
console.log("Inicie el script del cine")