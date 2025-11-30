const N = 10;
let butacas = [];

function getRowName(index) {
    return String.fromCharCode(65 + index);
}

// Inicializa la matriz de butacas con IDs y estados
function setup() {
    let idContador = 1; 
    let nuevaMatriz = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false // false = libre, SALA TOTALMENTE VACÍA
            });
        }
        nuevaMatriz.push(fila);
    }
    
    // NOTA: Se han eliminado las líneas de ocupación para cumplir con la prueba onInput

    return nuevaMatriz;
}


function findContiguousSeatsInRow(fila, numAsientos) {
    let asientosContiguosLibres = 0;
    let idInicioSecuencia = -1; 
    let idsEncontrados = new Set();
    let found = false; // Flag para controlar la salida del bucle

    // El bucle se detiene si se encuentra la secuencia (found = true)
    for (let j = 0; j < N && !found; j++) { 
        const asiento = fila[j];

        if (asiento.estado === false) { // Asiento Libre
            if (asientosContiguosLibres === 0) {
                idInicioSecuencia = asiento.id; 
            }
            asientosContiguosLibres++;

            if (asientosContiguosLibres === numAsientos) {
                // Secuencia encontrada: recopila IDs y activa la bandera
                for (let k = 0; k < numAsientos; k++) {
                    idsEncontrados.add(idInicioSecuencia + k);
                }
                found = true; // Esto detendrá el bucle en la próxima iteración
            }
        } else { // Asiento Ocupado
            // Reinicia el contador
            asientosContiguosLibres = 0;
            idInicioSecuencia = -1;
        }
    }
    return idsEncontrados;
}


function suggest(numAsientos) {
    // 1. Caso límite y validación de entrada
    if (numAsientos > N || numAsientos <= 0 || isNaN(numAsientos)) {
        const result = new Set();
        console.log("Resultado de suggest:", result); // LOG REQUERIDO
        return result;
    }

    let asientosFinales = new Set();
    let foundSeats = false; // Flag para controlar la salida del bucle de filas
    
    // 2. Recorrido Inverso: Iterar filas de N-1 a 0, deteniéndose al encontrar el primer resultado.
    // El bucle se detiene si se encuentra un resultado (foundSeats = true)
    for (let i = N - 1; i >= 0 && !foundSeats; i--) {
        const fila = butacas[i];
        
        // 3. Delegar la búsqueda.
        const asientosSugeridos = findContiguousSeatsInRow(fila, numAsientos);
        
        if (asientosSugeridos.size > 0) { 
            asientosFinales = asientosSugeridos; // Almacena el resultado (el más lejano)
            foundSeats = true; // Activa la bandera para detener el bucle
        }
    }

    // 4. Se devuelve el resultado final (único punto de retorno)
    console.log("Resultado de suggest:", asientosFinales); // LOG REQUERIDO
    return asientosFinales;
}

function dibujarSala() {
    const container = document.getElementById('sala-container');
    container.innerHTML = ''; 

    butacas.forEach((fila, i) => {
        const filaDiv = document.createElement('div');
        filaDiv.className = 'mb-1 d-flex justify-content-center'; 

        const label = document.createElement('div');
        label.className = 'seat-label me-2';
        label.textContent = getRowName(i);
        filaDiv.appendChild(label);

        fila.forEach(asiento => {
            const asientoSpan = document.createElement('span');
            asientoSpan.className = 'seat';
            asientoSpan.id = `seat-${asiento.id}`; 

            const estadoClase = asiento.estado ? 'occupied' : 'available';
            asientoSpan.classList.add(estadoClase);
            
            filaDiv.appendChild(asientoSpan);
        });

        container.appendChild(filaDiv);
    });
}

function ejecutarSugerencia() {
    // 1. Limpiar selecciones anteriores
    document.querySelectorAll('.seat.selected').forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('available');
    });

    const numAsientosInput = document.getElementById('num-asientos');
    const numAsientos = parseInt(numAsientosInput.value);
    const mensajeResultado = document.getElementById('mensaje-resultado');

    if (isNaN(numAsientos) || numAsientos <= 0 || numAsientos > N) {
        mensajeResultado.className = 'alert alert-danger mt-3';
        mensajeResultado.textContent = ` Error: Introduce un número válido (1 a ${N}).`;
        return;
    }

    // 2. Ejecutar el algoritmo
    const idsSugeridos = suggest(numAsientos);

    // 3. Actualizar la interfaz
    if (idsSugeridos.size > 0) {
        mensajeResultado.className = 'alert alert-success mt-3';
        mensajeResultado.textContent = ` Asientos sugeridos: ${Array.from(idsSugeridos).join(', ')}.`;
        
        // Colorear los asientos
        idsSugeridos.forEach(id => {
            const asientoElement = document.getElementById(`seat-${id}`);
            if (asientoElement) {
                asientoElement.classList.remove('available');
                asientoElement.classList.add('selected');
            }
        });
    } else {
        mensajeResultado.className = 'alert alert-warning mt-3';
        mensajeResultado.textContent = ` No se encontraron ${numAsientos} asientos contiguos disponibles.`;
    }
}

function resetSala() {
    butacas = setup(); 
    dibujarSala();
    document.getElementById('mensaje-resultado').className = 'alert alert-info mt-3';
    document.getElementById('mensaje-resultado').textContent = 'Sala reiniciada. ¡Busca nuevos asientos!';
}

butacas = setup();
document.addEventListener('DOMContentLoaded', dibujarSala);