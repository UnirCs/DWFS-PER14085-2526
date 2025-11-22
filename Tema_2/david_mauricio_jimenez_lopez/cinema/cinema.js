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


// Función para escoger butacas
// SI bien el enunciado menciona "pre-seleccionados", voy a asumir que de una vez quedan seleccionados
function suggest(numero_butacas) {
    if (numero_butacas > N) return new Set();
    let resultado_butacas = new Set();
    for (let fila = N - 1; fila >= 0 && resultado_butacas.size === 0; fila--) {
        for (let col = 0; col <= N - numero_butacas && resultado_butacas.size === 0; col++) {
            let butacas_concecutivas = butacas[fila].slice(col, col + numero_butacas);
            if (butacas_concecutivas.every(butaca => !butaca.estado)) {
                // Aquí marco asientos como ocupados para que en la proxima busqueda sean descartados
                butacas_concecutivas.forEach(butaca => butaca.estado = true);
                resultado_butacas = new Set(butacas_concecutivas.map(butaca => butaca.id));
            }
        }
    }
    return resultado_butacas;
}

// Inicializar la matriz
let butacas = setup();
// Imprimir la matriz
console.log(butacas);

// ALgunas butacas ya ocupadas
butacas[9][0].estado = true;
butacas[9][1].estado = true;
butacas[8][5].estado = true;



//debe devolver 93-94-95
console.log("Sugerencia para 3 asientos:", suggest(3));

//debe irse a la fila 7 ya que hay uno ocupado en toda la mitad d ela fila 8
console.log("Sugerencia para 8 asientos:", suggest(8));

//ebe irse a la fila 6 ya que la 7 tiene ocupados 8 butacas
console.log("Sugerencia para 8 asientos:", suggest(9));


//ebe irse a la fila 9 ya que solo tiene 5 ocupadas
console.log("Sugerencia para 8 asientos:", suggest(2));

// Debe devolver vacio ya que cada fila es de 10
console.log("Sugerencia para 15 asientos:", suggest(15)); 