// Cada asiento tiene un id único y estado (false = libre, true = ocupado)
const sala = [
  [{id:1, estado:false},{id:2, estado:false},{id:3, estado:true},{id:4, estado:false},{id:5, estado:false}],
  [{id:6, estado:false},{id:7, estado:true},{id:8, estado:false},{id:9, estado:false},{id:10, estado:false}],
  [{id:11, estado:false},{id:12, estado:false},{id:13, estado:false},{id:14, estado:false},{id:15, estado:false}],
  [{id:16, estado:true},{id:17, estado:false},{id:18, estado:false},{id:19, estado:false},{id:20, estado:false}],
  [{id:21, estado:false},{id:22, estado:false},{id:23, estado:false},{id:24, estado:false},{id:25, estado:false}]
];

// Funtion render tabla in html
function renderTabla() {
    const tabla = document.getElementById("sala");   
    tabla.innerHTML = "";
    console.log(sala);
    sala.forEach((fila,index) => {
    const tr = document.createElement("tr");

    fila.forEach(asiento => {
      const label = document.createElement("td");
        label.textContent = "Fila " + (index + 1);
        label.style.fontWeight = "bold";
        label.style.padding = "10px";
        label.style.border = "1px solid black";
        label.style.background = "#ddd";
        tr.appendChild(label);

      const td = document.createElement("td");
      td.textContent = asiento.id;
      td.style.padding = "10px";
      td.style.border = "1px solid black";
      td.style.textAlign = "center";

      if (asiento.estado) {
        td.style.background = "red";
        td.style.color = "white";
      } else {
        td.style.background = "lightgreen";
      }

      tr.appendChild(td);
    });

    tabla.appendChild(tr);
  });
}

// Función suggest
function suggest() {
    let numAsientos = document.getElementById("myinput").value; 
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
                    let encontrados = idsTemp
                }
            } else {
                // Reiniciamos el contador si hay un asiento ocupado
                contador = 0;
                idsTemp = [];
            }
        }
    }
    if (encontrados) {
        encontrados.forEach(id => resultado.add(id));
    }
    console.log(resultado);
    // Si no encontramos suficientes asientos juntos, devolvemos set vacío
    document.getElementById("result").innerHTML = resultado;

}

renderTabla();  // muestro la tabla
