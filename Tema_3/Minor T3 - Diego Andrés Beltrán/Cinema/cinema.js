const N = 10; // Número de filas y columnas

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

const suggest = (seats) => {
    let suggested_seats = [];
    if (seats <= butacas[0].length) {
        for (let i = butacas.length - 1; i >= 0 && suggested_seats.length < seats; i--) {
            for (let j = 0; j < butacas[i].length && suggested_seats.length < seats; j++) {
                if (butacas[i][j].estado === false) {
                    suggested_seats.push(butacas[i][j])
                } else {
                    suggested_seats = []
                }
            }
        }
    }


    console.log(suggested_seats)
}
