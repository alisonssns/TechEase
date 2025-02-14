import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import SingleProduct from "./components/pages/SingleProduct";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import PageNotFound from "./components/pages/PageNotFound";
import SearchPage from "./components/pages/SearchPage";
import ShoppingCart from "./components/pages/ShoppingCart";
import ProfilePage from "./components/pages/ProfilePage";
import ProfileInfo from "./components/layout/profile/ProfileInfo";
import ProfileSecurity from "./components/layout/profile/ProfileSecurity";
import ProfileAddress from "./components/layout/profile/ProfileAddress";
import ProfileOrders from "./components/layout/profile/ProfileOrders";
import AddressForm from "./components/pages/AddressForm";
import ProtectedRoute from "./components/pages/ProtectedRoute";

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
      <Route path="/search" element={<SearchPage />} />
      <Route path="/singleProduct" element={<SingleProduct />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfileInfo />} />
          <Route path="info" element={<ProfileInfo />} />
          <Route path="security" element={<ProfileSecurity />} />
          <Route path="address" element={<ProfileAddress />} />
          <Route path="orders" element={<ProfileOrders />} />
        </Route>
        <Route path="/adressform" element={<AddressForm />} />
      </Route>
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
