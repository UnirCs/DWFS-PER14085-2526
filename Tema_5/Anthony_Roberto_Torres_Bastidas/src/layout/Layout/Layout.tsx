import React from 'react';
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    );
};

export default Layout;