// Se crea una promesa que se resuelve después de 1 segundo
new Promise((resolve, reject) => {
    setTimeout(() => {
        // La promesa se cumple con el valor 42
        resolve(42);
    }, 1000);
})
    .then(result => {
        // Primer then: se recibe el valor 42
        console.log('Resultado inicial:', result); // Imprime: 42
        // Se retorna un nuevo valor para continuar la cadena
        return result * 2;
    })
    .then(result => {
        // Segundo then: se recibe el valor multiplicado (84)
        console.log('Resultado después de la multiplicación:', result); // Imprime: 84
    })
    .catch(error => {
        // En caso de error, se captura aquí
        console.error('Error en la cadena:', error);
    });



/**
 * Cargar datos de distintos endpoints simultáneamente.
 * Esperar la carga de varios recursos (imágenes, datos, configuraciones) antes de renderizar una vista completa.
 */
// Simulación de tres operaciones asíncronas (por ejemplo, llamadas a APIs)
const obtenerUsuarios = new Promise(resolve => {
    setTimeout(() => resolve(['Usuario1', 'Usuario2']), 1000);
});
const obtenerPosts = new Promise(resolve => {
    setTimeout(() => resolve(['Post1', 'Post2']), 1500);
});
const obtenerComentarios = new Promise(resolve => {
    setTimeout(() => resolve(['Comentario1', 'Comentario2']), 1200);
});

// Promise.all espera a que todas las promesas se cumplan
Promise.all([obtenerUsuarios, obtenerPosts, obtenerComentarios])
    .then(resultados => {
        console.log('Resultados de todas las operaciones:', resultados);
        // resultados es un arreglo: [ ['Usuario1', 'Usuario2'], ['Post1', 'Post2'], ['Comentario1', 'Comentario2'] ]
    })
    .catch(error => {
        // Si alguna promesa falla, se captura aquí
        console.error('Error en una de las operaciones:', error);
    });


/**
 * Ejecutar una petición a un servidor con un timeout.
 * Competir entre varias fuentes de datos y utilizar la que responda primero.
 */
const operacionRapida = new Promise(resolve => {
    setTimeout(() => resolve('Respuesta rápida'), 500);
});
const operacionLenta = new Promise(resolve => {
    setTimeout(() => resolve('Respuesta lenta'), 1000);
});

// Promise.race devuelve el resultado de la primera promesa que se resuelva o rechace
Promise.race([operacionRapida, operacionLenta])
    .then(resultado => {
        console.log('Resultado obtenido con Promise.race:', resultado);
        // Se imprime: "Respuesta rápida"
    })
    .catch(error => {
        console.error('Error en Promise.race:', error);
    });


/**
 * Ejecutar varias operaciones en lote y luego presentar un informe que detalle cuáles se completaron exitosamente y cuáles fallaron.
 * Procesar múltiples recursos donde cada resultado se analiza individualmente.
 */
const operacionExito = new Promise(resolve => {
    setTimeout(() => resolve('Operación exitosa'), 1000);
});
const operacionError = new Promise((_, reject) => {
    setTimeout(() => reject('Operación fallida'), 1500);
});

Promise.allSettled([operacionExito, operacionError])
    .then(resultados => {
        console.log('Resultados de allSettled:');
        resultados.forEach((resultado, index) => {
            console.log(`Promesa ${index + 1}:`, resultado);
            // Cada objeto tendrá una propiedad "status" ('fulfilled' o 'rejected')
            // y "value" o "reason" según corresponda.
        });
    });


/**
 * Consultar múltiples servidores o endpoints redundantes y usar el que responda primero.
 * Implementar mecanismos de respaldo (fallback) donde se intenta con varias promesas y se toma la primera exitosa.
 */
const fallo1 = new Promise((_, reject) => {
    setTimeout(() => reject('Error 1'), 500);
});
const exito = new Promise(resolve => {
    setTimeout(() => resolve('Respuesta exitosa'), 1000);
});
const fallo2 = new Promise((_, reject) => {
    setTimeout(() => reject('Error 2'), 1500);
});

Promise.any([fallo1, exito, fallo2])
    .then(resultado => {
        console.log('Resultado obtenido con Promise.any:', resultado);
        // Se imprime: "Respuesta exitosa"
    })
    .catch(error => {
        console.error('Todas las promesas fallaron:', error);
    });
