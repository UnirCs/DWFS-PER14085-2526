const N = 10; 

function setup() {
    let idContador = 1;
    let matrizLocal = []; 
   
    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false 
            });
        }
        matrizLocal.push(fila);
    }
    return matrizLocal;
}


let butacas = setup();

const form = document.querySelector('.reservation-form');
const inputAsientos = document.getElementById('asientos-count');

inputAsientos.addEventListener('input', () => {
    const numElegido = parseInt(inputAsientos.value);
    
    document.querySelectorAll('.asiento').forEach(a => a.classList.remove('sugerido'));

    if (isNaN(numElegido) || numElegido <= 0) return;

    const sugerenciaIds = buscarSugerencia(numElegido);
    let sugerenciaAsientosTXT = sugerenciaIds

    .map(id =>document.querySelector(`[value="s-${id}"]`))
    .filter(elm=>elm !==null)
    .map(elm=>{
        elm.classList.add('sugerido');
        return elm.getAttribute('value');

    });
    if (sugerenciaAsientosTXT.length > 0) {
       console.log('Asientos sugeridoa: ' + sugerenciaAsientosTXT.join(', '));
        
    }
});


function buscarSugerencia(numAsientos) {
    if (numAsientos > N || numAsientos <= 0) return [];

    for (let i = N - 1; i >= 0; i--) {
        const filaActual = butacas[i];
        let sillasLibresEncontradas = [];
    
        for (let j = 0; j < N; j++) {
            const asiento = filaActual[j]; 
            
            if (asiento.estado === false) {
                sillasLibresEncontradas.push(asiento.id);
                if (sillasLibresEncontradas.length === numAsientos) {
                    return sillasLibresEncontradas;
                }
            } else {
                sillasLibresEncontradas = []; 
            }
        }
    }
    return []; 
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const numElegido = parseInt(inputAsientos.value);
    const seleccionados = buscarSugerencia(numElegido);
    
    if (seleccionados.length > 0) {
        seleccionados.forEach(id => {
           
            butacas.forEach(fila => {
                fila.forEach(asiento => {
                    if (asiento.id === id) asiento.estado = true;
                });
            });

            
            const el = document.querySelector(`[value="s-${id}"]`);
            if (el) {
                el.classList.remove('sugerido');
                el.classList.add('ocupado');
            }
        });
        console.log("Reserva realizada:", seleccionados);
    } else {
        alert("No hay asientos contiguos disponibles.");
    }
    inputAsientos.value = ''; 
});

document.addEventListener("DOMContentLoaded", () => {
    const asientos = document.querySelectorAll('.asiento');
    asientos.forEach((asiento, index) => {
        const idConsecutivo = `s-${index + 1}`;
        asiento.setAttribute('value', idConsecutivo);
    });
});