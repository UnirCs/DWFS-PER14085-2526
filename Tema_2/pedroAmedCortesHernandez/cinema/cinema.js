//valores constantes establecidos
const cantidadFilasEstablecido = 4; //cantidad de filas establecidas
const cantidadAsientosFilaEstablecido = 5; //cantidad de asientos por filas establecidas

//estados de las butacas
const estadoButaca = {
    ocupada : true,
    libre : false
};

//array (lista) filas de las butacas (asientos)
let filasButacas = []

/**
 * Inicializa el array de filasButacas
 * con la cantidad de filas y asientos establecidos previamente para crear la matriz
 */
function initFilasButacas() {
    let j = 0; //índice (posición) de cada asiento, y va incrementando
    let c; //contador maximo de asientos

    let a = 8; //asientos a reservar previamente
    let r = 0; //asientos reservados previamente

    for (let i = 0; i < cantidadFilasEstablecido; i++) {
        filasButacas[i] = []; //se añade el lista de la fila (array)

        c = 0; //se reinicia el contador a cero

        do{
            //se agrega el objeto del asiento a la fila correspondiente
            filasButacas[i].push({
                asiento : {
                    id: j,
                    estado: estadoButaca.libre
                }
            });

            j++; //se aumenta el id del asiento
            c++; //se aumenta el contador
        }while ((c % cantidadAsientosFilaEstablecido !== 0));
        //Si la cantidad de asientos agregados no llega a diez, se agregan asientos.
        //En caso contrario vuelve a agregar una nueva fila, ya que cada fila son 10 asientos
    }

    let f = (cantidadFilasEstablecido - 1); //indice de la fila inicial a buscar (se toma la ultima fila)

    let reservaTerminada = false; //se termina la reserva si ya se completó la cantidad de asientos a reservar

    //la reserva de los asientos se hace de izquierda a derecha por fila

    //reservamos
    for (let i = f; (i >= 0); i--) { //fila
        for(let j = 0; (j < cantidadAsientosFilaEstablecido) && (reservaTerminada === false); j++) { //asientos
            filasButacas[i][j].asiento.estado = estadoButaca.ocupada;

            r++; //se aumenta la reserva de los asientos

            reservaTerminada = (r < a) ? false : true;
        }
    }
}

/**
 * Funcion para pre-reservar las butacas
 * numeroAsientosReservar: number = número de asientos solicitados para reservar
 * valor por defecto es 1
 */
function suggest(numeroAsientosReservar = 1) {
    const asientosSeleccionadosPreReserva = new Set(); //set de asientos a pre-reservar

    let asientosReservados = 0; //cantidad de asientos servados
    let asientoArrayEstado; //referencia al estado del asiento actual

    let f = (cantidadFilasEstablecido - 1); //indice de la fila inicial a buscar (se toma la ultima fila)

    let reservaTerminada = false;
    //se termina la reserva si ya se completó la cantidad de asientos a reservar o si asiento actual está libre péro el siguiente está ocupado
    //por lo que los asientos deben de reservarse juntos en la fila actual o en la siguiente fila

    //la reserva de los asientos se hace de izquierda a derecha por fila

    //reservamos
    for(let i = f; (i >= 0) && (numeroAsientosReservar <= cantidadAsientosFilaEstablecido) && (reservaTerminada === false); i--){ //fila
        for(let j = 0; (j < cantidadAsientosFilaEstablecido) && (reservaTerminada === false); j++){ //asientos
            asientoArrayEstado = filasButacas[i][j].asiento.estado; //referencia del estado de la silla

            if (asientoArrayEstado === estadoButaca.libre){
                asientoArrayEstado = estadoButaca.ocupada;

                asientosSeleccionadosPreReserva.add({id: filasButacas[i][j].asiento.id});

                asientosReservados++;

                reservaTerminada = (asientosReservados < numeroAsientosReservar) ? false : true;
            }
            else
            {
                reservaTerminada = (asientosReservados > 0) ? true : false;
            }
        }
    }

    return asientosSeleccionadosPreReserva;
}

//inicia el array
initFilasButacas();

//mostramos filasButacas en la consola
console.log(filasButacas);

//reservamos los asientos y los mostramos en la consola
console.log(suggest(5));



