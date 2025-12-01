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
                // estado: false // Estado inicial libre
                estado: Math.random() < 0.3 // 30% ocupado, 70% libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

//Función para asignar Butacas
function suggest (cantidad_butacas_solicitadas) {
    let butacas_asignadas =[];
    let contador_butacas_asignadas = 0;
    // Recorrer las butacas
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (butacas[i][j].estado === false ) {
                // Primera silla vacía - inicia asignación
                contador_butacas_asignadas ++;
                butacas_asignadas.push(butacas[i][j].id);
                if(contador_butacas_asignadas === cantidad_butacas_solicitadas){
                    return butacas_asignadas;
                }
            }
            else{
                // Reset por silla ocupada
                contador_butacas_asignadas=0;
                butacas_asignadas.length = 0;
            }
        }
        // Reset por fin de fila
        contador_butacas_asignadas=0;
        butacas_asignadas.length = 0;
    }
    return butacas_asignadas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

// Ejecutar la asignación de las butacas solicitadas!
console.log('Butacas asignadas:');
let ejecutar_asignacion= suggest (6);
console.log(ejecutar_asignacion);