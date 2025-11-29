const seats = document.querySelectorAll('.seat');

seats.forEach(seat => {
  seat.addEventListener('click', () => {

    // Si el seat está ocupado, no permite seleccionarlo
    if (seat.classList.contains('occupied')) {
      return;
    }
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      return;
    }
    // Marcar la nueva selección
    seat.classList.add('selected');
    
    // Desmarcar alguna selección previa

    
    
  });
});