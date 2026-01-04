import { Link } from "react-router-dom";
export const Header = () =>{

    return (
        <div>
            <header>
             <div className="header-logo">
             <h1>🎬 Tema 5 Cinema </h1>
             </div>
            

             <nav className="header-nav">
                <Link to="/">Inicio</Link>
             </nav>
            </header>
        </div>
    )
}

