import Footer from "../../Components/Molecules/Footer/Footer";
import Header from "../../Components/Molecules/Header/Header";
import './layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
