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

// Función principal: sugiere asientos disponibles (versión compacta)
function suggest(numAsientos) {
    if (numAsientos > N) return new Set();

    for (let i = N - 1; i >= 0; i--) {
        let consecutivos = 0;
        let inicio = -1;

        for (let j = 0; j < N; j++) {
            if (!butacas[i][j].estado) {
                if (consecutivos === 0) inicio = j;
                if (++consecutivos === numAsientos) {
                    return new Set(butacas[i].slice(inicio, inicio + numAsientos).map(b => b.id));
                }
            } else {
                consecutivos = 0;
            }
        }
    }

    return new Set();
}

// Inicializar la matriz
let butacas = setup();

// ===== PRUEBAS DEL ALGORITMO =====

console.log("=== Prueba 1: Solicitar 3 asientos en sala vacía ===");
let resultado1 = suggest(3);
console.log("Asientos sugeridos:", resultado1);

console.log("\n=== Prueba 2: Ocupar algunos asientos y volver a buscar ===");
// Ocupar algunos asientos en la última fila
butacas[9][5].estado = true;
butacas[9][6].estado = true;
butacas[9][7].estado = true;
let resultado2 = suggest(5);
console.log("Asientos sugeridos:", resultado2);

console.log("\n=== Prueba 3: Solicitar más asientos de los que caben en una fila ===");
let resultado3 = suggest(15);
console.log("Asientos sugeridos:", resultado3);
console.log("¿Set vacío?", resultado3.size === 0);

console.log("\n=== Prueba 4: Ocupar varias filas y buscar en fila anterior ===");
// Ocupar casi toda la fila 9
for (let j = 0; j < 9; j++) {
    butacas[9][j].estado = true;
}
// Ocupar parte de la fila 8
butacas[8][0].estado = true;
butacas[8][1].estado = true;
let resultado4 = suggest(4);
console.log("Asientos sugeridos:", resultado4);

console.log("\n=== Prueba 5: No hay espacio suficiente en ninguna fila ===");
// Ocupar todas las filas dejando solo 2 asientos libres consecutivos máximo
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 2; j++) {
        butacas[i][j].estado = true;
    }
}
let resultado5 = suggest(3);
console.log("Asientos sugeridos:", resultado5);
console.log("¿Set vacío?", resultado5.size === 0);

// Función auxiliar para visualizar el estado de la sala
function mostrarSala() {
    console.log("\n=== Estado de la Sala ===");
    console.log("(PANTALLA)");
    for (let i = 0; i < N; i++) {
        let fila = `Fila ${i + 1}: `;
        for (let j = 0; j < N; j++) {
            fila += butacas[i][j].estado ? "[X]" : "[ ]";
        }
        console.log(fila);
    }
}

mostrarSala();