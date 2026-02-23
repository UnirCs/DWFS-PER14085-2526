const N = 10;
const BUTACAS_OCUPADAS = [5, 6, 7, 22, 23, 45, 46, 47,95,96];

let butacas = [];

function setup() {
  let id = 1;
  let butacastmp = [];
  const ocupadasSet = new Set(BUTACAS_OCUPADAS);

  for (let i = 0; i < N; i++) {
    let fila = [];
    for (let j = 0; j < N; j++) {
      const ocupada = ocupadasSet.has(id);
      fila.push({ id: id++, estado: ocupada });
    }
    butacastmp.push(fila);
  }
  return butacastmp;
}

function renderButacas() {
  const container = document.querySelector('.asiento-map');
  if (!container || !butacas.length) {
    return;
  }

  container.innerHTML = '';

  const filas = butacas.length;
  const columnas = butacas[0].length;

  for (let i = 0; i < filas; i++) {
    const filaDiv = document.createElement('div');
    filaDiv.className = 'fila';
    filaDiv.id = `F${i + 1}`;
    filaDiv.setAttribute('role', 'row');
    filaDiv.setAttribute('aria-label', `Fila ${i + 1}`);

    const titleSpan = document.createElement('span');
    titleSpan.className = 'filatitle';
    titleSpan.textContent = `Fila ${i + 1}`;
    filaDiv.appendChild(titleSpan);

    for (let j = 0; j < columnas; j++) {
      const asiento = butacas[i][j];
      const seat = document.createElement('a');
      const seatId = `F${i + 1}A${j + 1}`;

      seat.href = '#';
      seat.id = seatId;
      seat.dataset.asientoid = asiento.id;
      seat.className = 'asiento';

      if (asiento.estado) {
        seat.classList.add('blocked');
        seat.setAttribute(
          'aria-label',
          `Fila ${i + 1}, Asiento ${j + 1} no disponible`
        );
      } else {
        seat.setAttribute(
          'aria-label',
          `Fila ${i + 1}, Asiento ${j + 1} disponible`
        );
      }

      filaDiv.appendChild(seat);
    }

    container.appendChild(filaDiv);
  }
}

function suggest(cantidad) {
  if (cantidad == null) {
    const input = document.getElementById('numasientos');
    if (!input) {
      return;
    }
    const valor = parseInt(input.value, 10);
    if (isNaN(valor) || valor < 1) {
      cantidad = 0;
    } else {
      cantidad = valor;
    }
  }

  const filas = butacas.length;
  const columnas = butacas[0].length;
  let butacasresultado = new Set();

  if (cantidad > 0 && cantidad <= columnas) {
    let i = filas - 1;
    while (i >= 0 && butacasresultado.size === 0) {
      let fila = butacas[i];
      let libres = 0;
      let inicio = 0;

      let j = 0;
      while (j < columnas && butacasresultado.size === 0) {
        if (!fila[j].estado) {
          libres++;
          if (libres === cantidad) {
            for (let k = inicio; k < inicio + cantidad; k++) {
              butacasresultado.add(fila[k].id);
            }
          }
        } else {
          libres = 0;
          inicio = j + 1;
        }

        j++;
      }

      i--;
    }
  }

  const seats = document.querySelectorAll('.asiento');
  seats.forEach(seat => {
    if (!seat.classList.contains('blocked')) {
      seat.classList.remove('selected');
    }
  });

  butacasresultado.forEach(id => {
    const seat = document.querySelector(`[data-asientoid="${id}"]`);
    if (seat && !seat.classList.contains('blocked')) {
      seat.classList.add('selected');
    }
  });

  console.log("Butacas sugeridas: ", butacasresultado);
  return butacasresultado;
}

butacas = setup();
renderButacas();
console.log("Butacas iniciales: ", butacas);
