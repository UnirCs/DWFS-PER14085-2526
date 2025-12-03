class Seat {
    constructor(id, state)
    {
        this.id = id;
        this.estado = state;
    }
}

const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            let state = false;
            let dice = Math.random();

            if (dice < 0.5) state = true;
            else state = false;

            fila.push({
                id: idContador++,
                estado: state,
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
// console.log(butacas);

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

function suggest(seats)
{
    let finalSet = new Set();
    let butacas = setup();

    if(seats > butacas[0].length) return finalSet;

    for (let i = butacas.length - 1; i >= 0; i--)
    {
        const fila = butacas[i];
        const startIndex = checkRowAvailable(fila, seats);

        if (startIndex !== -1)
        {
            for(let k = 0; k < seats; k++)
            {
                const seat = fila[startIndex + k];
                finalSet.add(seat.id);
            }
            return finalSet;
        }
    }
    return finalSet;
}

/*
let tickets = new Set();
tickets = suggest(5);
console.log(tickets);

let tickets = new Set();
tickets = suggest(0);
console.log(tickets);

let tickets = new Set();
tickets = suggest(11);
console.log(tickets);

let tickets = new Set();
tickets = suggest(10);
console.log(tickets);

*/

console.log(butacas);

let tickets = new Set();
tickets = suggest(5);
console.log(tickets);







