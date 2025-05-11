import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Cart from "./pages/Cart.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AccountDetailsProfile from "./pages/account/AccountDetailsProfile.jsx";
import AccountDetailsBilling from "./pages/account/AccountDetailsBilling.jsx";
import AccountDetailsSecurity from "./pages/account/AccountDetailsSecurity.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import EditCategory from "./pages/EditCategory.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import CreateCategory from "./pages/CreateCategory.jsx";
import Checkout from './pages/Checkout';

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

import "./assets/css/style.css";

import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="bottom-right" toastOptions={{ duration: 8000 }} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/account/profile" element={<AccountDetailsProfile />} />
          <Route path="/account/billing" element={<AccountDetailsBilling />} />
          <Route
            path="/account/security"
            element={<AccountDetailsSecurity />}
          />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/category/create" element={<CreateCategory />} />
          <Route path="/category/edit/:id" element={<EditCategory />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
export default App;
