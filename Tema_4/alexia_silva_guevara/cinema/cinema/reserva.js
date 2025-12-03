const N = 10;
const butacas = setup();

document.addEventListener("DOMContentLoaded", loadSeats);

document.getElementById("seatCount").addEventListener("change", (event) => {
    suggest(parseInt(event.target.value)); 
});

document.getElementById("clearBtn").addEventListener("click", clearSeats);


function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: (Math.random() < 0.2)
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

function loadSeats() {
    const seating = document.getElementById("seating");
    
    const butacasInvertidas = [...butacas].reverse(); 

    butacasInvertidas.forEach((fila, indexRowInvertido) => {
        const indexRowReal = N - 1 - indexRowInvertido; 

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("flex", "items-center", "gap-4");
        
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("font-mono");
        titleDiv.innerHTML = `Fila ${indexRowReal + 1}`;
        rowDiv.appendChild(titleDiv);
        
        const seatsDiv = document.createElement("div");
        seatsDiv.classList.add("flex", "gap-2", "flex-wrap");
        
        fila.forEach((seat, indexSeat) => {
            const seatDiv = document.createElement("div");
            seatDiv.id = `seat-${seat.id}`;
            seatDiv.classList.add("seat", "text-white");
            seatDiv.innerHTML = indexSeat + 1;

            if (seat.estado === true) {
                seatDiv.classList.add("bg-gray-500");
                seatDiv.style.cursor = "not-allowed";
            } else {
                seatDiv.classList.add("bg-green-500");
            }

            seatsDiv.appendChild(seatDiv);
        });
        
        rowDiv.appendChild(seatsDiv);
        seating.appendChild(rowDiv);
    });
}

function suggest(seats) {
    if (seats == null || seats <= 0 || seats > N) {
        clearSeats();
        return;
    }
    
    clearSeats(); 

    for (let i = butacas.length - 1; i >= 0; i--) {
        let current_contiguous_block = [];
        
        for (let j = 0; j < butacas[i].length; j++) {
            
            if (butacas[i][j].estado === false) {
                current_contiguous_block.push(butacas[i][j]);
                
                if (current_contiguous_block.length === seats) {
                    selectSeats(current_contiguous_block);
                    return;
                }
            } else {
                current_contiguous_block = [];
            }
        }
    }
    
    console.log(`No se encontró un bloque de ${seats} asientos contiguos.`);
}

function selectSeats(suggested_seats) {
    suggested_seats.forEach(seat => {
        const seatDiv = document.getElementById(`seat-${seat.id}`);
        if (!seatDiv.classList.contains("bg-gray-500")) {
            seatDiv.classList.remove("bg-green-500");
            seatDiv.classList.add("bg-blue-500");
        }
    });
}

function clearSeats() {
    const selectedSeats = document.querySelectorAll(".bg-blue-500"); 
    
    selectedSeats.forEach(seatDiv => {
        seatDiv.classList.remove("bg-blue-500");
        seatDiv.classList.add("bg-green-500");
    });
}