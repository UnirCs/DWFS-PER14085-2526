import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Movies from './views/Movies.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Movies />
  </StrictMode>,
)
