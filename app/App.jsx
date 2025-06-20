import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Cart from "./pages/Cart.jsx";
import ProductPage from "./pages/products/ProductPage.jsx";
import AccountDetailsProfile from "./pages/account/AccountDetailsProfile.jsx";
import AccountDetailsBilling from "./pages/account/AccountDetailsBilling.jsx";
import AccountDetailsSecurity from "./pages/account/AccountDetailsSecurity.jsx";
import AccountDetailsReviews from "./pages/account/AccountDetailsReviews.jsx";
import CreateProduct from "./pages/products/CreateProduct.jsx";
import Dashboard from './pages/DashBoard';
import EditCategory from "./pages/EditCategory.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import CreateCategory from "./pages/CreateCategory.jsx";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist.jsx";
import ProductsPage from "./pages/products/ProductsPage.jsx";
import ProductEdit from "./pages/products/ProductEdit.jsx";

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
import CreateShop from "./pages/CreateShop.jsx"
import ShopsPage from "./pages/ShopsPages.jsx";
import AboutUs from "./pages/AboutUsPage.jsx"
import NovidadesPage from "./pages/NovidadesPage.jsx";
import SalesPage from "./pages/SalesPage.jsx";

function App() {
  return (
    <AuthProvider>
          <Router>
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 8000 }}
            />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/latest" element={<NovidadesPage />} />
                <Route path="/sales" element={<SalesPage />} />




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
                  path="/account/reviews"
                  element={<AccountDetailsReviews />}
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

              <Route path="/admin" element={<ProtectedRoute> <AdminLayout /> </ProtectedRoute>}>
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="categories/create" element={<CreateCategory />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="categories/edit/:id" element={<EditCategory />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/edit/:id" element={<ProductEdit />} />
                <Route path="products/create" element={<CreateProduct />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="users/edit/:id" element={<UserEdit />} />
                <Route path="users/:id" element={<UserPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/:id" element={<OrderPage />} />
                <Route path="shops" element={<ShopsPage />} />
                <Route path="shops/create" element={<CreateShop />} />
                <Route path="shops/edit/:id" element={<ShopEditor />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
    </AuthProvider>
  );
}

export default App;
