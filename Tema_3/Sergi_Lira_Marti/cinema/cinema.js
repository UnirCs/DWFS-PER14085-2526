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
                estado: Boolean(Math.round(Math.random())) // Estado aleatorio
            });
            if(fila[j].estado && idContador <= 101) {
                document.getElementById('butaca_'+(idContador-1)).classList.add('ocupada');
            }
        }
        butacas.push(fila);
    }
    return butacas;
}

function suggest(asientosReq) {
    // Creamos Set vacío
    let preSelect = new Set();
    for(let i = butacas.length-1; (i >= 0) && (preSelect.size < asientosReq); i--) {
        for (let j = 0; (j < butacas[i].length) && (preSelect.size < asientosReq); j++) {
            if(!butacas[i][j].estado){ preSelect.add(butacas[i][j].id); }
            else{ preSelect.clear(); }
        }
        if(preSelect.size < asientosReq){ preSelect.clear(); }
    }
    return preSelect;
}
function crearButacas(){
    let gridAsientos = document.getElementsByClassName('grid-butacas')[0];
    for(let i = 1; i < 101; i++){
        let nuevaButaca = document.createElement('div');
        nuevaButaca.className = 'butaca';
        nuevaButaca.id = 'butaca_'+i;
        gridAsientos.appendChild(nuevaButaca);
    }
}




// Tarea principal

crearButacas();
//Creamos matriz de butacas con estados aleatorios
let butacas = setup();
document.getElementById("selector_input").oninput = function(){
    let arrayButacas = Array.from(document.getElementsByClassName('butaca'));
    for(let b in arrayButacas){
        arrayButacas[b].classList.remove('seleccionada');
    }
    let setSuggest = [...suggest(this.value)];
    for(let preS in setSuggest){
        document.getElementById('butaca_'+setSuggest[preS]).classList.add('seleccionada');
    }
}

