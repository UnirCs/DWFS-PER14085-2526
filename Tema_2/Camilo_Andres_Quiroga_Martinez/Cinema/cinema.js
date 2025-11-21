// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas con estados aleatorios
function setup() {
    let idContador = 1;
    let butacas = [];
    
    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Generar Libre - Reservado aleatoriamente
            let estadoAleatorio = Math.random() < 0.3;
            fila.push({ 
                id: idContador++, 
                estado: estadoAleatorio 
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Función para reservar asientos
function suggest(cantidad_reserva) {
    if (cantidad_reserva > N) {
        console.log("Cantidad de asientos solicitados excede el tamaño de la fila.");
        return new Set();
    }
    
    // Buscar desde la última fila hacia adelante
    for (let i = butacas.length - 1; i >= 0; i--) {
        let fila = butacas[i];
        let contador = 0;
        let inicioBloque = 0;
        
        for (let j = 0; j < fila.length; j++) {
            if (!fila[j].estado) {
                // Asiento libre
                if (contador === 0) inicioBloque = j;
                contador++;
                
                // Si se encuentra suficientes asientos consecutivos
                if (contador === cantidad_reserva) {
                    let resultado = new Set();
                    console.log(`Fila seleccionada: ${i + 1}`);
                    console.log("Asientos encontrados:");
                    
                    for (let k = inicioBloque; k < inicioBloque + cantidad_reserva; k++) {
                        resultado.add(fila[k].id);
                        fila[k].estado = true; // marcar asiento como reservado
                        console.log(`ID: ${fila[k].id}, Estado: reservado`);
                    }
                    return resultado;
                }
            } else {
                // Asiento ocupado: resetear el contador
                contador = 0;
            }
        }
    }
    
    console.log("No se encontró una fila con suficientes asientos libres consecutivos.");
    return new Set();
}

// Función auxiliar para visualizar el estado de las butacas
function visualizarButacas() {
    console.log("\n=== ESTADO DE LAS BUTACAS ===");
    console.log("O = Libre | X = Ocupado\n");
    
    for (let i = 0; i < butacas.length; i++) {
        let filaVisual = `Fila ${(i + 1).toString().padStart(2, '0')}: `;
        for (let j = 0; j < butacas[i].length; j++) {
            filaVisual += butacas[i][j].estado ? `X ` : `O `;
        }
        console.log(filaVisual);
    }
    console.log("\n");
}

// Ejecución
console.log("=== SISTEMA DE RESERVAS DE BUTACAS ===\n");

// Mostrar estado inicial
visualizarButacas();

// Intentar varias reservas
console.log("--- Intento 1: Reservar 3 asientos ---");
let reserva1 = suggest(3);
console.log("Asientos reservados:", reserva1);

console.log("\n--- Intento 2: Reservar 5 asientos ---");
let reserva2 = suggest(5);
console.log("Asientos reservados:", reserva2);

console.log("\n--- Intento 3: Reservar 8 asientos ---");
let reserva3 = suggest(8);
console.log("Asientos reservados:", reserva3);

// Mostrar estado final
visualizarButacas();

// Tabla resumen
console.log("Tabla de IDs:");
console.table(butacas.map(fila => fila.map(a => `${a.id}${a.estado ? ' -X- ' : ' -O- '}`)));