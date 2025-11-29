const movieSelect = document.getElementById('movie-select');
const selectedCountElement = document.getElementById('selected-count');
const ticketPriceElement = document.getElementById('ticket-price');
const totalPriceElement = document.getElementById('total-price');
const selectedSeatsDisplay = document.getElementById('selected-seats-display');
const confirmButton = document.querySelector('.btn-confirm');
const numSeatsInput = document.getElementById('num-seats-input');
const suggestFeedback = document.getElementById('suggest-feedback');

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 8;
const FEEDBACK_TIMEOUT = 5000;

let selectedSeats = [];
let ticketPrice = parseFloat(movieSelect.value);


window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('user');
    if(!username) window.location.href = 'index.html';
};

const assignSeatIds = () => {
    const rowElements = document.querySelectorAll('.row-seats');
    rowElements.forEach((rowElement, rowIndex) => {
        const seatElements = rowElement.querySelectorAll('.seat');
        seatElements.forEach((seatElement, seatIndex) => {
            const seatId = `${ROWS[rowIndex]}${seatIndex + 1}`;
            seatElement.id = seatId;
            seatElement.dataset.row = ROWS[rowIndex];
            seatElement.dataset.number = seatIndex + 1;
        });
    });
};

const updateTicketPrice = () => {
    ticketPrice = parseFloat(movieSelect.value);
    ticketPriceElement.textContent = ticketPrice.toFixed(2);
    updateTotal();
};

const getSeatLabel = (seat) => seat.id;

const updateSelectedSeatsDisplay = () => {
    selectedSeatsDisplay.innerHTML = selectedSeats.length === 0
        ? '<p class="text-muted small">Selecciona tus butacas en el mapa</p>'
        : selectedSeats.map(seat => `<span class="seat-badge">${getSeatLabel(seat)}</span>`).join('');
};

const updateTotal = () => {
    const count = selectedSeats.length;
    selectedCountElement.textContent = count;
    totalPriceElement.textContent = (count * ticketPrice).toFixed(2);
    updateSelectedSeatsDisplay();
};

const buildSeatsMatrix = () => {
    const rowElements = document.querySelectorAll('.row-seats');
    return Array.from(rowElements).map((rowElement, rowIndex) => {
        const seatElements = rowElement.querySelectorAll('.seat');
        return Array.from(seatElements).map((seatElement, seatIndex) => ({
            id: `${ROWS[rowIndex]}${seatIndex + 1}`,
            estado: seatElement.classList.contains('occupied') ||
                    seatElement.classList.contains('selected'),
            element: seatElement
        }));
    });
};

const suggest = (numSeats) => {
    if (numSeats < 1 || numSeats > SEATS_PER_ROW) return [];

    const matrix = buildSeatsMatrix();

    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = 0; j <= SEATS_PER_ROW - numSeats; j++) {
            const ventana = matrix[i].slice(j, j + numSeats);
            if (ventana.every(asiento => !asiento.estado)) return ventana;
        }
    }

    return [];
};

const showFeedback = (message, type = 'info') => {
    suggestFeedback.textContent = message;
    suggestFeedback.className = `suggest-feedback show ${type}`;
    setTimeout(() => suggestFeedback.classList.remove('show'), FEEDBACK_TIMEOUT);
};

const clearPreselectedSeats = () => {
    document.querySelectorAll('.seat.preselected').forEach(seat => {
        seat.classList.remove('preselected');
        seat.classList.add('available');
    });
};

const handleNumSeatsChange = () => {
    const numSeats = parseInt(numSeatsInput.value);

    if (!numSeats || numSeats < 1) {
        clearPreselectedSeats();
        return;
    }

    if (numSeats > SEATS_PER_ROW) {
        showFeedback(`El número máximo de butacas contiguas es ${SEATS_PER_ROW}.`, 'error');
        numSeatsInput.value = SEATS_PER_ROW;
        return;
    }

    const suggestedSeats = suggest(numSeats);

    if (suggestedSeats.length === 0) {
        clearPreselectedSeats();
        showFeedback(`No hay ${numSeats} butaca(s) contigua(s) disponible(s).`, 'error');
        return;
    }

    clearPreselectedSeats();

    suggestedSeats.forEach(seat => {
        seat.element.classList.remove('available');
        seat.element.classList.add('preselected');
    });

    showFeedback(`¡${numSeats} butaca(s) preseleccionada(s)! Haz clic en ellas para confirmar.`, 'success');
};

const toggleSeat = (seat) => {
    if (seat.classList.contains('occupied')) return;

    const isPreselected = seat.classList.contains('preselected');
    const isSelected = seat.classList.contains('selected');

    if (isPreselected) {
        seat.classList.remove('preselected');
        seat.classList.add('selected');
        selectedSeats.push(seat);
        clearPreselectedSeats();
        numSeatsInput.value = '';
    } else if (isSelected) {
        seat.classList.remove('selected');
        seat.classList.add('available');
        selectedSeats = selectedSeats.filter(s => s !== seat);
    } else {
        seat.classList.remove('available');
        seat.classList.add('selected');
        selectedSeats.push(seat);
        clearPreselectedSeats();
        numSeatsInput.value = '';
    }

    updateTotal();
};

const confirmReservation = () => {
    if (selectedSeats.length === 0) return alert('Por favor, selecciona al menos una butaca.');

    const seatLabels = selectedSeats.map(seat => getSeatLabel(seat)).join(', ');
    const total = (selectedSeats.length * ticketPrice).toFixed(2);
    const movieText = movieSelect.options[movieSelect.selectedIndex].text;

    alert(`Reserva confirmada!\n\nPelícula: ${movieText}\nButacas: ${seatLabels}\nTotal: $${total}\n\n¡Disfruta tu película!`);

    selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('occupied');
    });

    selectedSeats = [];
    updateTotal();
    clearPreselectedSeats();
    numSeatsInput.value = '';
};

const handleInputValidation = (e) => {
    const value = parseInt(e.target.value);
    if (value > SEATS_PER_ROW) e.target.value = SEATS_PER_ROW;
    if (value < 1 && e.target.value !== '') e.target.value = 1;
};

assignSeatIds();

const seats = document.querySelectorAll('.seat');
movieSelect.addEventListener('change', updateTicketPrice);
seats.forEach(seat => seat.addEventListener('click', () => toggleSeat(seat)));
confirmButton.addEventListener('click', confirmReservation);
numSeatsInput.addEventListener('input', handleInputValidation);
numSeatsInput.addEventListener('change', handleNumSeatsChange);

updateTotal();
