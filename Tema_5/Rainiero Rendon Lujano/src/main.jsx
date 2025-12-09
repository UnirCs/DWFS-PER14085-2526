import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Header/>
    <App />
    <Footer/>
    </BrowserRouter>
  </StrictMode>,
)
