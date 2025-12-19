import Footer from './components/Footer'
import Header from './components/Header'
import GlobalRouter from "./routes/GlobalRouter";
import { CinemaContext } from './context/CinemaContext'
import { useMovies } from './hooks/useMovies'

function App() {
    const movies = useMovies();

    return (
        <div className="App">
            <CinemaContext.Provider value={{ movies }}>
                <Header />
                <GlobalRouter>
                </GlobalRouter>
                <Footer />
            </CinemaContext.Provider>
        </div>
    );
}

export default App
