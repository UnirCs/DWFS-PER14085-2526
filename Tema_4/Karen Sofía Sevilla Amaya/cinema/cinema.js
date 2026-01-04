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
             let estadoInicial = false;


             if (idContador === 100) {
                estadoInicial = true;
            }
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: estadoInicial // Estado inicial libre

                
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializa la matriz
let butacas = setup();



// Asigna IDs dinámicos al DOM y pintar butaca 50 ocupada
document.addEventListener("DOMContentLoaded", function () {
    let idContador = 1;

    document.querySelectorAll(".fila").forEach((filaDiv, filaIndex) => {
        const columnas = filaDiv.querySelectorAll(".col");

        columnas.forEach((colDiv, colIndex) => {
            colDiv.id = "butaca-" + butacas[filaIndex][colIndex].id;
            colDiv.dataset.fila = filaIndex;
            colDiv.dataset.columna = colIndex;

            // Pintar visualmente la butaca 50 ocupada
            if (idContador === 100) {
                colDiv.classList.add("ocupada");
            }

            idContador++;
        });
    });

     //  Botón Reservar
    const btn = document.getElementById("btnReservar");

    btn.addEventListener("click", function () {
        const sugeridos = document.querySelectorAll(".col.sugerida");

        if (sugeridos.length === 0) {
            alert("No hay asientos sugeridos para reservar.");
            return;
        }

        sugeridos.forEach(div => {
            div.classList.remove("sugerida");
            div.classList.add("ocupada");

            const filaIndex = parseInt(div.dataset.fila);
            const colIndex = parseInt(div.dataset.columna);

            butacas[filaIndex][colIndex].estado = true;
        });

        alert("Asientos reservados con éxito.");
    });
});

//funcion SUGGEST

function suggest(cantidad) {

    // Limpiar sugerencias anteriores
    document.querySelectorAll(".col").forEach(c => c.classList.remove("sugerida"));

    if (isNaN(cantidad) || cantidad < 1) {
        alert('Ingrese un número válido (mínimo 1).');
        return [];
    }

    let sugeridos = [];
    let restante = cantidad;

    // Tomar todas las butacas libres
    let todasButacas = [];
    document.querySelectorAll(".col").forEach(colDiv => {
        const filaIndex = parseInt(colDiv.dataset.fila);
        const colIndex = parseInt(colDiv.dataset.columna);

        if (!butacas[filaIndex][colIndex].estado) {
            todasButacas.push({
                fila: filaIndex,
                col: colIndex,
                id: butacas[filaIndex][colIndex].id
            });
        }
    });

    // Orden descendente por ID
    todasButacas.sort((a, b) => b.id - a.id);

    // Inicializar contador de asientos libres por fila
    const N = document.querySelectorAll(".fila").length;
    let filaLibres = {};
    for (let f = 0; f < N; f++) filaLibres[f] = 0;

    todasButacas.forEach(b => {
        filaLibres[b.fila]++;
    });

    // Contador de asientos sugeridos por fila
    let sugeridosPorFila = {};
    for (let f = 0; f < N; f++) sugeridosPorFila[f] = 0;

    // Recorrer todas las butacas libres
    let i = 0;
    while (restante > 0 && i < todasButacas.length) {
        const b = todasButacas[i];

        // Verificar si este es el último asiento a asignar
        // y si sería el único sugerido en esa fila
        if (restante === 1 && sugeridosPorFila[b.fila] === 0) {
            alert("No se puede sugerir el último asiento como único en la fila " + (b.fila + 1));
            sugeridos = [];
            i = todasButacas.length; // salir del ciclo
        }

        // Caso válido: asignar asiento
        else {
            sugeridos.push(b);
            filaLibres[b.fila]--;
            sugeridosPorFila[b.fila]++;
            restante--;
            i++;
        }
    }

    // Pintar en el DOM
    sugeridos.forEach(s => {
        const div = document.getElementById("butaca-" + s.id);
        if (div) div.classList.add("sugerida");
        else console.error("No se encontró el div para la butaca con ID:", s.id);
    });

    if (sugeridos.length < cantidad) {
        console.log("No hay suficientes asientos disponibles sin dejar un asiento aislado.");
    } else {
        console.log("Asientos sugeridos:", sugeridos.map(a => a.id).join(", "));
    }

    return sugeridos;
}


