import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { AddressProvider } from "./context/AddressContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";

// Import Pages
import FrontPage from "./components/FrontPage";
import ProductDe from "./pages/ProductDe";
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

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AddressProvider>
          <div className="App">
            <Navbar />
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<FrontPage />} />
              
              {/* Product Pages */}
              <Route path="/product" element={<ProductDe />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/kids" element={<Kids />} />
              
              {/* Single Product Detail */}
              <Route path="/detail/:id" element={<ProductDetails />} />
              
              {/* Cart & Wishlist */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              
              {/* Checkout & Order */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              
              {/* User Profile & Address */}
              <Route path="/address" element={<AddressPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            
            <Footer />
            
            {/* Toast Notifications */}
            <ToastContainer 
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </AddressProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;