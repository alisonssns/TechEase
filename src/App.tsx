import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import SingleProduct from "./components/pages/SingleProduct";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import PageNotFound from "./components/pages/PageNotFound";
import "./App.css";

function Layout() {
  const location = useLocation();
  const hideHeaderOnPaths = ["/login"];

  return (
    <>
      {!hideHeaderOnPaths.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:categoria" element={<Home />} />
        <Route path="/singleProduct/:nome/:id" element={<SingleProduct />} />
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
