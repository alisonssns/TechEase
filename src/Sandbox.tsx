import "./App.css";
import Home from "./components/pages/Home";
import SingleProduct from "./components/pages/SingleProduct";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";

function Sandbox() {
    return (
        <>
            <Header />
            <SingleProduct />
            <Footer />
        </>
    );
}

export default Sandbox;