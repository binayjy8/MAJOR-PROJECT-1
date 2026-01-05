import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { AddressProvider } from "./context/AddressContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";

// Pages
import FrontPage from "./components/FrontPage";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import CartPage from "./pages/CartPage";
import Wishlist from "./pages/Wishlist";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AddressPage from "./pages/AddressPage";
import ProfilePage from "./pages/ProfilePage";
import Electronics from "./pages/Electronics";


function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AddressProvider>
          <div className="App">
            <Navbar />

            <Routes>
              {/* Home */}
              <Route path="/" element={<FrontPage />} />

              {/* Product Listings */}
              <Route path="/product" element={<ProductPage />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/electronics" element={<Electronics />} />

              {/* Product Detail */}
              <Route path="/detail/:id" element={<ProductDetails />} />

              {/* Cart & Wishlist */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<Wishlist />} />

              {/* Checkout */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />

              {/* Profile */}
              <Route path="/address" element={<AddressPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>

            <Footer />

            <ToastContainer position="top-right" autoClose={2000} />
          </div>
        </AddressProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
