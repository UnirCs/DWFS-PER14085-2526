const N = 10;
let butacas = [];
let selectedSeats = new Set();

document.addEventListener('DOMContentLoaded', () => {
    butacas = setup();
    renderSeats(N);

    document.getElementById('seatCount').addEventListener('input', ({ target }) => {suggest(target.value)});

});

const setup = () => {
    let nextId = 1;
    const butacas = [];

    for (let fila = 0; fila < N; fila++) {
        const nuevaFila = [];
        for (let col = 0; col < N; col++) {
            nuevaFila.push({
                id: nextId++,
                estado: false
            });
        }
        butacas.push(nuevaFila);
    }

    butacas[0][5].estado = true;
    butacas[0][6].estado = true;
    butacas[1][0].estado = true;
    butacas[1][1].estado = true;
    butacas[2][1].estado = true;
    butacas[2][2].estado = true;
    butacas[3][2].estado = true;
    butacas[3][3].estado = true;
    butacas[4][2].estado = true;
    butacas[9][3].estado = true;

    return butacas;
};

const suggest = (asientosSolicitados) => {
    asientosSolicitados = parseInt(asientosSolicitados);

    if (asientosSolicitados > N || isNaN(asientosSolicitados) || asientosSolicitados <= 0) {
        selectedSeats = new Set();
        renderSeats(N);
        return;
    }

    let idsSeleccionados = null;

    for (let filaIdx = N - 1; filaIdx >= 0 && idsSeleccionados === null; filaIdx--) {
        const fila = butacas[filaIdx];
        let libresSeguidos = 0;
        let inicioBloque = 0;

        for (let col = 0; col < N && idsSeleccionados === null; col++) {
            const asiento = fila[col];

            if (!asiento.estado) {
                libresSeguidos++;
                if (libresSeguidos === 1) inicioBloque = col;
                if (libresSeguidos === asientosSolicitados) {
                    const seleccion = new Set();
                    for (let k = inicioBloque; k < inicioBloque + asientosSolicitados; k++) {
                        seleccion.add(fila[k].id);
                    }
                    idsSeleccionados = seleccion;
                }
            } else {
                libresSeguidos = 0;
            }
        }
    }

    selectedSeats = idsSeleccionados === null ? new Set() : idsSeleccionados;
    renderSeats(N);
};

const renderSeats = (numeroButacas) => {
    const grid = document.getElementById('seatsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    for (let i = 0; i < numeroButacas; i++) {
        const row = document.createElement('div');
        row.className = 'flex justify-center items-center gap-2';

        const label = document.createElement('span');
        label.className = 'text-yellow-500 font-bold mr-2 w-16 text-right';
        label.textContent = `Fila ${i + 1}`;
        row.appendChild(label);

        for (let j = 0; j < numeroButacas; j++) {
            const asiento = butacas[i][j];
            const seat = document.createElement('div');
            seat.className = 'w-8 h-8 border-2 border-yellow-600 transition-colors';

            if (asiento.estado) {
                seat.classList.add('bg-yellow-500');
            } else if (selectedSeats.has(asiento.id)) {
                seat.classList.add('bg-green-500');
            } else {
                seat.classList.add('bg-black');
            }

            row.appendChild(seat);
        }

        grid.appendChild(row);
    }
};
