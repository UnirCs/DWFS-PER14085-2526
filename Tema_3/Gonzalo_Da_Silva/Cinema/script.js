const movieSelect = document.getElementById('movie-select');
const seats = document.querySelectorAll('.seat.available');
const selectedCountElement = document.getElementById('selected-count');
const ticketPriceElement = document.getElementById('ticket-price');
const totalPriceElement = document.getElementById('total-price');
const selectedSeatsDisplay = document.getElementById('selected-seats-display');
const confirmButton = document.querySelector('.btn-confirm');
const suggestInput = document.getElementById('suggest-input');
const suggestButton = document.getElementById('suggest-button');
const suggestFeedback = document.getElementById('suggest-feedback');

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 8;
const FEEDBACK_TIMEOUT = 5000;
const ANIMATION_DELAY = 600;

let selectedSeats = [];
let ticketPrice = parseFloat(movieSelect.value);

function updateTicketPrice() {
    ticketPrice = parseFloat(movieSelect.value);
    ticketPriceElement.textContent = ticketPrice.toFixed(2);
    updateTotal();
}

function getSeatLabel(seat) {
    const rowSeats = seat.parentElement;
    const rowLabel = rowSeats.querySelector('.row-label').textContent;
    const seatIndex = Array.from(rowSeats.querySelectorAll('.seat')).indexOf(seat) + 1;
    return `${rowLabel}${seatIndex}`;
}

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

const clearSuggestedSeats = () =>
    document.querySelectorAll('.seat.suggested').forEach(seat => seat.classList.remove('suggested'));

const updateSuggestButtonState = () => {
    const hasSelection = selectedSeats.length > 0;
    suggestButton.disabled = hasSelection;
    suggestButton.title = hasSelection ? 'Deselecciona las butacas para usar esta función' : '';
};

const handleSuggest = () => {
    if (selectedSeats.length > 0) {
        return showFeedback('Debes deseleccionar todas las butacas antes de usar la sugerencia.', 'error');
    }

    const numSeats = parseInt(suggestInput.value);
    if (!numSeats || numSeats < 1) {
        return showFeedback('Por favor, ingresa un número válido de butacas.', 'error');
    }

    if (numSeats > SEATS_PER_ROW) {
        return showFeedback(`El número máximo de butacas contiguas es ${SEATS_PER_ROW}.`, 'error');
    }

    const suggestedSeats = suggest(numSeats);

    if (suggestedSeats.length === 0) {
        return showFeedback(`No hay ${numSeats} butaca(s) contigua(s) disponible(s).`, 'error');
    }

    clearSuggestedSeats();

    suggestedSeats.forEach((seat, index) => {
        seat.element.classList.add('suggested');

        setTimeout(() => {
            seat.element.classList.remove('suggested', 'available');
            seat.element.classList.add('selected');
            selectedSeats.push(seat.element);

            if (index === suggestedSeats.length - 1) {
                updateTotal();
                showFeedback(`¡Sugerencia aplicada! ${numSeats} butaca(s) seleccionada(s).`, 'success');
            }
        }, ANIMATION_DELAY);
    });
};

const toggleSeat = (seat) => {
    if (seat.classList.contains('occupied')) return;

    const isSelected = seat.classList.contains('selected');
    seat.classList.toggle('selected', !isSelected);
    seat.classList.toggle('available', isSelected);

    selectedSeats = isSelected
        ? selectedSeats.filter(s => s !== seat)
        : [...selectedSeats, seat];

    updateTotal();
    updateSuggestButtonState();
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
    updateSuggestButtonState();
};

const handleInputValidation = (e) => {
    const value = parseInt(e.target.value);
    if (value > SEATS_PER_ROW) e.target.value = SEATS_PER_ROW;
    if (value < 1 && e.target.value !== '') e.target.value = 1;
};

movieSelect.addEventListener('change', updateTicketPrice);
seats.forEach(seat => seat.addEventListener('click', () => toggleSeat(seat)));
confirmButton.addEventListener('click', confirmReservation);
suggestButton.addEventListener('click', handleSuggest);
suggestInput.addEventListener('input', handleInputValidation);
suggestInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSuggest());

updateTotal();
updateSuggestButtonState();