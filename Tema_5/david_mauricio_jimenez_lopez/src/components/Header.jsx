import React from "react";

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-[#111714]/95 backdrop-blur-md border-b border-[#29382f]">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-10 py-3">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-8 w-full lg:w-auto justify-between lg:justify-start">
                        <div className="flex items-center gap-3 text-white">
                            <div className="size-8 text-primary">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">Cine Unir</h2>
                        </div>

                        <button className="lg:hidden text-white">
                            <span className="material-symbols-outlined">menu</span>
                        </button>

                        <nav className="hidden lg:flex items-center gap-6">
                            <a className="text-white text-sm font-medium hover:text-primary transition-colors"
                                href="#">Peliculas</a>
                            <a className="text-gray-300 text-sm font-medium hover:text-primary transition-colors"
                                href="#">Cine Alternativo</a>
                            <a className="text-gray-300 text-sm font-medium hover:text-primary transition-colors"
                                href="#">Comida</a>
                            <a className="text-gray-300 text-sm font-medium hover:text-primary transition-colors"
                                href="#">Ventas Corporativas</a>
                        </nav>
                    </div>
                    <div className="hidden lg:flex flex-1 justify-end gap-6 items-center w-full lg:w-auto">

                        <div className="relative w-full max-w-[280px]">
                            <div
                                className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#9eb7a8]">
                                <span className="material-symbols-outlined text-[20px]"></span>
                            </div>
                            <input
                                className="block w-full p-2.5 pl-10 text-sm text-white bg-[#29382f] border-none rounded-xl placeholder-[#9eb7a8] focus:ring-2 focus:ring-primary focus:bg-[#1d2520] transition-all"
                                placeholder="Buscar películas..." type="text" />
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="flex items-center justify-center h-10 px-5 bg-primary text-[#111714] text-sm font-bold rounded-full hover:bg-[#2bc466] transition-colors">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

