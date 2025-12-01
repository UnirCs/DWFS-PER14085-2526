console.log("Inicio");

// Se lanza una operación asíncrona: tras 2000 ms se ejecutará el callback.
setTimeout(() => {
    console.log("Callback asíncrono");
}, 2000);

// Simulación de una tarea principal que se ejecuta periódicamente
let contador = 0;
const intervaloID = setInterval(() => {
    contador++;
    console.log(`Ejecutando tarea principal: Iteración ${contador}`);

    // Cuando hayamos hecho 5 iteraciones, detenemos el intervalo
    if (contador === 5) {
        clearInterval(intervaloID);
        console.log("Tarea principal finalizada");
    }
}, 500);

/*
Flujo de ejecución:
1. Se imprime "Inicio".
2. Se programa el callback de setTimeout para que se ejecute en 2000 ms.
3. Se inicia el setInterval, que cada 500 ms imprime un mensaje.
4. Mientras el setInterval sigue imprimiendo, cuando pasan 2000 ms,
   el callback del setTimeout se coloca en la Callback Queue.
5. En cuanto el call stack se vacía (es decir, entre iteraciones o al finalizar la iteración actual),
   el Event Loop extrae el callback y lo ejecuta, imprimiendo "Callback asíncrono".
6. La tarea principal continúa hasta completarse.
*/
