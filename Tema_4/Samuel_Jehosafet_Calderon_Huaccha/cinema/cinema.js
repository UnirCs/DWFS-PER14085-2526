const N = 10;
let butacas = [];
let selectedSeats = new Set();

document.addEventListener('DOMContentLoaded', () => {
    butacas = setup();
    renderSeats(N);
    hiddenCinema();
    document.getElementById('seatCount').addEventListener('input', ({ target }) => { suggest(target.value) });

    document.getElementById('fullName').addEventListener('input', ({ target }) => { validateInput('fullName', target.value) });
    document.getElementById('user').addEventListener('input', ({ target }) => { validateInput('user', target.value) });
    document.getElementById('password').addEventListener('input', ({ target }) => { validateInput('password', target.value) });
    document.getElementById('confirmPassword').addEventListener('input', ({ target }) => { validateInput('confirmPassword', target.value) });
    document.getElementById('email').addEventListener('input', ({ target }) => { validateInput('email', target.value) });

    
    document.getElementById('userForm').addEventListener('submit', (e) => { submitForm(e) });




});

const submitForm = (event) => {

    event.preventDefault();
    const form = document.getElementById('userForm');
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    validateInput('fullName', data.fullName);
    validateInput('user', data.user);
    validateInput('password', data.password);
    validateInput('confirmPassword', data.confirmPassword);
    validateInput('email', data.email);

    const hasError = document.querySelectorAll('.error-message').length > 0;

    if (!hasError) {
        document.getElementById('content-cinema').style.display = 'block';
        document.getElementById('conten-form').style.display = 'none';

    }
}

const validateInput = (id, value) => {
    const error = validators[id](value)
    showFieldError(id, error)

}

const showFieldError = (id, message) => {
    const input = document.getElementById(id);
    const group = input.closest('.input-group');
    let errorElement = document.getElementById(id + 'Error');

    if (!message) {
        if (errorElement) errorElement.remove();
        input.classList.remove('input-error');
        group.classList.remove('has-error');
        return;
    }

    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.id = id + 'Error';
        errorElement.classList.add('error-message');
        group.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.classList.add('input-error');
    group.classList.add('has-error');
};

const validators = {
    fullName: value => {
        if (value.trim() === '') {
            return 'El nombre y apellidos son obligatorios.';
        }
        return '';
    },
    user: value => {
        if (value.trim() === '') {
            return 'El nombre de usuario es obligatorio.';
        }
        return '';
    },
    password: value => {
        if (value.trim() === '') {
            return 'La contraseña es obligatoria.';
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(value)) {
            return 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.';
        }
        return '';
    },
    confirmPassword: () => {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            return 'Las contraseñas no coinciden.';
        }
        return '';
    },
    email: value => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Por favor, introduce un email válido.';
        }
        return '';
    }
};

const hiddenCinema = () => {
    document.getElementById('content-cinema').style.display = 'none'
}

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
