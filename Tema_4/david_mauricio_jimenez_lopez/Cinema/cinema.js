// Definir el tamaño de la matriz de butacas

const ASIENTOS_POR_FILA = 10; // Número de asientos por fila
const FILAS = ['A', 'B', 'C', 'D', 'E'];

// Función para inicializar la matriz de butacas
function setup() {
    let butacas = [];

    for (let i = 0; i < FILAS.length; i++) {
        let fila = [];
        for (let j = 0; j < ASIENTOS_POR_FILA; j++) {
            fila.push({
                id: `${FILAS[i]}${j + 1}`, // Formato: A1, B2, C3, etc.
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Marcar algunos asientos como ocupados (ejemplo)
butacas[0][2].estado = true;  // A3
butacas[0][3].estado = true;  // A4
butacas[0][4].estado = true;  // A10
butacas[1][4].estado = true;  // B5
butacas[1][4].estado = true;  // B6
butacas[2][4].estado = true; // C11
butacas[2][6].estado = true; // C12
butacas[3][3].estado = true;  // D4
butacas[3][5].estado = true;  // D5
butacas[3][5].estado = true;  // D5
butacas[4][3].estado = true;  // E4

/**
 * Función para generar dinámicamente la sala de cine en el DOM
 * se crean con base en el html estatico del ejercicio 3 que esta asi:  <span class="asiento asiento--disponible" data-seat="A1">1</span>
 */
function generarSala() {
    const contenedorSala = document.querySelector('.sala');
    contenedorSala.innerHTML = '';

    for (let i = 0; i < FILAS.length; i++) {

        const divFila = document.createElement('div');
        divFila.className = 'sala__fila mb-3';
        const etiquetaFila = document.createElement('span');
        etiquetaFila.className = 'sala__etiqueta-fila';
        etiquetaFila.textContent = FILAS[i];
        const rejillaAsientos = document.createElement('div');
        rejillaAsientos.className = 'sala__rejilla-asientos';
        for (let j = 0; j < ASIENTOS_POR_FILA; j++) {
            const asiento = document.createElement('span');
            const idAsiento = butacas[i][j].id;
            asiento.id = idAsiento;
            asiento.className = 'asiento';
            if (butacas[i][j].estado) {
                asiento.classList.add('asiento--ocupado');
            } else {
                asiento.classList.add('asiento--disponible');
            }

            asiento.textContent = j + 1;
            rejillaAsientos.appendChild(asiento);
        }
        divFila.appendChild(etiquetaFila);
        divFila.appendChild(rejillaAsientos);
        contenedorSala.appendChild(divFila);
    }
}

/**
 * Función para sugerir butacas disponibles
 * @param {number} numero_butacas - Número de butacas a buscar
 * @returns {Set} Set con los IDs de las butacas sugeridas
 */
function suggest(numero_butacas) {
    if (numero_butacas > FILAS.length * ASIENTOS_POR_FILA) return new Set();

    let resultado_butacas = new Set();

    // Buscar desde la última fila hacia arriba
    for (let fila = FILAS.length - 1; fila >= 0 && resultado_butacas.size < numero_butacas; fila--) {
        // Buscar de izquierda a derecha en cada fila
        for (let col = 0; col < ASIENTOS_POR_FILA && resultado_butacas.size < numero_butacas; col++) {
            // Si el asiento está disponible, agregarlo
            if (!butacas[fila][col].estado) {
                resultado_butacas.add(butacas[fila][col].id);
            }
        }
    }

    console.log('Butacas sugeridas:', resultado_butacas);
    return resultado_butacas;
}


function mostrarSugerencias(asientosSugeridos) {
    asientosSugeridos.forEach(idAsiento => {
        const asiento = document.getElementById(idAsiento);
        if (asiento && !asiento.classList.contains('asiento--ocupado')) {
            asiento.classList.remove('asiento--disponible');
            asiento.classList.add('asiento--seleccionado');
        }
    });
}


function actualizarPantallaSugeridos(resultado_butacas) {
    const pantallaAsientosSeleccionados = document.getElementById('selectedSeats');

    if (resultado_butacas.size === 0) {
        pantallaAsientosSeleccionados.innerHTML = '<span class="text-muted">Selecciona tus asientos en el mapa</span>';
    } else {
        const asientosArray = Array.from(resultado_butacas);
        const badgesHTML = asientosArray
            .map(asiento => `<span class="badge bg-warning text-dark me-1">${asiento}</span>`)
            .join('');
        pantallaAsientosSeleccionados.innerHTML = badgesHTML;
    }
}

function limpiarSugerencias() {
    const asientosSugeridos = document.querySelectorAll('.asiento--seleccionado');
    asientosSugeridos.forEach(asiento => {
        asiento.classList.remove('asiento--seleccionado');
        asiento.classList.add('asiento--disponible');
    });
}


document.addEventListener('DOMContentLoaded', function () {
    generarSala();
    const inputCantidad = document.getElementById('customSeats');

    if (inputCantidad) {
        inputCantidad.addEventListener('input', function () {
            const cantidad = parseInt(this.value);
            limpiarSugerencias();
            if (cantidad > 0 && cantidad <= ASIENTOS_POR_FILA) {
                const asientosSugeridos = suggest(cantidad);
                mostrarSugerencias(asientosSugeridos);
                actualizarPantallaSugeridos(asientosSugeridos);
            } else {
                actualizarPantallaSugeridos(new Set());
            }
        });

    }
});
