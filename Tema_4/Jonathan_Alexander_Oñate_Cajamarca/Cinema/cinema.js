// Definir el tamaño de la matriz de butacas
const N = 10 // Número de filas y columnas
// Función para crear las butacas en el DOM
function crearButacas(){
    const contenedorButacas = document.getElementById("contenedor-butacas");
    for (let i = 0; i < N; i++) {
        const filaDiv = document.createElement("div");
        filaDiv.classList.add("d-flex", "justify-content-center", "section");
        const filaParrafo = document.createElement("p");
        filaParrafo.classList.add("parrafo");
        filaParrafo.textContent = `FILA ${i + 1}`;
        filaDiv.appendChild(filaParrafo);
        for (let j = 0; j < N; j++) {
            const asientoDiv = document.createElement("div");
            asientoDiv.classList.add("asiento");
            asientoDiv.id = `asiento-${butacas[i][j].id}`;
            filaDiv.appendChild(asientoDiv);
        }
        contenedorButacas.appendChild(filaDiv);
    }
}

//ejecuta renderizarButacas al cargar el DOM
document.addEventListener("DOMContentLoaded", crearButacas);

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
console.log('butacas inicializadas');
let butacas = setup();

function suggest(numAsientos) {  
    let sugAsientos = [];  
    if (numAsientos <= 0 || numAsientos > N) {
        console.log('Sugerencia de Asientos: '+ sugAsientos.length);
        console.log(sugAsientos);
        return sugAsientos;
    }
    let colFin = N - 1;
    for(let i = colFin; i >= 0 && sugAsientos.length < numAsientos; i--){
        sugAsientos = [];
        for(let j = 0; j < N && sugAsientos.length < numAsientos; j++){
            if (!butacas[i][j].estado) {
                sugAsientos.push(butacas[i][j].id);
            } else {
                sugAsientos.splice(0);
            } 
        }
    }
    console.log('Sugerencia de Asientos: ' + sugAsientos.length);
    console.log(sugAsientos);
    return sugAsientos;
}
butacas[9][0].estado = true;
butacas[9][1].estado = true;
butacas[9][2].estado = true;
butacas[9][5].estado = true;

function preseleccionarAsientos() {
    const numAsientosInput = document.getElementById("numAsientos");
    numAsientosInput.addEventListener("input", () => {
        const numAsientos = parseInt(numAsientosInput.value);
        const sugeridos = suggest(numAsientos);
        document.querySelectorAll(".asiento").forEach(asiento => {  
            asiento.classList.remove("preseleccionado");
        });
        sugeridos.forEach(id => {
            const asientoDiv = document.getElementById(`asiento-${id}`);
            if (asientoDiv) {
                asientoDiv.classList.add("preseleccionado");
            }
        });
    });
}
//ejecuta renderizarButacas al cargar el DOM
document.addEventListener("DOMContentLoaded", preseleccionarAsientos);