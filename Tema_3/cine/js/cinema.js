// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Función para sugerir asientos
function suggest(numAsientos) {
    let resultado = new Set();
    let encontrado = false;

    if (numAsientos > N || numAsientos <= 0) {
        return resultado;
    }

    for (let i = butacas.length - 1; i >= 0 && !encontrado; i--) {
        const fila = butacas[i];
        let asientosConsecutivos = [];

        for (let j = 0; j < fila.length && !encontrado; j++) {

            if (!fila[j].estado) {
                asientosConsecutivos.push(fila[j].id);

                if (asientosConsecutivos.length === numAsientos) {
                    resultado = new Set(asientosConsecutivos);
                    encontrado = true; 
                }

            } else {
                asientosConsecutivos = [];
            }
        }
    }

    return resultado; 
}

// Función auxiliar para mostrar el estado de las butacas
function mostrarButacas() {
    console.log("\nEstado de butacas (O = Libre, X = Ocupado):");
    butacas.forEach((fila, index) => {
        const estados = fila.map(asiento => asiento.estado ? 'X' : 'O').join(' ');
        console.log(`Fila ${index + 1}: ${estados}`);
    });
}

// Inicializar la matriz
let butacas = setup();

// Pruebas de la función
console.log("=== PRUEBAS SISTEMA DE RESERVAS ===");

// Prueba 1: Casos inválidos
console.log("Prueba 1 - 11 asientos:", suggest(11).size);
console.log("Prueba 2 - 0 asientos:", suggest(0).size);

// Prueba 2: Reserva normal
console.log("Prueba 3 - 3 asientos:", suggest(3).size);

// Prueba 3: Ocupar asientos y probar nuevamente
butacas[9][0].estado = true;
butacas[9][1].estado = true;
butacas[9][2].estado = true;
console.log("Prueba 4 - 4 asientos (con ocupados):", suggest(4).size);

// Mostrar estado final
mostrarButacas();