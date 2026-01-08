import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { AddressProvider } from "./context/AddressContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* =========================
   LAYOUT COMPONENTS
========================= */
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";

/* =========================
   PAGES
========================= */
import FrontPage from "./components/FrontPage";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Electronics from "./pages/Electronics";
import CartPage from "./pages/CartPage";
import Wishlist from "./pages/Wishlist";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AddressPage from "./pages/AddressPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AddressProvider>
          {/* ✅ FULL WIDTH NAVBAR */}
          <Navbar />

          {/* ✅ PAGE CONTENT ONLY */}
          <main>
            <Routes>
              {/* HOME */}
              <Route path="/" element={<FrontPage />} />

              {/* PRODUCT LISTING */}
              <Route path="/product" element={<ProductPage />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/electronics" element={<Electronics />} />

              {/* PRODUCT DETAILS */}
              <Route path="/detail/:id" element={<ProductDetails />} />

              {/* CART & WISHLIST */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<Wishlist />} />

              {/* CHECKOUT */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/order-success"
                element={<OrderSuccessPage />}
              />

              {/* USER */}
              <Route path="/address" element={<AddressPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>

          {/* ✅ FULL WIDTH FOOTER */}
          <Footer />

          {/* ✅ GLOBAL TOAST */}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            pauseOnHover
            theme="light"
          />
        </AddressProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
