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
                estado: false // false = libre, true = ocupado (SALA TOTALMENTE VACÍA)
            });
        }
        nuevaMatriz.push(fila);
    }
    
    // NOTA: Se han eliminado las líneas de ocupación por defecto para la prueba onInput

    return nuevaMatriz;
}

function suggest(numAsientos) {
    // 1. Caso límite: Si se pide más que el tamaño de una fila, devuelve Set vacío.
    if (numAsientos > N) {
        let result = new Set();
        // LOG DE CONSOLA REQUERIDO: Resultado para caso límite
        console.log("Resultado de suggest:", result); 
        return result;
    }

    let asientosSugeridos = new Set();
    
    // 2. Recorrido Inverso: Iterar filas de N-1 (más lejana) a 0 (más cercana).
    for (let i = N - 1; i >= 0; i--) {
        const fila = butacas[i];
        let asientosContiguosLibres = 0;
        let idInicioSecuencia = -1; 

        // 3. Recorrido de Asientos: Buscar la secuencia contigua.
        for (let j = 0; j < N; j++) {
            const asiento = fila[j];

            if (asiento.estado === false) { // Asiento Libre
                if (asientosContiguosLibres === 0) {
                    idInicioSecuencia = asiento.id; // Inicia nueva secuencia
                }
                asientosContiguosLibres++;

                // Si se encontró la cantidad requerida
                if (asientosContiguosLibres === numAsientos) {
                    // Seleccionar los IDs
                    for (let k = 0; k < numAsientos; k++) {
                        asientosSugeridos.add(idInicioSecuencia + k);
                    }
                    
                    // LOG DE CONSOLA REQUERIDO: Resultado exitoso
                    console.log("Resultado de suggest:", asientosSugeridos);
                    // Devolver inmediatamente: hemos encontrado la mejor opción (más lejana).
                    return asientosSugeridos;
                }
            } else { // Asiento Ocupado
                // Rompe la secuencia contigua, reinicia el contador.
                asientosContiguosLibres = 0;
                idInicioSecuencia = -1;
            }
        }
    }

    // 4. Si ningún asiento contiguo fue encontrado en ninguna fila.
    let result = new Set();
    // LOG DE CONSOLA REQUERIDO: Resultado vacío
    console.log("Resultado de suggest:", result);
    return result;
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
        mensajeResultado.textContent = `🚫 Error: Introduce un número válido (1 a ${N}).`;
        return;
    }

    // 2. Ejecutar el algoritmo
    const idsSugeridos = suggest(numAsientos); // suggest ya realiza el log

    // 3. Actualizar la interfaz
    if (idsSugeridos.size > 0) {
        mensajeResultado.className = 'alert alert-success mt-3';
        mensajeResultado.textContent = `✅ Asientos sugeridos: ${Array.from(idsSugeridos).join(', ')}.`;
        
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
        mensajeResultado.textContent = `❌ No se encontraron ${numAsientos} asientos contiguos disponibles.`;
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