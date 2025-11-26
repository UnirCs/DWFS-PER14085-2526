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

function suggest(nSeats) {
    const result = new Set();

    if (nSeats > N) {
        console.log(result);
        return result;
    }

    for (let i = N - 1; i >= 0; i--) {
        const fila = butacas[i];
        let consecutivos = 0;
        let idsPosibles = [];

        for (let j = 0; j < N; j++) {
            if (!fila[j].estado) {
                consecutivos++;
                idsPosibles.push(fila[j].id);
            } else {
                consecutivos = 0;
                idsPosibles = [];
            }

            if (consecutivos === nSeats) {
                idsPosibles.forEach(id => result.add(id));
                console.log(result);
                return result;
            }
        }
    }

    console.log(result);
    return result;
}

// Exportar para uso en navegador y pruebas
if (typeof window !== 'undefined') {
    window.setup = setup;
    window.suggest = suggest;
    window.butacas = butacas;
}
