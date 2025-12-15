import React from "react";

export const Footer = () => {
    return (
        <footer className="bg-[#0b100e] border-t border-[#29382f] py-12">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-white">
                            <div className="size-6 text-primary">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-lg font-bold">Cine Unir</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Experimente la mejor experiencia en entretenimiento cinematográfico con tecnología de vanguardia y comodidad.
                        </p>
                        <div className="flex gap-4 text-gray-400">
                            <a className="hover:text-primary transition-colors" href="#"><span
                                className="material-symbols-outlined">public</span></a>
                            <a className="hover:text-primary transition-colors" href="#"><span
                                className="material-symbols-outlined">share</span></a>
                            <a className="hover:text-primary transition-colors" href="#"><span
                                className="material-symbols-outlined">mail</span></a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-bold text-base">Enlaces Rapidos</h3>
                        <div className="flex flex-col gap-2">
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors" href="#">Peliculas</a>
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors" href="#">Cines Alternativos</a>
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors" href="#">Comida &amp;
                                Bebidas</a>
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors" href="#">Ventas Corporativas</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-bold text-base">Legal</h3>
                        <div className="flex flex-col gap-2">
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors" href="#">Politica de Privacidad</a>
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors" href="#">Terminos de Servicio</a>
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors" href="#">Politica de Cookies</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-white font-bold text-base">Contactenos</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-3 text-gray-400 text-sm">
                                <span className="material-symbols-outlined text-primary text-lg mt-0.5">call</span>
                                <span>+57 1 234 5678</span>
                            </div>
                            <div className="flex items-start gap-3 text-gray-400 text-sm">
                                <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                                <span>Calle 100 # 8A - 55<br />Bogotá, Colombia</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="mt-12 pt-8 border-t border-[#29382f] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2024 Cine Unir. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Designed with Tailwind CSS</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

