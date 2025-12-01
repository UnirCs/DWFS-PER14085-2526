class Seat {
    constructor(id, state)
    {
        this.id = id;
        this.estado = state;
    }
}

const N = 10;
function setup() {
    let idContador = 1;
    let butacas = [];
    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            let state = false;
            fila.push({
                id: idContador++,
                estado: state,
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

let butacas = setup();

function checkRowAvailable(row, num)
{
    if (row.length < num)
    {
        return -1;
    }

    for (let j = 0; j <= row.length - num; j++)
    {
        let free = true;
        for (let k = 0; k < num; k++)
        {
            const seat = row[j + k];
            if (seat.estado)
            {
                free = false;
                j = j + k;
                k = num;
            }
        }

        if (free)
        {
            return j;
        }
    }
    return -1;
}

function suggest(seats) {
    let finalSet = new Set();
    const bookingSeats = parseInt(seats, 10);

    if (isNaN(bookingSeats) || bookingSeats <= 0) {
        return finalSet;
    }

    if(bookingSeats > butacas[0].length) return finalSet;

    for (let i = butacas.length - 1; i >= 0; i--) {
        const fila = butacas[i];
        const startIndex = checkRowAvailable(fila, bookingSeats);

        if (startIndex !== -1) {
            for(let k = 0; k < bookingSeats; k++) {
                const seat = fila[startIndex + k];
                finalSet.add(seat.id);
            }
            console.log("Asientos sugeridos:", Array.from(finalSet));
            return finalSet;
        }
    }
    return finalSet;
}

function bookSeats(seats) {
    let seatsSet = suggest(seats);
    let freeSeats = Array.from(seatsSet);
    const maxSeats = N;

    for (let i = 0; i < freeSeats.length; i++) {
        const seatId = freeSeats[i];
        let seatName = getIdBySeat(seatId);
        const seat = document.getElementById(seatName);

        const baseIndex = seatId - 1;
        const rowIndex = Math.floor(baseIndex / maxSeats);
        const colIndex = baseIndex % maxSeats;

        if (butacas[rowIndex] && butacas[rowIndex][colIndex]) {
            butacas[rowIndex][colIndex].estado = true;
        }

        if (seat) {
            seat.classList.replace("seats__available", "seats__reserved");
        }
    }
}

function getIdBySeat(seatId)
{
    const N = 10;

    if (typeof seatId !== 'number' || seatId < 1 || seatId > N * N) {
        return null;
    }
    const baseIndex = seatId - 1;
    const rowNum = Math.floor(baseIndex / N) + 1;
    const colIndex = baseIndex % N;
    const colLetter = String.fromCharCode('A'.charCodeAt(0) + colIndex);
    return rowNum.toString() + colLetter;
}

function changeView(viewIdToShow) {
    const allViews = ['user', 'cinema'];
    for (const id of allViews)
    {
        const viewElement = document.getElementById(id);
        if (viewElement)
        {
            if (id === viewIdToShow)
            {
                viewElement.classList.remove('hidden');
            }
            else
            {
                viewElement.classList.add('hidden');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fullName').addEventListener('change', validateFullName);
    document.getElementById('username').addEventListener('change', validateUsername);
    document.getElementById('password').addEventListener('change', validatePassword);
    document.getElementById('confirmPassword').addEventListener('change', validateConfirmPassword);
    document.getElementById('email').addEventListener('change', validateEmail);
});

const createErrorMessage = (id, message) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (!existingMessage) {
        let errorMessage = document.createElement('p');
        errorMessage.id = id + 'Error';
        errorMessage.textContent = message;
        errorMessage.classList.add('error');

        const inputParentDiv = document.getElementById(id).closest('.input-field');
        if (inputParentDiv) {
            inputParentDiv.appendChild(errorMessage);
        } else {
            document.getElementById(id).insertAdjacentElement('afterend', errorMessage);
        }
    }
};

const removeErrorMessage = (id) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (existingMessage) {
        existingMessage.remove();
    }
};

const validateFullName = () => {
    let fullName = document.getElementById('fullName').value;
    if (fullName.trim() === '') {
        createErrorMessage('fullName', 'El nombre y apellidos son obligatorios.');
    } else {
        removeErrorMessage('fullName');
    }
};

const validateUsername = () => {
    let username = document.getElementById('username').value;
    if (username.trim() === '') {
        createErrorMessage('username', 'El nombre de usuario es obligatorio.');
    } else {
        removeErrorMessage('username');
    }
};

const validatePassword = () => {
    let password = document.getElementById('password').value;
    let passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
        createErrorMessage('password', 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.');
    } else {
        removeErrorMessage('password');
    }
};

const validateConfirmPassword = () => {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        createErrorMessage('confirmPassword', 'Las contraseñas no coinciden.');
    } else {
        removeErrorMessage('confirmPassword');
    }
};

const validateEmail = () => {
    let email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        createErrorMessage('email', 'Por favor, introduce un email válido.');
    } else {
        removeErrorMessage('email');
    }
};

document.getElementById('userForm').addEventListener('submit', (event) => {
    event.preventDefault();

    validateFullName();
    validateUsername();
    validatePassword();
    validateConfirmPassword();
    validateEmail();

    let errorMessages = document.querySelectorAll('#userForm .error');

    if (errorMessages.length === 0) {
        changeView('cinema');
    } else {
        alert('Por favor, corrija los errores antes de continuar.');
    }
});