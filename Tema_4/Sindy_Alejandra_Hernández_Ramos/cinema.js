const N = 10;
let butacas = [];

function suggest(numAsientos) {
    let resultado = new Set();
    let encontrados = false;
    if (numAsientos > N || numAsientos <= 0) return resultado;
    for (let i = N - 1; i >= 0 && !encontrados; i--) {
        let consecutivos = 0;
        let idsActuales = [];
        for (let j = 0; j < N && !encontrados; j++) {
            if (!butacas[i][j].estado) {
                consecutivos++; idsActuales.push(butacas[i][j].id);
                if (consecutivos === parseInt(numAsientos)) {
                    idsActuales.forEach(id => resultado.add(id));
                    encontrados = true;
                }
            } else { consecutivos = 0; idsActuales = []; }
        }
    }
    return resultado;
}

function setupCinema() {
    let idContador = 1;
    let container = document.getElementById('asientosContainer');
    for (let i = 0; i < N; i++) {
        let fila = [];
        let divFila = document.createElement('div');
        divFila.className = 'row-seat';
        for (let j = 0; j < N; j++) {
            let id = idContador++;
            fila.push({ id: id, estado: false });
            let divAsiento = document.createElement('div');
            divAsiento.className = 'seat available';
            divAsiento.id = 'asiento-' + id; 
            divAsiento.innerText = id;
            divFila.appendChild(divAsiento);
        }
        butacas.push(fila);
        container.appendChild(divFila);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    setupCinema(); 
    document.getElementById('numAsientos').addEventListener('input', (e) => {
        document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
        let sugeridos = suggest(e.target.value);
        sugeridos.forEach(id => {
            document.getElementById('asiento-' + id).classList.add('selected');
        });
    });
});
