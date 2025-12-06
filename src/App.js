import "./style/style.css";
import Navbar from "./components/Navbar";
import AllProducts from "./components/FrontPage";
import Men from "./pages/Men";
import ProductDetail from "./pages/ProductDetail";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router-dom";

import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/CartPage";
import useFetch from "./pages/useFetch";

function App() {
  const { data, loading, error, fetchData } = useFetch("https://project-backend-eta-pink.vercel.app/")
  return (
    <ProductProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/men" element={<Men />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="detail" element={<ProductDetails />}/>
            <Route path="/wishlist" element={< Wishlist/>}/>
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;

