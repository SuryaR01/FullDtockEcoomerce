import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout.jsx";
import DashBoard from "./Admin/DashBoard.jsx";
import AdProduct from "./Admin/AdProduct.jsx";
import UserList from "./Admin/UserList.jsx";
import Settings from "./Admin/Settings.jsx";
import Register from "./User/Register.jsx";
import Login from "./User/Login.jsx";
import ViewProduct from "./Product/ViewProduct.jsx";
import Product from "../../server/model/productModel.js";
import Category from "./Components/Category.jsx";
import Home from "./Home/Home.jsx";
import AllProducts from "./Product/AllProducts.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { Toaster } from "react-hot-toast";
import Protected from "./Pages/Protected.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Contact from "./contact/Contact.jsx";
import Error from "./Error/Error.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CheckoutProvider } from "./context/CheckoutContext.jsx";
import Checkout from "./Product/Checkout.jsx";
import PayMent from "./Product/PayMent.jsx";
import OrderHistory from "./Product/orderHistry.jsx";
import MyProfile from "./User/MyProfile.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <Toaster position="top-right" />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<App />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/Product/:id" element={<ViewProduct />} />
                  <Route path="/allproduct" element={<AllProducts />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<PayMent />} />
                  <Route path="/orderhistory" element={<OrderHistory />} />
                  <Route path="/profile" element={<MyProfile />} />
                </Route>

                <Route path="/product" element={<Product />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="/admin" element={<DashBoard />} />
                  <Route path="/admin/products" element={<AdProduct />} />
                  <Route path="/admin/users" element={<UserList />} />
                  <Route path="/admin/setting" element={<Settings />} />
                </Route>

                <Route path="/register" element={<Register />} />
                <Route path="/userlogin" element={<Login />} />

                <Route
                  path="/protected"
                  element={
                    <PrivateRoute>
                      <Protected />
                    </PrivateRoute>
                  }
                />

                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </FavoritesProvider>
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
