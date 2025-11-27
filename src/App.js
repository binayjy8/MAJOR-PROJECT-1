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

        <Routes>
        <Route to="/" element={<AllProducts/>}/>
        <Route to="/men" element={<Men />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
