import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import SingleProduct from "./components/pages/SingleProduct";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import SearchPage from "./components/pages/SearchPage";
import ShoppingCart from "./components/pages/ShoppingCart";
import ProfilePage from "./components/pages/ProfilePage";
import ProfileInfo from "./components/layout/profile/ProfileInfo";
import ProfileSecurity from "./components/layout/profile/ProfileSecurity";
import ProfileAddress from "./components/layout/profile/ProfileAddress";
import ProfileOrders from "./components/layout/profile/ProfileOrders";
import DashBoard from "./components/layout/admin/DashBoard"
import AddressForm from "./components/pages/AddressForm";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import AboutUs from "./components/pages/AboutUs";
import Help from "./components/pages/Help";
import AdminDashboard from "./components/pages/AdminDashboard";

function Layout() {
  const location = useLocation();
  const pathname = (location.pathname.indexOf('/', 1) !== -1) ? location.pathname.substring(0, location.pathname.indexOf('/', 1)) : location.pathname;
  const hideHeaderOnPaths = ["/login", "/admin-dashboard-x7a9b3f2z"];
  const hideFooterOnPaths = ["/admin-dashboard-x7a9b3f2z"];

  return (
    <>
      {!hideHeaderOnPaths.includes(pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/singleProduct" element={<SingleProduct />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />

        <Route path="/admin-dashboard-x7a9b3f2z" element={<AdminDashboard />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="products" element={<DashBoard />} />
          <Route path="orders" element={<DashBoard />} />
          <Route path="clients" element={<DashBoard />} />
          <Route path="reports" element={<DashBoard />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/addressform" element={<AddressForm />} />
          <Route path="/profile" element={<ProfilePage />}>

            <Route index element={<Navigate to="info" />} />
            <Route path="info" element={<ProfileInfo />} />
            <Route path="security" element={<ProfileSecurity />} />
            <Route path="address" element={<ProfileAddress />} />
            <Route path="orders" element={<ProfileOrders />} />
          </Route>

        </Route>
      </Routes>
      {!hideFooterOnPaths.includes(pathname) && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}