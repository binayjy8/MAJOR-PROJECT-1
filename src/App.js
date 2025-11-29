import "./style/style.css";
import Navbar from "./components/Navbar";
import AllProducts from "./components/FrontPage";
import Men from "./pages/Men";
import ProductDetail from "./pages/ProductDetail";
import { Routes, Route } from "react-router-dom";

import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

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
          </Routes>
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;

