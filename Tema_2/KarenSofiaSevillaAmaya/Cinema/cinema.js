// Definir el tamaño de la matriz de butacas
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
//console.log(butacas);


function suggest(cantidad_reserva ){
    
    let acomodado = cantidad_reserva;
    let reservados=[];
    let butacas_copia=[];
    let cantidad_asientos = Math.pow(butacas.length,2);
    
   if ( cantidad_asientos < cantidad_reserva){
     console.log("Cantidad para reserva supera cantidad_disponible");
     acomodado = 0;
   };
    
   butacas_copia = butacas; 
   for (i = butacas.length-1; i>0-1  && acomodado!=0; i--){
         let asiento_reservado = [];
                
        for (j = butacas.length-1; j>0-1 && acomodado!=0; j--){
                acomodado = acomodado-1;
                let asiento = butacas[i][j];
                asiento_reservado.push({id: asiento.id, estado:  "true"}); 
                butacas_copia[i][j]= {id: asiento.id, estado:  "true"};
            }
           reservados.push(asiento_reservado);             
        if (acomodado == 1){ 
            console.log("La reserva tiene un asiento individual, se cancela la reserva");
            acomodado = 0;
            reservados.length = 0;
            butacas_copia.length =0;            
        } else {
            butacas = butacas_copia;
        }
     }
     return reservados;
   
    }
   
//Ejecuta el código
//suggest();
console.log("Asientos Reservados Función suggest:")
console.log(suggest(15));

console.log("Visualización general asientos reservados:")
console.log(butacas);

