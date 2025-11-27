// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas, para este caso se tiene que hay 100 butacas(10x10), cada tres butacas habra una ocupada, las filas 3, 7 y 9 estaran ocupadas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            if (i == 3 || i == 8 || i == 9){
                fila.push({
                id: idContador++,
                estado: true // Butaca ocupada
            });
            }else{
                if(j % 4 == 0){
                    fila.push({
                    id: idContador++,
                    estado: true // Butaca ocupada
            });
                }else{
                    fila.push({
                    id: idContador++,
                    estado: false // Butaca ocupada
            });
                }
                
            }
            
        }
        butacas.push(fila);
    }
    
    return butacas;
}

//Función a programar para ver si es posible reservar asientos 
function suggest(nAsientosReservados){
    
    
    // Llamo a la matriz para averiguar su longitud de filas

    let butacas = setup()
    let juntos = []
    let reservado = false
    //Control de errores, validar el numero de asientos, ver si el numero es superior a 0 y no excede del total de asientos en una fila
    if(nAsientosReservados <= 0 || nAsientosReservados > butacas.length){
        
        return juntos
    }else{
        console.log("Entro con valor: " + nAsientosReservados)
        let resevaPosible = false// Bandera que se usara para ver si la reserva es posible
        //Se procede a buscar en la matriz
        for(let i = butacas.length - 1; i > -1; i--){//Empezar por la ultima fila.
            juntos.length = 0// Cada fila borro todos los elementos del array ya que los asientos deben ir juntos.
            for(let j = 0; j < butacas.length; j++){//Aplicar invariante, si ya tengo mis asientos reservados no necesito mirar más 
                //Ver si la butaca esta disponible, debido a que tienen que estar juntas en caso de que se encuentre una butaca ocupada, se borra el listado de butacas
                
                if(butacas[i][j].estado == false){
                    juntos.push(butacas[i][j].id)
                }else{
                    juntos.length = 0
                }

                if(juntos.length == nAsientosReservados){//Si se consigue las plazas solicitadas, establecer condiciones para salir del array
                    
                    i = -1
                    j = butacas.length
                    reservado = true

                }

                
                
                
            }
            
        }
        if(reservado == true){
            return juntos
        }else{
            return []
        }
        
    }
}


//Varias llamadas a la función suggest para ver los resultados

console.log(suggest(-52))// Valor esperado:[]  Valor devuelto:
console.log("-")
console.log(suggest(-1))// Valor esperado:[]  Valor devuelto:
console.log("-")
console.log(suggest(5))// Valor esperado:[]  Valor devuelto:
console.log("-")
console.log(suggest(1))// Valor esperado:[]  Valor devuelto:
console.log("-")
console.log(suggest(412))// Valor esperado:[]  Valor devuelto:
console.log("-")
console.log(suggest(2))// Valor esperado:[butacas]  Valor devuelto:
console.log("-")
console.log(suggest(4))// Valor esperado:[]  Valor devuelto:
console.log("-")
console.log(suggest(3))// Valor esperado:[]  Valor devuelto:
console.log("-")



console.log(setup())

