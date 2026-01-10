import React from 'react';
import './App.css'; 
import Header from './components/Header';
import Footer from './components/Footer';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <MovieList />
      </main>
      <Footer />
    </div>
  );
}

export default App;