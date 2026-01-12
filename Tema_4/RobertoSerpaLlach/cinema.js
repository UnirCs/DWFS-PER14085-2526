const filasDOM = document.querySelectorAll(".fila");
const N = 10; // número de filas y columnas

// ================================
// Inicializar matriz lógica
// ================================
function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false // false = libre
            });
        }
        butacas.push(fila);
    }

    return butacas;
}

let butacas = setup();

// ================================
// Asignar IDs dinámicamente al DOM
// ================================
filasDOM.forEach((filaDOM, i) => {
    const sillas = filaDOM.querySelectorAll(".silla");

    sillas.forEach((silla, j) => {
        const id = butacas[i][j].id;
        silla.dataset.id = id;
        silla.id = `silla-${id}`;
    });
});

// ================================
// Limpiar sugerencias anteriores
// ================================
function limpiarSugerencias() {
    document.querySelectorAll(".silla.sugerido").forEach(silla => {
        silla.className = "silla libre";
    });
}


document.getElementById('texto').addEventListener('input', () => {
    suggest(8);
});


// ================================
// Sugerir asientos contiguos
// ================================
function suggest(n) {
    limpiarSugerencias();

    let resultado = new Set();

    // Si pide más asientos de los que caben en una fila
    if (n > N) return resultado;

    let encontrado = false;

    for (let i = 0; i < N && !encontrado; i++) {
        let c = 0;

        for (let j = 0; j < N; j++) {
            if (!butacas[i][j].estado) {
                c++;
            } else {
                c = 0;
            }

            if (c === n) {
                // IDs lógicos
                resultado = new Set(
                    butacas[i]
                        .slice(j - n + 1, j + 1)
                        .map(a => a.id)
                );

                // Cambio visual en el DOM
                for (let k = j - n + 1; k <= j; k++) {
                    const sillaDOM = filasDOM[i]
                        .querySelectorAll(".silla")[k];

                    if (sillaDOM) {
                        sillaDOM.className = "silla sugerido";
                    }
                }

                encontrado = true;
                break;
            }
        }
    }
    console.log(filasDOM[0].querySelectorAll(".silla").length);
    return resultado;
}