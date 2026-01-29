import React from "react";

export const Movie = ({ titulo, imagen, sinopsis, duracion, generos, puntuacion, clasificacion }) => {
    return (
        <div className="group relative bg-[#1d2520] rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[2/3] relative overflow-hidden">
                <img
                    alt={titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={imagen}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d2520] via-transparent to-transparent opacity-90"></div>


                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-400 text-sm">star</span> {puntuacion}
                </div>
            </div>

            <div className="p-5 flex flex-col gap-3 relative -mt-20 z-10">

                <div className="flex flex-wrap gap-2 mb-1">
                    {generos.map((genero, index) => (
                        <span
                            key={index}
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${index === 0
                                ? 'text-primary bg-primary/10 border border-primary/20'
                                : 'text-gray-400 bg-white/5'
                                }`}
                        >
                            {genero}
                        </span>
                    ))}
                </div>


                <h3 className="text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {titulo}
                </h3>


                <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">schedule</span> {duracion}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">explicit</span> {clasificacion}
                    </div>
                </div>


                <p className="text-gray-400 text-sm line-clamp-2 h-10 group-hover:text-gray-300 transition-colors">
                    {sinopsis}
                </p>


                <button className="mt-2 w-full h-11 bg-primary text-[#111714] font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-[#2bc466] transition-colors">
                    Seleccionar Asientos
                </button>
            </div>
        </div>
    );
}
