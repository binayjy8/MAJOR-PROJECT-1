import "./style/style.css";
import Navbar from "./components/Navbar";
import AllProducts from "./components/FrontPage";
import AllProduct from "./pages/AllProduct";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div>
        <Navbar />
        <AllProducts />
        <AllProduct />
      </div>
    </div>
  );
}

export default App;
