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

// Imprimir la matriz
// console.log(butacas);

function checkRowAvailable(row, num)
{
    if (row.length < num)
    {
        return false;
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
                break;
            }
        }

        if (free)
        {
            return true;
        }
    }
    return false;
}
function suggest(seats)
{
    let finalSet = new Set();
    let butacas = setup();

    if(butacas.length > seats) return finalSet;

    for(let i = 0; i < butacas[0].length; i++)
    {
        if (!checkRowAvailable(butacas[i], seats)) return finalSet;
    }

    for (let i = butacas.length - 1; i >= 0; i--)
    {
        if (!checkRowAvailable(butacas[i], seats)) continue;
        else
        {
            for(let j = 0; j < butacas[i].length; j++)
            {
                for (let k = 0; k < butacas[i].length; k++)
                {
                    if(butacas[i].estado === false)
                    {
                        finalSet.push(butacas[i].id);
                    }
                    else continue;
                }
            }
        }
    }
    return finalSet;
}

let tickets = new Set();
tickets = suggest(5);

console.log(tickets);
console.log(butacas);
console.log(tickets);

