import React from 'react';
import '../styles/Header.css';

function Header() {
    return (
        <header>
            <div className="header-content">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Logo_UNIR.png/640px-Logo_UNIR.png" 
                    alt="Logo UNIR" 
                    className="logo" 
                />
                <h1>CINE UNIR</h1>
            </div>
        </header>
    );
}

export default Header;