// Tamaño de la sala (N x N)
const N = 10;

// Crea la matriz de butacas
function setup() {
    let nextId = 1;
    const butacas = [];

    for (let fila = 0; fila < N; fila++) {
        const nuevaFila = [];
        for (let col = 0; col < N; col++) {
            nuevaFila.push({
                id: nextId++,
                estado: false
            });
        }
        butacas.push(nuevaFila);
    }
    console.log(`Creada la sala de ${N} filas y ${N} asientos cada una`);
    return butacas;
}

// Matriz global de butacas
const butacas = setup();

/**
 * Busca asientos contiguos en la fila más lejana posible.
 * Devuelve un Set con los ids o un Set vacío si no hay hueco.
 */
function suggest(asientosSolicitados) {
    asientosSolicitados = parseInt(asientosSolicitados);

    // Si piden más de lo que cabe en una fila, no tiene sentido buscar
    if (asientosSolicitados > N || isNaN(asientosSolicitados)) {
        const resultado = new Set();
        return resultado;
    }

    let idsSeleccionados = null; // null = no encontrado aún

    // Empieza desde la última fila (la más alejada de la pantalla)
    for (let filaIdx = N - 1; filaIdx >= 0 && idsSeleccionados === null; filaIdx--) {
        const fila = butacas[filaIdx];
        let libresSeguidos = 0;
        let inicioBloque = 0;

        for (let col = 0; col < N && idsSeleccionados === null; col++) {
            const asiento = fila[col];

            if (!asiento.estado) {
                // asiento libre
                libresSeguidos++;

                if (libresSeguidos === 1) {
                    inicioBloque = col;
                }

                if (libresSeguidos === asientosSolicitados) {
                    // Encontramos un bloque válido en esta fila
                    const seleccion = new Set();
                    for (let k = inicioBloque; k < inicioBloque + asientosSolicitados; k++) {
                        seleccion.add(fila[k].id);
                    }
                    idsSeleccionados = seleccion; // marcamos como encontrado
                }
            } else {
                // se corta la racha de libres
                libresSeguidos = 0;
            }
        }
    }

    // Si no encontró nada, idsSeleccionados seguirá siendo null
    const resultado = idsSeleccionados === null ? new Set() : idsSeleccionados;
    console.log(`Asientos sugeridos: ${Array.from(resultado).join(', ')}`);
    return resultado;
}

// Marcar algunas butacas ocupadas para probar
butacas[0][5].estado = true;
butacas[0][6].estado = true;
butacas[1][0].estado = true;
butacas[1][1].estado = true;
butacas[2][1].estado = true;
butacas[2][2].estado = true;
butacas[3][2].estado = true;
butacas[3][3].estado = true;
butacas[4][2].estado = true;
butacas[4][3].estado = true;

function renderSeats() {
    const grid = document.getElementById('seatsGrid');
    grid.innerHTML = '';

    for (let i = 0; i < N; i++) {
        const row = document.createElement('div');
        row.className = 'flex justify-center items-center gap-2';

        const label = document.createElement('span');
        label.className = 'text-yellow-500 font-bold mr-2 w-16 text-right';
        label.textContent = `Fila ${i + 1}`;
        row.appendChild(label);

        for (let j = 0; j < N; j++) {
            const asiento = butacas[i][j];
            const seat = document.createElement('div');
            seat.className = 'w-8 h-8 border-2 border-yellow-600 transition-colors';

            if (asiento.estado) {
                seat.className += ' bg-yellow-500';
            } else {
                seat.className += ' bg-black';
            }

            row.appendChild(seat);
        }

        grid.appendChild(row);
    }
}

// Initialize
renderSeats();