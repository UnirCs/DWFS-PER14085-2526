const N = 10; // Número de filas y columnas
const butacas = setup();

document.addEventListener("DOMContentLoaded", loadSeats);
document.getElementById("seatCount").addEventListener("change", (event)=>{
    suggest(parseInt(event.target.value));
});

function loadSeats() {
    const seating = document.getElementById("seating");
    butacas.forEach((fila, indexRow) => {
        console.log(fila, indexRow)
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("flex","items-center", "gap-4");
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("font-mono");
        titleDiv.innerHTML = `Fila ${indexRow+1}`;
        rowDiv.appendChild(titleDiv);
        const seatsDiv = document.createElement("div")
        seatsDiv.classList.add("flex", "gap-2", "flex-wrap")
        fila.forEach((seat, indexSeat)=>{
            const seatDiv = document.createElement("div")
            seatDiv.id = `seat-${seat.id}`
            seatDiv.classList.add("seat","bg-green-500", "text-white")
            seatDiv.innerHTML = indexSeat + 1
            seatsDiv.appendChild(seatDiv)
        })
        rowDiv.appendChild(seatsDiv)
        seating.appendChild(rowDiv)
    });
}

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

function suggest(seats) {
    if (seats == null || seats <= 0 || seats > N) {
        clearSeats();
        return;
    }
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


    selectSeats(suggested_seats);   
}

function selectSeats(suggested_seats){
    suggested_seats.forEach(seat => {
        const seatDiv =  document.getElementById(`seat-${seat.id}`)
        seatDiv.classList.remove("bg-green-500")
        seatDiv.classList.add("bg-blue-500")
    });
}

function clearSeats() {
    const selectedSeats = document.querySelectorAll(".bg-blue-500");
    
    selectedSeats.forEach(seatDiv => {
        seatDiv.classList.remove("bg-blue-500");
        seatDiv.classList.add("bg-green-500");
    });
}

