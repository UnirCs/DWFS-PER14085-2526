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
console.log(butacas);

// matriz de asientos: 5x5
// Cada asiento tiene un id único y estado (false = libre, true = ocupado)
const sala = [
  [{id:1, estado:false},{id:2, estado:false},{id:3, estado:true},{id:4, estado:false},{id:5, estado:false}],
  [{id:6, estado:false},{id:7, estado:true},{id:8, estado:false},{id:9, estado:false},{id:10, estado:false}],
  [{id:11, estado:false},{id:12, estado:false},{id:13, estado:false},{id:14, estado:false},{id:15, estado:false}],
  [{id:16, estado:true},{id:17, estado:false},{id:18, estado:false},{id:19, estado:false},{id:20, estado:false}],
  [{id:21, estado:false},{id:22, estado:false},{id:23, estado:false},{id:24, estado:false},{id:25, estado:false}]
];

// Función suggest
function suggest(numAsientos) {
    const resultado = new Set();
    const numFilas = sala.length;
    
    // Si el número de asientos solicitados excede el tamaño de la fila
    if (numAsientos > numFilas) return resultado;

    // Empezamos desde la fila más lejana a la pantalla (última fila)
    for (let i = numFilas - 1; i >= 0; i--) {
        const fila = sala[i];
        let contador = 0; // Contador de asientos libres consecutivos
        let idsTemp = []; // IDs temporales de asientos consecutivos libres

        for (let j = 0; j < fila.length; j++) {
            if (!fila[j].estado) { // Si el asiento está libre
                contador++;
                idsTemp.push(fila[j].id);
                if (contador === numAsientos) {
                    // Hemos encontrado suficientes asientos juntos
                    idsTemp.forEach(id => resultado.add(id));
                    return resultado; // Devolvemos inmediatamente
                }
            } else {
                // Reiniciamos el contador si hay un asiento ocupado
                contador = 0;
                idsTemp = [];
            }
        }
    }

    // Si no encontramos suficientes asientos juntos, devolvemos set vacío
    return resultado;
}

// Ejemplo de uso
console.log(suggest(3)); // Devuelve un Set con 3 ids consecutivos libres
console.log(suggest(6)); // Devuelve Set vacío, ya que ninguna fila tiene 6 asientos


