// Definir el tamaño de la matriz de butacas
const rows = 5; // Número de filas
const columns = 5; // Número de columnas
let seatMap = Array(rows).fill().map(() => Array(columns).fill(false)); //Array de sillas
let selectedSeats = new Set();

document.addEventListener('DOMContentLoaded', function() {

    //Generamos los asientos
    generateSeats();

});


//Generamos los asientos dinamicamente en el DOM
function generateSeats(){
    const container = document.getElementById("cinema_form_seats");
    container.innerHTML = '';

    // Generar cada fila
    for (let row = 0; row < rows; row++) {
        // Crear elemento de fila
        const rowLabel = document.createElement('label');
        rowLabel.className = 'cinema_checkbox';
        rowLabel.textContent = `Fila ${row + 1}`;
        container.appendChild(rowLabel);
        
        // Generar asientos para esta fila
        for (let seat = 0; seat < columns; seat++) {
            const isOccupied = seatMap[row][seat];
            
            const containerLabel = document.createElement('label');
            containerLabel.className = 'checkbox-container';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if (isOccupied) {
                checkbox.disabled = true;
                checkbox.checked = true;
            }
            checkbox.dataset.row = row;
            checkbox.dataset.seat = seat;
            
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark' + (isOccupied ? ' occupied' : '');

            checkbox.addEventListener('change', function(){
                updateSelectedSeats(this);
            });
            
            containerLabel.appendChild(checkbox);
            containerLabel.appendChild(checkmark);
            container.appendChild(containerLabel);
        }
        
        // Agregar salto de línea
        container.appendChild(document.createElement('br'));
    }
    
}

function updateSelectedSeats(checkbox){

    const row = parseInt(checkbox.dataset.row);
    const seat = parseInt(checkbox.dataset.seat);

    if(checkbox.checked){
        selectedSeats.add(`${row}-${seat}`);
    } else {
        selectedSeats.delete(`${row}-${seat}`);
    }

    document.querySelector('input[name="indic_seats"]').value = selectedSeats.size;

}

function resetSeatMap(){
    seatMap = Array(rows).fill().map(() => Array(columns).fill(false));
}

function updateCheckboxes(){

    const checkboxes = document.querySelectorAll('#cinema_form_seats input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        const row = parseInt(checkbox.dataset.row);
        const seat = parseInt(checkbox.dataset.seat);

        checkbox.checked = seatMap[row][seat];
        checkbox.disabled = seatMap[row][seat];

        const checkmark = checkbox.nextElementSibling;
        checkmark.className = 'checkmark' + (seatMap[row][seat] ? ' occupied' : '' );
    });
}

//Actividad tema 3
function suggest(numButacas) {
    
    if(isNaN(numButacas)){
        return false;
    }

    selectedSeats.clear();
    resetSeatMap();

    let seatsToSelect = Math.min(numButacas, rows * columns);
    let seatsSelected = 0;

    // Seleccionar asientos de atrás hacia adelante
    for (let row = rows - 1; row >= 0 && seatsSelected < seatsToSelect; row--) {
        for (let seat = 0; seat < columns && seatsSelected < seatsToSelect; seat++) {
            if (!seatMap[row][seat]) {
                seatMap[row][seat] = true;
                selectedSeats.add(`${row}-${seat}`);
                seatsSelected++;
            }
        }
    }

    updateCheckboxes();
    console.log(`Asientos seleccionados ${Array.from(selectedSeats).join(', ')}`);
}