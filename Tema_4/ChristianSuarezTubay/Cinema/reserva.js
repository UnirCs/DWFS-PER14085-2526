const resumenDiv = document.getElementById("resumen");
const reserva = JSON.parse(localStorage.getItem("reserva")) || [];

if (reserva.length > 0) {
    resumenDiv.innerHTML = `
    <p>Has reservado ${reserva.length} butacas:</p>
    <ul>${reserva.map(seat => `<li>${seat}</li>`).join("")}</ul>
  `;
} else {
    resumenDiv.textContent = "No tienes reservas registradas.";
}
