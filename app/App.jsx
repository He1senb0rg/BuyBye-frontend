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
import Wishlist from "./pages/Wishlist.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductEdit from "./pages/ProductEdit.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "./assets/css/style.css";

import { AuthProvider } from "./contexts/AuthContext.jsx";

import ShopEditor from "./pages/ShopEditor.jsx";

import MainLayout from "./layouts/MainLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import NotFound from "./pages/404.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import UserEdit from "./pages/UserEdit.jsx";
import Search from "./pages/Search.jsx"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="bottom-right" toastOptions={{ duration: 8000 }} />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/shop/edit" element={<ShopEditor />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<Search />} />
            
            <Route
              path="/account/profile"
              element={<AccountDetailsProfile />}
            />
            <Route
              path="/account/billing"
              element={<AccountDetailsBilling />}
            />
            <Route
              path="/account/security"
              element={<AccountDetailsSecurity />}
            />
                
            <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/create" element={<CreateCategory />} />
            <Route path="categories/edit/:id" element={<EditCategory />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/edit/:id" element={<ProductEdit />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/edit/:id" element={<UserEdit />} />
            <Route path="users/:id" element={<UserPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>


      </Router>
    </AuthProvider>
  );
}

export default App;