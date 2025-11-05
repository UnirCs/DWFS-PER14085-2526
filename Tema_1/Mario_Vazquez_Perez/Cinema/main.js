document.addEventListener("DOMContentLoaded", () => {
    const seats = document.querySelectorAll("button.seat");

    seats.forEach(seat => {
        seat.addEventListener("click", () => {
            if (seat.classList.contains("seat--occupied")) {
                return;
            }
            if (seat.classList.contains("seat--wheelchair")) {
                if (seat.classList.contains("seat--wheelchair")) {
                    seat.classList.toggle("seat--wheelchair-active");
                    return;
                }
            }
            seat.classList.toggle("seat--selected");
        });
    });
});