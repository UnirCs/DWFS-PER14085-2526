// Función suggest: devuelve butacas de la última fila
function suggest(n) {
    const result = new Set();

    if (n > 0 && n <= 10) {
        for (let i = 1; i <= n; i++) {
            result.add(`Fila 10 - Butaca ${i}`);
        }
    }

    // Log en consola
    console.log("Resultado del suggest:", result);

    return result;
}

