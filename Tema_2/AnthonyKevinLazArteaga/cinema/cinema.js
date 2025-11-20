// Definir el tamaño de la matriz de butacas
const N = 10 // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}


// Inicializar la matriz
let butacas = setup();

const suggest = (site_numbers) => {
    site_numbers = Math.floor(site_numbers);

    let suggestSeats = [];
    const cols_length = butacas.length;
    const rows_length = butacas[0].length;

    let continuar = true,selected =0, contador = 0;
    if (site_numbers <= 0 || site_numbers > cols_length) {
        return [];
    }
    //Empezar desde la ultima fila.
    let col = cols_length - 1;
    //columnas.
    while (col >= 0 && continuar) {
        //obtengo los ocupados por fila
        selected = butacas[col].filter(item => item.estado === true).length;
        console.log(selected);
        let row = 0;
        while (row < rows_length) {
            //obtengo los restantes por fila
            let restantes = rows_length - selected;
            if (contador < site_numbers && butacas[col][row].estado === false && restantes >= site_numbers) {
                butacas[col][row].estado = true;
                suggestSeats.push(butacas[col][row]);
                contador++;
            }

            if (suggestSeats.length === site_numbers || (restantes < site_numbers && restantes > 1)) {
                continuar = false;
            }
            row++
        }
        col--;
    }

    return suggestSeats;
}

showTable();

function showTable() {
    let table = `<table class="text-center">`
    let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    table += '<thead><tr>';

    //Nros
    table += `<th></th>`
    for (let i = 1; i < butacas[0].length + 1; i++) {
        table += `<th>${i}</th>`
    }
    table += '</tr></thead>';

    table += '<tbody>';
    for (let i = 0; i < butacas.length; i++) {
        table += `<tr>`;
        table += `<td class="row">${letter[i]}</td>`;
        for (let j = 0; j < butacas[i].length; j++) {
            table += `<td id="sit_${butacas[i][j].id}" >${butacas[i][j].id}</td>`;
        }
        table += `</tr>`;
    }
    table += '</tbody>';
    table += `</table>`

    document.getElementById('table').innerHTML = table;
}

function suggestTable() {
    let sits_numbers = document.getElementById("sitsNumbers").value;
    let sits = suggest(sits_numbers);
    console.log(sits)
    for (let i = 0; i < sits.length; i++) {
        const el = document.getElementById(`sit_${sits[i].id}`);
        el.classList.add('occupied-seat');
    }
}