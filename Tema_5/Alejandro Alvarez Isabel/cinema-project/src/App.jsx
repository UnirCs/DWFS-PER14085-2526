import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  { Overview } from "./views/Overview.jsx";

function App() {

    return (
        <div className="App">
            <Overview />
        </div>
    );
}

export default App;