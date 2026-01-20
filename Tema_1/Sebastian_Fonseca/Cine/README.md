# Cinema Seat Reservation System

A simple, interactive cinema seat reservation interface created using only HTML and CSS. This project demonstrates pure CSS techniques for creating interactive elements.

## Description

This is a cinema seat booking system that allows users to select seats for a movie showing. The interface displays movie information, an interactive seat map, and a payment confirmation modal - all implemented using pure CSS.

## Features

- **Pure CSS Interactivity**: Uses CSS `:checked` pseudo-class for seat selection and modal display
- **Visual Seat Map**: Interactive grid layout showing available, reserved, and selected seats
- **Movie Information**: Displays movie details including duration, director, genre, and actors
- **Modal Dialog**: CSS-only modal for payment confirmation
- **Responsive Design**: Adapts to different screen sizes (desktop, tablet, mobile)
- **Visual Feedback**: Hover effects and transitions for better user experience

## File Structure

```
Cine/
├── index.html      # Main HTML file with seat reservation interface
├── styles.css       # CSS stylesheet with all styling and interactivity
└── README.md        # This file
```

## How It Works

### CSS-Only Interactivity

The application uses several CSS techniques to create interactivity without JavaScript:

1. **Seat Selection**: 
   - Hidden checkboxes (`<input type="checkbox">`) are associated with each seat
   - Labels styled as seats trigger the checkboxes when clicked
   - The `:checked` pseudo-class changes the seat color when selected

2. **Modal Display**:
   - A hidden checkbox controls the modal visibility
   - When the "Next" button (which is a label) is clicked, it checks the checkbox
   - The `:checked` pseudo-class shows the modal overlay
   - Clicking "OK" unchecks the checkbox, hiding the modal

3. **Reserved Seats**:
   - Reserved seats have a different class and are styled in gray
   - They use `pointer-events: none` to prevent interaction

## Customization

### Changing Movie Information

Edit the movie details in `index.html`:
- Movie title
- Cinema location
- Showtime
- Duration, director, genre, and actors

### Modifying Seat Layout

To change the number of seats or rows:
1. Add or remove seat inputs in the HTML
2. Each seat needs: `<input type="checkbox" id="[ROW][NUMBER]">` and `<label for="[ROW][NUMBER]" class="seat available">`
3. Use class `available` for free seats, `reserved` for taken seats

### Styling

Modify `styles.css` to customize:
- Colors (currently using purple gradient theme)
- Seat sizes and spacing
- Modal appearance
- Responsive breakpoints

## Color Scheme

- **Available Seats**: Green (`#4ade80`)
- **Reserved Seats**: Gray (`#94a3b8`)
- **Selected Seats**: Blue (`#3b82f6`)
- **Header Gradient**: Purple (`#667eea` to `#764ba2`)
- **Background**: Dark blue gradient (cinema-like atmosphere)

## Browser Compatibility

This application is compatible with all modern browsers that support:
- CSS Grid
- Flexbox
- CSS `:checked` pseudo-class
- CSS transitions

Tested on:
- Chrome
- Firefox
- Safari
- Edge

## Technical Notes

### CSS Techniques Used

1. **Hidden Checkboxes**: `display: none` for form inputs
2. **Label as Button**: Labels styled as clickable buttons
3. **Adjacent Sibling Selector**: `input:checked + label` for styling selected seats
4. **General Sibling Selector**: `input:checked ~ .modal` for showing modals
5. **CSS Transitions**: Smooth animations for hover and selection states
6. **CSS Grid**: Layout for seat map
7. **Flexbox**: Layout for movie details and legend

## License

This project is open source and available for personal use. Feel free to modify and use it for your own Cinema seat reservation.

## Author

Sebastian Fonseca

