import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';

function App() {
    return (
        <div>
            <Header />
            <main>
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Cartelera Actual</h2>
                <MovieList />
            </main>
            <Footer />
        </div>
    );
}

export default App;
