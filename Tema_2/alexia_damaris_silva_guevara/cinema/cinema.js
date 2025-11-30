class MovieTheater {
    #seats = [];
    #selectedCount = 0;
    
    constructor(rows, seatsPerRow) {
        this.rows = rows;
        this.seatsPerRow = seatsPerRow;
        this.#seats = this.#initializeLayout(rows, seatsPerRow);
    }

    #initializeLayout(rows, cols) {
        const layout = [];
        for (let i = 0; i < rows; i++) {
            layout.push(new Array(cols).fill(0));
        }
        return layout;
    }

    toggleSeatSelection(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.seatsPerRow) {
            console.warn(`Fila ${row + 1}, Asiento ${col + 1} no existe.`);
            return false;
        }

        const currentState = this.#seats[row][col];
        const seatRef = `Fila ${row + 1}, Asiento ${col + 1}`;

        if (currentState === 2) {
            console.log(`El asiento ${seatRef} ya está OCUPADO.`);
            return false;
        }

        if (currentState === 0) {
            this.#seats[row][col] = 1;
            this.#selectedCount++;
            console.log(`✅ ${seatRef} ha sido seleccionado.`);
            return true;
        } else if (currentState === 1) {
            this.#seats[row][col] = 0;
            this.#selectedCount--;
            console.log(`➖ ${seatRef} se ha dejado de seleccionar.`);
            return true;
        }
    }

    confirmBooking() {
        if (this.#selectedCount === 0) {
            console.log("No has seleccionado ninguna asiento aún.");
            return 0;
        }
        
        let seatsConfirmed = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.seatsPerRow; j++) {
                if (this.#seats[i][j] === 1) {
                    this.#seats[i][j] = 2;
                    seatsConfirmed++;
                }
            }
        }
        this.#selectedCount = 0;
        console.log(`🎉 Gracias! ${seatsConfirmed} asientos comprados.`);
        return seatsConfirmed;
    }
    
    markAsOccupied(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.seatsPerRow) {
            this.#seats[row][col] = 2;
        }
    }

    showStatus() {
        console.log("\n--- Estado Actual de la Sala (0=Libre, 1=Selecc., 2=Vendido) ---");
        this.#seats.forEach((rowArr, index) => {
            console.log(`Fila ${String.fromCharCode(65 + index)}: [${rowArr.join(', ')}]`);
        });
        console.log(`\asientos seleccionados: ${this.#selectedCount}`);
    }
}

const myCinemaRoom = new MovieTheater(5, 10);

myCinemaRoom.markAsOccupied(0, 4);
myCinemaRoom.markAsOccupied(4, 9);

myCinemaRoom.showStatus();

console.log("\n--- Mi Selección ---");

myCinemaRoom.toggleSeatSelection(1, 1); 

myCinemaRoom.toggleSeatSelection(2, 4);

myCinemaRoom.toggleSeatSelection(0, 4); 

myCinemaRoom.toggleSeatSelection(1, 1);

myCinemaRoom.showStatus();

myCinemaRoom.confirmBooking();

myCinemaRoom.showStatus();