import "./style/style.css";
import Navbar from "./components/Navbar";
import AllProducts from "./components/FrontPage";
import Men from "./pages/Men";
import ProductDetail from "./pages/ProductDe";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/CartPage";
import { useEffect } from "react";
import AddressPage from "./pages/AddressPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/men" element={<Men />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/detail/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;

