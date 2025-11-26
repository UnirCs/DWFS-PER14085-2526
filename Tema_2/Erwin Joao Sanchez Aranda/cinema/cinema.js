// Función para inicializar la matriz de butacas
function setup() {
    let idRow = "A";
    let butacas = [];

    for (let i = 0; i < rowSize; i++) {
        // Nueva fila
        let idColumn = 1
        let fila = [];
        for (let j = 0; j < columnSize; j++) {
            // Nuevo asiento
            fila.push({
                id: idRow + idColumn,
                estado: false // Estado inicial libre
            });
            idColumn += 1;
        }
        idRow = String.fromCharCode(idRow.charCodeAt() + 1);

        butacas.push(fila);
    }
    return butacas;
}

function butacasOccupiedByDefault(butacasToModify){
    const occupiedButacas=
        new Set(["A4","B1","B2","B3","B7","C3","C7","F6","H8","J3","J5","I5","D8","E8","G8"]);

    return butacasToModify.map(row =>
        row.map( seat => occupiedButacas.has(seat.id)
            ? { ...seat, estado: true }
            : seat)
    )
}

function reserveButacas(butacasToReserve, numberButacasToReserve){
    let butacasReadyToReserve = [];
    let flagToContinue = true;
    for (let i = rowSize - 1; i >=0 && flagToContinue; i--) {
        let groupButacas = 0;
        let butacasTogether = [];

        for (let j = 0; j < columnSize && flagToContinue; j++) {
            if (!butacasTogether[groupButacas]) {
                butacasTogether[groupButacas] = [];
            }

            if (!butacasToReserve[i][j].estado) {
                butacasTogether[groupButacas].push({id: butacasToReserve[i][j].id, estado: butacasToReserve[i][j].estado});
                if (butacasTogether[groupButacas].length===numberButacasToReserve) {
                    flagToContinue = false;
                }
            }
            else {
                groupButacas+=1;
            }
        }
        butacasReadyToReserve = butacasTogether.filter( group => group.length >= numberButacasToReserve)
        if (butacasReadyToReserve.length > 0) {
            flagToContinue = false;
        }
    }
    return butacasReadyToReserve;
}

function suggest(numberButacasToReserve) {
    if (numberButacasToReserve <= 0 ) {
        console.log("El numero de asientos solicitados debe ser 1 o más.");
        return new Set();
    }

    if (numberButacasToReserve > columnSize ) {
        console.log("El numero de asientos solicitados excede el tamaño maximo de la fila.");
        return new Set();
    }

    let butacasReserved = reserveButacas(availableButacas,numberButacasToReserve);
    if (butacasReserved.length === 0) {
        console.log("No hay suficientes asientos disponibles juntos.");
        return new Set();
    }
    else {
        return butacasReserved;
    }
}

function butacasPostReserve(butacasSelectedByCustomer){
    let idSet = new Set(butacasSelectedByCustomer.flat().map(row => row.id));
    return availableButacas.map(row =>
        row.map( seat => idSet.has(seat.id)
        ?   {...seat, estado: true }
        : seat))
}

function printButacas(butacasToPrint) {
    if (butacasToPrint instanceof Set && butacasToPrint.size === 0){
        console.log(butacasToPrint);
    }
    else {
        for (let row = 0; row< butacasToPrint.length; row++ ) {
            let showRow = "";
            for(let col = 0; col < butacasToPrint[row].length; col++) {
                const seat = butacasToPrint[row][col];

                const color = seat.estado ? "\x1b[31m" : "\x1b[32m";  // rojo | verde
                const reset = "\x1b[0m"; // resetear color
                showRow += `[${butacasToPrint[row][col].id},${color}▇${reset}]`;
            }
            console.log(showRow);
        }
    }
}


// ================ SECCIÓN DE EJECUCIONES ========================= //
// Definir el tamaño de la matriz de butacas
const rowSize = 10; // Número de filas
const columnSize = 8; // Número de columnas
const numToReserveFirstClient = 1 // Número de Butacas deseadas del primer cliente
const numToReserveSecondClient = 5 // Número de Butacas deseadas del segundo cliente

console.log("\n========== BUTACAS VACIAS ==========");
let initialButacas = setup();
printButacas(initialButacas);

console.log("\n========== BUTACAS RESERVADAS POR DEFECTO ==========");
let availableButacas = butacasOccupiedByDefault(initialButacas);
printButacas(availableButacas)

console.log("\n========== BUTACAS RESERVADAS POR PRIMER CLIENTE  ==========");
let suggestedButacas = suggest(numToReserveFirstClient);
printButacas(suggestedButacas)

if (suggestedButacas.length>0) {
    console.log("\n========== BUTACAS POST RESERVA DEL PRIMER CLIENTE  ==========");
    availableButacas = butacasPostReserve(suggestedButacas);
    printButacas(availableButacas)
}

console.log("\n========== BUTACAS RESERVADAS POR SEGUNDO CLIENTE  ==========");
suggestedButacas = suggest(numToReserveSecondClient);
printButacas(suggestedButacas)

if (suggestedButacas.length>0) {
    console.log("\n========== BUTACAS NUEVA POST RESERVA DEL SEGUNDO CLIENTE  ==========");
    availableButacas = butacasPostReserve(suggestedButacas);
    printButacas(availableButacas)
}