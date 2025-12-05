const N = 10; 

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

let butacas = setup();

console.log(butacas);


const form = document.querySelector('.reservation-form');
const inputAsientos = document.getElementById('asientos-count');

// 2. Escuchar el evento 'submit' en el formulario
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const valorIngresado = inputAsientos.value; 
    const numElegido = parseInt(valorIngresado);
        if (inputAsientos.value === '') {
            console.log("Número de asientos solicitado por el usuario no es valido");
            
        }else{
            console.log("Número de asientos solicitado por el usuario:", numElegido);
            console.log(butacas);
        }
    inputAsientos.value = ''; 

    seleccionarButacas(numElegido)
});



function seleccionarButacas(numAsientos) {
     if (numAsientos > N) {
        return new Set();
    }

    for (let i = N -1; i>= 0; i-- ) {
        const filaActual = butacas[i];
        let sillasLibres = 0;
        let inicioBloque = -1; 
    
    for (let j = 0; j < N; j++) {
        
        const asiento = filaActual[j];
        if (asiento.estado === false) {
            // El asiento está libre
            if (sillasLibres === 0) {
                inicioBloque = j; 
            }
            sillasLibres++;
            
            if (sillasLibres === numAsientos) {
                const butacasSeleccionadas = new Set();
                for(let k = 0; k <numAsientos; k++ ){
                    const asientoReservar = filaActual[inicioBloque + k];
                    asientoReservar.estado = true;
                    butacasSeleccionadas.add(asientoReservar.id);
                }
                return butacasSeleccionadas;
            }
            } else {
            sillasLibres = 0;
            inicioBloque = -1; 
            }
        }
    }
   
   return new Set()

}