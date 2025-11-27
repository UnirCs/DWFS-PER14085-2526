// Configuración
const N = 10; // Número de filas y columnas

// Estado global
let butacas = [];
let asientosSugeridos = new Set();

/**
 * Inicializa la matriz de butacas
 */
function setup() {
    let idContador = 1;
    butacas = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => ({
            id: idContador++,
            estado: false // false = libre, true = ocupado
        }))
    );
    return butacas;
}

/**
 * Busca asientos consecutivos en una fila específica
 * @param {Array} fila - Fila de butacas
 * @param {number} numAsientos - Número de asientos consecutivos
 * @param {number} filaIndex - Índice de la fila
 * @returns {Set|null} Set con IDs o null
 */
function buscarEnFila(fila, numAsientos, filaIndex) {
    let consecutivos = 0;
    let inicio = -1;
    let resultado = null;
    let encontrado = false;
    let j = 0;

    while (j < N && !encontrado) {
        if (!fila[j].estado) {
            if (consecutivos === 0) inicio = j;
            consecutivos++;
            if (consecutivos === numAsientos) {
                resultado = new Set(
                    fila.slice(inicio, inicio + numAsientos).map(b => b.id)
                );
                console.log(`✅ Asientos sugeridos (Fila ${filaIndex + 1}):`, Array.from(resultado));
                encontrado = true;
            }
        } else {
            consecutivos = 0;
        }
        j++;
    }

    return resultado;
}

/**
 * Sugiere asientos consecutivos disponibles
 * @param {number} numAsientos - Número de asientos a reservar
 * @returns {Set} Set con los IDs de los asientos sugeridos
 */
function suggest(numAsientos) {
    if (numAsientos > N) {
        console.log('❌ No se pueden reservar más asientos que columnas disponibles');
        return new Set();
    }

    let resultado = new Set();
    let encontrado = false;
    let i = N - 1;

    // Buscar desde la última fila hacia adelante
    while (i >= 0 && !encontrado) {
        const asientosFila = buscarEnFila(butacas[i], numAsientos, i);
        if (asientosFila) {
            resultado = asientosFila;
            encontrado = true;
        }
        i--;
    }

    if (!encontrado) {
        console.log('❌ No hay asientos consecutivos disponibles');
    }

    return resultado;
}

/**
 * Renderiza la sala de cine en el DOM
 */
function renderizarSala() {
    const salaContainer = document.getElementById('sala');
    salaContainer.innerHTML = '';

    butacas.forEach((fila, filaIndex) => {
        const filaDiv = document.createElement('div');
        filaDiv.className = 'fila';
        
        // Etiqueta de fila
        const etiquetaFila = document.createElement('div');
        etiquetaFila.className = 'etiqueta-fila';
        etiquetaFila.textContent = String.fromCharCode(65 + filaIndex); // A, B, C...
        filaDiv.appendChild(etiquetaFila);

        fila.forEach((butaca) => {
            const butacaDiv = document.createElement('div');
            butacaDiv.className = 'butaca';
            butacaDiv.dataset.id = butaca.id;
            butacaDiv.textContent = butaca.id;

            // Aplicar clases según estado
            if (butaca.estado) {
                butacaDiv.classList.add('ocupada');
            }
            if (asientosSugeridos.has(butaca.id)) {
                butacaDiv.classList.add('sugerida');
            }

            // Click para ocupar/liberar (solo para pruebas)
            butacaDiv.addEventListener('click', () => toggleButaca(butaca.id));

            filaDiv.appendChild(butacaDiv);
        });

        salaContainer.appendChild(filaDiv);
    });
}

/**
 * Toggle estado de una butaca (para pruebas)
 */
function toggleButaca(id) {
    const fila = Math.floor((id - 1) / N);
    const columna = (id - 1) % N;
    
    butacas[fila][columna].estado = !butacas[fila][columna].estado;
    
    // Limpiar sugerencias al modificar estado
    asientosSugeridos.clear();
    document.getElementById('numAsientos').value = '';
    
    renderizarSala();
}

/**
 * Maneja el evento de cambio en el input de número de asientos
 */
function handleInputChange(event) {
    const numAsientos = parseInt(event.target.value);
    
    // Limpiar sugerencias previas
    asientosSugeridos.clear();
    
    if (numAsientos && numAsientos > 0) {
        asientosSugeridos = suggest(numAsientos);
    }
    
    renderizarSala();
}

/**
 * Ocupa asientos aleatorios para pruebas
 */
function ocuparAleatorios(cantidad = 15) {
    const totalAsientos = N * N;
    const ocupados = new Set();
    
    while (ocupados.size < Math.min(cantidad, totalAsientos)) {
        const randomId = Math.floor(Math.random() * totalAsientos) + 1;
        ocupados.add(randomId);
    }
    
    ocupados.forEach(id => {
        const fila = Math.floor((id - 1) / N);
        const columna = (id - 1) % N;
        butacas[fila][columna].estado = true;
    });
    
    renderizarSala();
}

/**
 * Resetea la sala
 */
function resetearSala() {
    setup();
    asientosSugeridos.clear();
    document.getElementById('numAsientos').value = '';
    renderizarSala();
}

/**
 * Inicialización al cargar el DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sala
    setup();
    renderizarSala();
    
    // Ocupar algunos asientos aleatorios para demostración
    ocuparAleatorios(15);
    
    // Event listener para el input
    const inputAsientos = document.getElementById('numAsientos');
    inputAsientos.addEventListener('input', handleInputChange);
    
    // Event listeners para botones
    document.getElementById('btnOcuparAleatorios').addEventListener('click', () => {
        ocuparAleatorios(15);
    });
    
    document.getElementById('btnResetear').addEventListener('click', resetearSala);
});