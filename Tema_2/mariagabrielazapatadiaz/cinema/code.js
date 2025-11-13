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

// Inicializar la matriz
let butacas = setup();

//Función para revisar butacas libres
function suggest(numSeats) {
    let libres = [], col = N - 1, row = 0, num = 0, dato, coordenada = [];
    let continuar = true, encontrado = false;
    if (0 < numSeats <= N) {
        //Pasa por las columnas
        while (col >= 0 && continuar) {
            //Pasa por cada fila hasta encontrar todos
            row = 0;
            while (num < numSeats && row < N) {
                if (!butacas[col][row].estado && num < numSeats) {
                    coordenada[num] = [col, row];
                    libres[num] = butacas[col][row].id;
                    encontrado = true;
                    num++;
                }
                row++;
            }
            if ((libres.length === numSeats) || ((libres.length < numSeats) && encontrado)) {
                continuar = false;
            }
            col--;
        }
        if (libres.length === numSeats) {
            for (let i = 0; i < coordenada.length; i++) {
                butacas[coordenada[i][0]][coordenada[i][1]].estado = true;
            }
        }
    }
    return libres;
}

//Funciones para el HTML

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
            html += `<td><div id="${idContador}" class="free">${idContador}</div></td>`;
            idContador++;
        }
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("tabla").innerHTML = html;
}

function changeClass(idSeat) {
    document.getElementById(idSeat).className = "occupied";
}

function writeMessage(message) {
    document.getElementById("mensaje").innerHTML = message;
}

function suggestH() {
    let numSeats = document.getElementById('nro_asientos').value
    numSeats = parseInt(numSeats) || 0;
    let libres = suggest(numSeats);
    writeMessage('');
    if (libres.length === numSeats) {
        for (let i = 0; i < libres.length; i++) {
            changeClass(libres[i]);
        }
        writeMessage(libres.toString());
    }
    else {
        writeMessage('No se logró el objetivo');
    }
}