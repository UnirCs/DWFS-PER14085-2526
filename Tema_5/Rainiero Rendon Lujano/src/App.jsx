
  import './App.css'
  import { MovieList } from './components/Movielist'
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import { MovieDetail } from './components/MovieDetails';

  function App() {


    return (
      <>

      <Routes>
        <Route path='/' element={<MovieList/>}/>
        <Route path='/movie/:id' element={<MovieDetail/>}/>
      </Routes>

        
      </>
    )
  }

  export default App
