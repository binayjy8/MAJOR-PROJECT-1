import "../style/style.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";

export default function Navbar() {
  const { cart, wishlist } = useCart();
  const { searchTerm, setSearchTerm } = useProduct();

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo">MyShoppingSite</div>
      </Link>

      <div className="search-box">
        <i className="search-icon">🔍</i>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="user-controls">
        <button className="login-btn">Login</button>

        <Link to="/wishlist" style={{ textDecoration: 'none' }}>
          <div className="icon-box">
            <span className="badge">{wishlist.length}</span>
            🤍
          </div>
        </Link>

        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <div className="icon-box">
            <span className="badge">{totalCartItems}</span>
            🛒
          </div>
        </Link>

        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="cart-text">Cart</span>
        </Link>
      </div>
    </div>
  );
}