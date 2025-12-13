document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('num').addEventListener('change', () => {
        actualizarSeleccion(document.getElementById('num').value);
    });

    const asientos = document.querySelectorAll('.butaca');

    asientos.forEach((butaca) => {
        butaca.addEventListener('click', seleccButaca);
    });

});

function actualizarSeleccion(seleccion) {
    const butacasLibres = document.querySelectorAll('.butaca');
    const butacasSeleccionadas = document.querySelectorAll('.seleccionada');
    let nAsientos = document.getElementById('num');

    if (seleccion < 0 || seleccion > butacasLibres.length) {
        nAsientos.classList.add('error');
        nAsientos.value = butacasSeleccionadas.length;
        nAsientos.setCustomValidity('El valor no puede ser negativo o superior a ' + butacasLibres.length);
        nAsientos.reportValidity();
        return;
    } else {
        nAsientos.classList.remove('error');
        nAsientos.setCustomValidity('');
    }

    seleccion = Number.parseInt(seleccion);

    nAsientos.value = seleccion;

    const diferencia = seleccion - butacasSeleccionadas.length;

    if (diferencia > 0) {
        for (let i = 0; i < diferencia; i++) {
            let butaca = butacasLibres[butacasLibres.length - 1 - i];
            if (butaca) {
                butaca.classList.remove('butaca');
                butaca.classList.add('seleccionada');
            }
        }
    }

    else if (diferencia < 0) {
        const quitar = Math.abs(diferencia);
        for (let i = 0; i < quitar; i++) {
            let butaca = butacasSeleccionadas[i];

            if (butaca) {
                butaca.classList.remove('seleccionada');
                butaca.classList.add('butaca');
            }
        }
    }
}

function seleccButaca(event) {
    const butacaSelecc = event.target;

    if (butacaSelecc.classList.contains('butaca')) {
        butacaSelecc.classList.remove('butaca');
        butacaSelecc.classList.add('seleccionada');
    }

    else if (butacaSelecc.classList.contains('seleccionada')) {
        butacaSelecc.classList.remove('seleccionada');
        butacaSelecc.classList.add('butaca');
    }

    document.getElementById('num').value = document.querySelectorAll('.seleccionada').length;
}