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

const printRow = (rowIndex) => {
  console.log(butacas[rowIndex].map(b => b.estado ? "❌" : "🟩").join(" ") + "\n");
};

suggest(11) // Demasiados asientos solicitados
suggest(10) // Toda una fila disponible

butacas[9][0].estado = true; //asiento 0,0 ocupado
butacas[9][1].estado = true; //asiento 0,1 ocupado
butacas[9][2].estado = true; //asiento 0,2 ocupado
butacas[9][3].estado = false; //asiento 0,2 ocupado
butacas[9][4].estado = true; //asiento 0,4 ocupado
butacas[9][5].estado = true; //asiento 0,5 ocupado
butacas[9][6].estado = false; //asiento 0,2 ocupado
butacas[9][7].estado = false; //asiento 0,2 ocupado
butacas[9][8].estado = true; //asiento 0,9 ocupado
butacas[9][9].estado = true; //asiento 0,9 ocupado
butacas[8][0].estado = true; //asiento 0,0 ocupado
butacas[8][1].estado = true; //asiento 0,1 ocupado
butacas[8][2].estado = true; //asiento 0,2 ocupado
printRow(9)
printRow(8)
suggest(3) // Asientos 83,84,85 disponibles

butacas[8][0].estado = true; //asiento 0,0 ocupado
butacas[8][1].estado = true; //asiento 0,1 ocupado
butacas[8][2].estado = true; //asiento 0,2 ocupado
butacas[8][3].estado = true; //asiento 0,2 ocupado
butacas[8][4].estado = true; //asiento 0,4 ocupado
butacas[8][5].estado = false; //asiento 0,5 ocupado
butacas[8][6].estado = false; //asiento 0,2 ocupado
butacas[8][7].estado = false; //asiento 0,2 ocupado
butacas[8][8].estado = true; //asiento 0,9 ocupado
butacas[8][9].estado = true; //asiento 0,9 ocupado
printRow(9)
printRow(8)
suggest(3) // Asientos 86,87,88 disponibles


