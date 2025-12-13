// Declaracion de constantes
const N = 13; // Número de columnas
const M = 5;  // Número de filas 

// Función para inicializar la matriz de butacas (modificada para que inicialice tambien la tabla del html)
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacasAux = [];
    const tbody = document.getElementById("tabla-body");

    for (let i = 0; i < M; i++) {
        // Nueva fila
        let fila = [];

        let tr = document.createElement("tr");
        // Encabezado de fila
        let th = document.createElement("th");
        th.innerText = `Fila ${i + 1}`;
        tr.appendChild(th);
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
            // DOM
            let td = document.createElement("td");
            td.id = "butaca-" + (idContador-1); // ID único para buscarlo luego
            tr.appendChild(td);
        }
        butacasAux.push(fila);
        tbody.appendChild(tr);
    }
    return butacasAux;
}

function llenarButacas(butacas) {
    // Se llenan arbitrariamente segun lo que puse en la actividad 1 y ser coherentes
    const butacasRellenas =  structuredClone(butacas);

    const butacasOcupadas = [
        [0,0],[0,1],[0,2],[0,4],[0,5],[0,6],[0,7],[0,9],[0,10],
        [1,0],[1,2],[1,7],[1,8],[1,9],[1,10],[1,11],
        [2,0],[2,1],[2,4],[2,5],[2,6],[2,10],[2,11],
        [3,7],
        [4,4],[4,5],[4,6],[4,10],[4,11]
    ];
    
    for (const [r,c] of butacasOcupadas){
        butacasRellenas[r][c].estado = true;

        const idButaca = butacasRellenas[r][c].id;
        const celdaVisual = document.getElementById("butaca-" + idButaca);
        if (celdaVisual) {
            celdaVisual.classList.add("coloreado");
        }
    }

    return butacasRellenas;
}

// Inicializacion de butacas al cargar el script
const butacas = setup()
const butacasRellenas = llenarButacas(butacas)

const miFormulario = document.getElementById('form-reservas');
miFormulario.addEventListener("input", () => {
    event.preventDefault(); 
    const inputValor = document.getElementById('num-butacas').value;
    suggest(inputValor);
});

// Funcion de sugerencia
function suggest(numAsientos) {
    const error = document.getElementById("mensaje-feedback");
    error.textContent = "";
    
    const previos = document.querySelectorAll(".preseleccionado");
    previos.forEach(el => el.classList.remove("preseleccionado"));
    
    if (numAsientos > N){
        error.textContent = `Error: El numero maximo de butacas por fila es ${N}`;
        return new Set();
    }
    if (numAsientos < 0){
        error.textContent = "Error: Por favor, introduce un numero positivo.";
        return new Set();
    }
    let set = new Set();

    for (let i = butacasRellenas.length-1; i>=0 && butacasRellenas[i].length>=numAsientos && set.size!=numAsientos; i--){
        // Esto es para que no seleccione elementos de una fila inferior como si estuvieran contiguos 
        set.clear()    
        for (let j = 0; j<butacasRellenas[i].length && set.size!=numAsientos; j++){
            butacasRellenas[i][j].estado ? set.clear() : set.add(butacasRellenas[i][j].id)
        }
    }

    if (set.size==numAsientos) {
        set.forEach(id => {
            const celda = document.getElementById("butaca-" + id);
            if(celda) celda.classList.add("preseleccionado");
        });
    }
    else {
       // FRACASO: No se encontraron ese numero de butacas juntas
       error.textContent = "Lo sentimos, no hay suficientes butacas contiguas disponibles.";
    }

    return set;
}