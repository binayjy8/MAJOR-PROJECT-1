import "./style/style.css";
import Navbar from "./components/Navbar";
import AllProducts from "./components/FrontPage";
import Men from "./pages/Men";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <div>
        <Navbar />
        <AllProducts />
        <Men />
      </div>
    </div>
  );
}

export default App;
