import '../styles/styles.css';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {MovieList} from "../components/MovieList.jsx";

function Movies() {

    return (
        <div>
            <Header/>

            <div className="App">
                <MovieList/>
            </div>

            <Footer/>
        </div>
    )
}

export default Movies
