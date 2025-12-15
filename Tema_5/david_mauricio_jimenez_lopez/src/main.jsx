import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MovieList } from './views/MovieList.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieList />
  </StrictMode>,
)
