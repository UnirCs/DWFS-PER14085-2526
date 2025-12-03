document.addEventListener("DOMContentLoaded", () => {
    asignarIDsDOM();
    document.getElementById("sillas").addEventListener("input", onInputSuggest);
});

function asignarIDsDOM() {
    const asientos = document.querySelectorAll(".asiento");
    let id = 1;

    for (const asiento of asientos) {
        asiento.dataset.id = id;  
        id++;
    }
}


// Definir el tamaño de la matriz de butacas
const N = 7; // Número de filas y columnas

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

    // Considerar las butacas ocupadas que en el HTML tienen la clase 'ocupado'
    const asientosDOM = document.querySelectorAll('.asiento');
    for (const el of asientosDOM) {
        const id = Number(el.dataset.id);
        if (!Number.isNaN(id) && el.classList.contains('ocupado')) {
            const row = Math.floor((id - 1) / N);
            const col = (id - 1) % N;
            if (butacas[row]?.[col]) {
                butacas[row][col].estado = true;
            }
        }
    }

    return butacas;
}

function suggest(butacas, numButacas) {
    const N = butacas.length;

    if (numButacas > N) return new Set();

    const butacasSugeridas = new Set();
    let butacasEncontradas = false;

    for (let i = N - 1; i >= 0 && !butacasEncontradas; i--) {       
        for (let j = 0; j <= N - numButacas && !butacasEncontradas; j++) {   
            let libres = true;  
            for (let k = 0; k < numButacas && libres; k++) {   
                if (butacas[i][j + k].estado) {
                    libres = false;
                }
            }
            if (libres) { 
                for (let k = 0; k < numButacas; k++) {
                    butacasSugeridas.add(butacas[i][j + k].id);
                }
                butacasEncontradas = true;
            }
        }
    }

    console.log("Asientos sugeridos: ", butacasSugeridas);

    return butacasSugeridas;
}

function onInputSuggest() {

    limpiarSugerencias();

    let butacas = setup();
    let cantidad = Number.parseInt(document.getElementById("sillas").value);

    const sugerencias = suggest(butacas, cantidad);
    mostrarSugerencias(sugerencias);
    }

function limpiarSugerencias() {
    const asientos = document.querySelectorAll(".asiento.seleccionado");
    for (const asiento of asientos) {
        asiento.classList.remove("seleccionado");
    }
}

function mostrarSugerencias(sugerencias) {
    for (const id of sugerencias) {
        const asiento = document.querySelector(`.asiento[data-id='${id}']`);
        asiento.classList.add("seleccionado");
    } 
}

