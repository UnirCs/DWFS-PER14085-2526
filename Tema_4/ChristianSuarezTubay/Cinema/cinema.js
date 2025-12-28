const cinemaDiv = document.getElementById("cinema");
const rows = 10, cols = 10;

function renderCinema(occupiedSeats = new Set()) {
    cinemaDiv.innerHTML = "";
    for (let r = 1; r <= rows; r++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let c = 1; c <= cols; c++) {
            const seat = document.createElement("div");
            seat.classList.add("seat");
            const seatId = `Fila ${r} - Butaca ${c}`;
            if (occupiedSeats.has(seatId)) {
                seat.classList.add("occupied");
            } else {
                seat.classList.add("free");
            }
            rowDiv.appendChild(seat);
        }
        cinemaDiv.appendChild(rowDiv);
    }
}

function handleInput() {
    const numSeats = document.getElementById("seats").value;
    if (numSeats) {
        const suggestion = suggest(Number.parseInt(numSeats));
        renderCinema(suggestion);
        localStorage.setItem("reserva", JSON.stringify([...suggestion]));
    }
}

function suggest(n) {
    const result = new Set();
    if (n > 0 && n <= 10) {
        for (let i = 1; i <= n; i++) {
            result.add(`Fila 10 - Butaca ${i}`);
        }
    }
    return result;
}

// Render inicial
renderCinema(suggest(5));


