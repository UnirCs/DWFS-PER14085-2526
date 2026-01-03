// // Definir el tamaño de la matriz de butacas
// const N = 20; // Número de Filas
// const M = 30; // Número de Columnas

// // Función para inicializar la matriz de butacas
// function setup() {
//     let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
//     let butacas = [];

//     for (let i = 0; i < N; i++) {
//         // Nueva fila
//         let fila = [];
//         for (let j = 0; j < M; j++) {
//             // Nuevo asiento
//             fila.push({
//                 id: idContador++,
//                 estado: false // Estado inicial libre
//             });
//         }
//         butacas.push(fila);
//     }
//     return butacas;
// }

// // Inicializar la matriz
// let butacas = setup();

// // Imprimir la matriz
// // console.log(butacas);


// function suggest(NumAsientos) {
//     let resultado =  new Set();
//     let encuentra = false;
    
//     if (NumAsientos > M) {
//         console.log("Petición mayor que el número de asiento de la fila, se devuelve vacío");
//         console.log('Set resultado:', resultado);
//         return resultado;
//     }

//     for (let i = N - 1; i >= 0 && !encuentra; i--) {
//         let LibresSeguidos = 0;
//         let InicioSeguidos = 0;
//         //console.log("Fila " + i);
//         for (let j = 0; j < M && !encuentra; j++) {
//             const asiento = butacas[i][j];
//             //console.log("Columna " + j + " libres seguidos = " + LibresSeguidos);
//             if (asiento.estado === false) {
//                 LibresSeguidos++;
//                 //console.log("Libres seguidos = " + LibresSeguidos + " busco " + NumAsientos);
                
//                 if (LibresSeguidos === NumAsientos) {
//                     const aux = new Set();
//                     for (let k = InicioSeguidos; k <= j; k++) {
//                         aux.add(butacas[i][k].id);
//                     }
//                     resultado = aux;
//                     encuentra = true;
//                 }
//             } else {
//                 LibresSeguidos = 0;
//                 InicioSeguidos = j + 1;
//             }
//         }       
//     }
//     console.log('Set resultado:', resultado);
//     return resultado;  
// }



// La función setup la he tenido que modificar, ya que se me ocurrió la "genial" idea de hacer un diseño inicial con huecos, simulando los pasillos
// Para identificar mejor los asientos, he segudio la nomenclatura de 0101, los primeros dos digitos sería la fila y los dos siguientes dígitos la butaca y contando los huecos, para mí es más facil esta nomenclatura de identificación.
function setup() {
    const filas = document.querySelectorAll('.fila');
    console.log("Total filas detectadas: " + filas.length);
    let butacas = [];
    
    // Ciclo for de las filas
    for(let i = 0; i < filas.length; i++) {
        const auxfila = filas[i];
        const todosElementos = Array.from(auxfila.querySelectorAll('.butacas > *'));
        let fila = [];
        let posicionVisual = 0;
        
        // Ciclo for de todos los elementos de la fila (huecos + asientos)
        for(let j = 0; j < todosElementos.length; j++) {
            const columna = todosElementos[j];
            posicionVisual++;
            
            // saltamos si es span, entramos si es button
            if (columna.tagName === 'BUTTON' && columna.classList.contains('asiento')) {
                const filaNum = String(i + 1).padStart(2, '0');
                const asientoNum = String(posicionVisual).padStart(2, '0');
                const asientoId = filaNum + asientoNum; // Concatenación
                
                fila.push(asientoId);
            }
        }
        
        butacas.push(fila);
        console.log("Fila: " + (i+1));
        console.log("Numero de asientos que salen: " + fila.length);
        for(let k = 0; k < fila.length; k++) {
            console.log(fila[k]);
        }
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
// console.log(butacas);


function suggest(NumAsientos) {
    let resultado = new Set();
    let encuentra = false;
    
    const maxPorFila = Math.max(...butacas.map(fila => fila.length));
    if (NumAsientos > maxPorFila) {
        console.log(`Petición mayor que max asientos/fila (${maxPorFila}), se devuelve vacío`);
        console.log('Set resultado:', resultado);
        return resultado;
    }

    for (let i = butacas.length - 1; i >= 0 && !encuentra; i--) {
        const numColFila = butacas[i].length;
        let LibresSeguidos = 0;
        
        for (let j = 0; j < numColFila && !encuentra; j++) {
            const asiento = butacas[i][j];
            
            if (asiento.estado === false) {
                LibresSeguidos++;
                
                if (LibresSeguidos >= NumAsientos) {
                    const aux = new Set();
                    for (let k = j - NumAsientos + 1; k <= j; k++) {
                        aux.add(butacas[i][k].id);
                    }
                    resultado = aux;
                    encuentra = true;
                }
            } else {
                LibresSeguidos = 0;
            }
        }       
    }
    console.log('Set resultado:', resultado);
    return resultado;  
}

function handleInputChange() {
    const numInput = document.getElementById('numero');
    const num = parseInt(numInput.value) || 0;
    if (num > 0) {
        suggest(num);
    }
}






