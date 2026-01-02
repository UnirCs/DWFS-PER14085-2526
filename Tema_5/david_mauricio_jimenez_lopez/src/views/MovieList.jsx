import React from "react";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { Movie } from "../components/Movie.jsx";

export const MovieList = () => {
    const peliculas = [
        {
            titulo: "Dune: Parte Dos",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5I3S8fXFxA7dYAARhLrVoInTAo2B79SkOtbKVVxnELY6SikmG6GT9Qhs60RFUIRqA36axkP0Z3KeBzsnzrvy1AsojC7YSD7I5p2f3nYimk5B1n5Nia8xvA190G5L6mP0HMAUfeMDwerLF2ZoaHJSvCOkjVrLUBIkcRGIat1PI4USPQviLNWRBEoJwrgv0nhEp4gj6armpFkzW93RjAYOUyaeLefQsaAmSwreXpC1--0IVaew79wUhPjseVdbVIBGydGO8uZ4hpDJY",
            sinopsis: "Paul Atreides se une con Chani y los Fremen en un camino de venganza contra los conspiradores que destruyeron a su familia.",
            duracion: "2h 46m",
            generos: ["Ciencia Ficción", "Aventura"],
            puntuacion: 4.8,
            clasificacion: "PG-13"
        },
        {
            titulo: "Kung Fu Panda 4",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCHLpOO34PV81Q6nYPMh4AkkY5_O8rOIybTMflv15P8jDbkMnipNInzt5WTYe6hFmtjUfM0NeXuzzH2KeHxUvSgCpdEabBkwUpsKgPt7uGtDRAeYypXwDmVIGYouUl2nXzTk_rUhT_Sa5O-gji4JUy5BVDJN2svIJY9KwGGNLlgK1KVEftgmh79g2zpxh-nPCz0A5SDz81GYSNKBmyJrj1CMtuS215l4Qqk8bxjdqpJs7HXi2e8jlsejLTJmfi0cZS-9BAYoqObnN9",
            sinopsis: "Po se prepara para convertirse en el líder espiritual de su Valle de la Paz.",
            duracion: "1h 34m",
            generos: ["Animación", "Acción"],
            puntuacion: 4.5,
            clasificacion: "PG"
        },
        {
            titulo: "Guerra Civil",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKeeygI0oG2vniAKnKhXimYgYskToBG3Asbl5-NL2IALd6JZ_R8q8fAQ8ew4ZXSEeFNg46RP1waPNKL6bT5GZXFVBtikUGV36tKfV6C2n1vTH9JFcwvAqSdNYsyslGyb-FEjfKmStzn_v2bPRD0lBGA929CDV0n3jVcrLIJakOyqwj7fmI2ay3LQ7ZLiRkG9aksHM2DrydkTtkn-omTQa_G-H_afwPutbL72i4wbvMXI7Euqg49Z6BFh5IyoOMl0rcr56d3wLBZbIu",
            sinopsis: "Un viaje a través de una América distópica del futuro, siguiendo a un equipo de periodistas.",
            duracion: "1h 49m",
            generos: ["Acción", "Suspenso"],
            puntuacion: 4.2,
            clasificacion: "R"
        },
        {
            titulo: "Godzilla x Kong",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsukJ3AjEgk6xee1t5UaLmY5YTmd-iYvfKtrimXIntKALA9giGkkJH_nt9kguCKqapIieqn-2zyUNqVRupQxOmVy6W_pl0F6KMYsetPB4e6LVyg8aQ8YQvPJ7DanCj249829GHedqBXCEkKz8zcysV2T1YH7zZCE3PLNMILuAC4J2K3geoHU3Y3Ph-ezvlkxtswtODa2ygcLOxTFjUUrETM5FsfFUbwQnHiMaGiJ_A7ljnLdMyC8dw6kQu1fWMXcf7WEXKrOdqP30Q",
            sinopsis: "El nuevo imperio se levanta mientras dos titanes chocan en una batalla épica.",
            duracion: "1h 55m",
            generos: ["Fantasía", "Acción"],
            puntuacion: 3.9,
            clasificacion: "PG-13"
        },
        {
            titulo: "Ghostbusters: Imperio Helado",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmxz4ckHWq83y-ud1hrX6BSQ7wi1ds2PW4W0McPIbeBnTzMIK_jBVkcY7whsBpr-4w8atDWq370FGFtG0pHs1_6PwbYrPj02fcWEey0kCnp6r0fiHb5zzUDNzkr1WjOEJq2xrqQ73tKNAoB_XdH438WrJUY0vjDpwzU7CbLELDYWk01IiqjFXGDw605U-MqH6Zm4gjxLssn6soXo1OskVzeOz-O6t6N9esLDj5xNMbF8JrGp5U3iZkh2cqSPViRX1XLQx78D1Kc3Wv",
            sinopsis: "La familia Spengler regresa a donde todo comenzó: la icónica estación de bomberos de Nueva York.",
            duracion: "1h 55m",
            generos: ["Comedia", "Fantasía"],
            puntuacion: 4.1,
            clasificacion: "PG-13"
        },
        {
            titulo: "Hombre Mono",
            imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPyaxwcJLvTTqWccXyCbBCeZ22loFjQipnGJUic-M8XOkdV4braSDCT1aAuL7Yc7azsj0CQWgeTXGWGhzX4GciNfbBbTf_2qWURxyMLkZmtWDt3xIrCm3A6VtwUQNo9JGz_pFPqpKVERk69yl8dpdWClKatiN-Z0dYFD0_y-7bILUNG9Uq8pKH0LimKPMRPGbwnRTBzW1t9Md8T-v-OQAMI4f2KX_XiBLJOUn5tNNyp98a4MhQmwSW-WBTVlos_CVkcxdSLNv2j11",
            sinopsis: "Un joven anónimo desata una campaña de venganza contra los líderes corruptos.",
            duracion: "2h 01m",
            generos: ["Acción", "Suspenso"],
            puntuacion: 4.3,
            clasificacion: "R"
        }
    ];


    return (
        <div>
            <Header />
            <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-10 py-6 space-y-12">
                <section id="MovieList">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {peliculas.map((pelicula, index) => (
                            <Movie
                                key={index}
                                titulo={pelicula.titulo}
                                imagen={pelicula.imagen}
                                sinopsis={pelicula.sinopsis}
                                duracion={pelicula.duracion}
                                generos={pelicula.generos}
                                puntuacion={pelicula.puntuacion}
                                clasificacion={pelicula.clasificacion}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}