// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Imprimir la tabla
function doTable() {
    let idContador = 1;
    let html = '<table><tr>';
    let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

    //Encabezado
    for (i = 0; i < N + 1; i++) {
        if (i == 0)
            html += "<th></th>";
        else
            html += `<th>${i}</th>`;
    }
    html += "</tr>";
    //Filas
    for (i = 0; i < N; i++) {
        html += "<tr>";
        //Columnas 
        html += `<td class="row">${letras[i]}</td>`;
        for (j = 0; j < N; j++) {
            html += `<td><div id="${idContador++}" class="free"></div></td>`;
        }
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("tabla").innerHTML = html;
}

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

// Inicializar la matriz
let butacas = setup();

function changeClass(idSeat) {
    document.getElementById(idSeat).className = "occupied";
}

function writeMessage(message) {
    document.getElementById("mensaje").innerHTML = message;
}

function suggest() {
    let numSeats = document.getElementById('nro_asientos').value;
    let libres = [], i = N - 1, j = 0, k = 0, consecutivos = true;
    if (numSeats === '' || numSeats === 0 || numSeats > N) {
        writeMessage(`Llene un número de asientos mayor que cero y menor a ${N}`);
    }
    else {
        writeMessage('');
        numSeats = parseInt(numSeats);
        while (i > 0 && consecutivos) {
            while (k < numSeats && j < N) {
                if (!butacas[i][j].estado) {
                    libres[k++] = butacas[i][j].id;
                }
                else {
                    k = numSeats;
                    consecutivos = false;
                }
                j++;
            }
            i = (k === numSeats) ? 0 : i - 1;
        }
        if (libres.length === numSeats) {
            libres.forEach(libre => {
                const dato = butacas.flat().find(e => e.id === libre);
                if (dato){
                    changeClass(dato.id);
                    dato.estado = true;
                }
            });
            writeMessage(libres.toString());
        }
        else {
            writeMessage('No se logró el objetivo');
        }
    }
}