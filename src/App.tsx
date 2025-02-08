import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import SingleProduct from "./components/pages/SingleProduct";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import PageNotFound from "./components/pages/PageNotFound";
import "./App.css";
import SearchPage from "./components/pages/SearchPage";
import ShoppingCart from "./components/pages/ShoppingCart";

function Layout() {
  const location = useLocation();
  const hideHeaderOnPaths = ["/login"];

  return (
    <>
      {!hideHeaderOnPaths.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/singleProduct" element={<SingleProduct />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
