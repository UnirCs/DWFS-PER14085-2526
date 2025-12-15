// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff9800',
        },
        background: {
            default: '#f5f5f5',
        },
    },
});

export default theme;
