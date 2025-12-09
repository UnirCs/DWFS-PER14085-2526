// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

let seleccionadas = [];

// Funcion para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];
    let butacasimagen = document.getElementById("butacas");

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        let filaButaca = '<div class="row p-2" name="' + i + '">';
        for (let j = 0; j < N; j++) {
            let valor = Math.floor(Math.random() * 100) + 1;
            let estado = false;
            if (valor % 2 === 0) {
                estado = true;
            }
            // Nuevo asiento
            filaButaca +=
                '<div class="col" estado="' +
                estado +
                '" name="' +
                idContador +
                '" id="' +
                idContador +
                '">' +
                idContador +
                "</div>";
            fila.push({
                id: idContador++,
                estado: estado, // Estado inicial libre
            });
        }
        filaButaca += "</div>";
        butacasimagen.innerHTML += filaButaca;
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

function Reservar() {
    if (seleccionadas.length !== 0) {
        for (let valor of seleccionadas) {
            document.getElementById(valor).className = document
                .getElementById(valor)
                .className.replace(" pendiente", "");
        }
    }
    let numeroButacasSeleccionadas = document.getElementById(
        "numeroButacasSeleccionadas"
    ).value;
    console.log(numeroButacasSeleccionadas);

    seleccionadas = suggest(Number.parseInt(numeroButacasSeleccionadas));
    let mensaje = "Las butacas seleccionadas son : ";
    for (let valor of seleccionadas) {
        mensaje += valor + " ";
        document.getElementById(valor).className += " pendiente";
    }
    console.log(mensaje);
}

function suggest(numeroButacasSeleccionadas) {
    seleccionadas = [];
    if (numeroButacasSeleccionadas > N) {
        return seleccionadas;
    }

    for (let i = 0; i < N; i++) {
        let contador = 0;
        let auxSeleccionadas = [];
        for (let j = 0; j < N && contador !== numeroButacasSeleccionadas; j++) {
            if (butacas[i][j].estado === false) {
                contador++;
                auxSeleccionadas.push(butacas[i][j].id);
            } else {
                contador = 0;
                auxSeleccionadas = [];
            }
        }
        if (contador === numeroButacasSeleccionadas) {
            seleccionadas = auxSeleccionadas;
        }
    }
    return seleccionadas;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("numeroButacasSeleccionadas").addEventListener("change", Reservar);
});