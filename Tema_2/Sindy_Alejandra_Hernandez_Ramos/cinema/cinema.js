const N = 10; 

function setup() {
    let idContador = 1; 
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false 
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

let butacas = setup();

function suggest(numAsientos) {
    let resultado = new Set();
    let encontrados = false; 

    if (numAsientos > N || numAsientos <= 0) {
        return resultado;
    }
   
    for (let i = N - 1; i >= 0 && !encontrados; i--) {
        let fila = butacas[i];
        let consecutivos = 0;
        let idsActuales = [];

       
        for (let j = 0; j < N && !encontrados; j++) {
            if (!fila[j].estado) {
                consecutivos++;
                idsActuales.push(fila[j].id);

                if (consecutivos === numAsientos) {
                    idsActuales.forEach(id => resultado.add(id));
                    encontrados = true; 
                }
            } else {
               
                consecutivos = 0;
                idsActuales = [];
            }
        }
    }

    return resultado;
}

