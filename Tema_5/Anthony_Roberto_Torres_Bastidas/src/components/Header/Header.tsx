import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import logoUnir from '../../assets/logoUnir.svg';
import styles from './Header.module.css';
const Header: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box
                        component="img"
                        alt="Logo"
                        src={logoUnir}
                        className={styles.logo}
                    />
                    <Typography variant="h6" component="div" className={styles.title}>
                        CARTELERA UNIR
                    </Typography>
                    <Box className={styles.controlsContainer}>
                        <Button
                            color="inherit"
                            startIcon={<LoginIcon />}
                        >
                            Login
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;