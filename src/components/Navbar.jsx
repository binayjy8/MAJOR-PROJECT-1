import "../style/style.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";

export default function Navbar() {
  const { cart, wishlist } = useCart();
  const { searchTerm, setSearchTerm } = useProduct();

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MyShoppingSite
        </Link>

        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="navbar-actions">
          <button className="login-button">Login</button>

          <Link to="/wishlist" className="navbar-icon-link">
            <div className="icon-wrapper">
              {wishlist.length > 0 && (
                <span className="icon-badge">{wishlist.length}</span>
              )}
              <span className="icon">🤍</span>
            </div>
          </Link>

          <Link to="/cart" className="navbar-icon-link">
            <div className="icon-wrapper">
              {totalCartItems > 0 && (
                <span className="icon-badge cart-badge">{totalCartItems}</span>
              )}
              <span className="icon">🛒</span>
              <span className="cart-label">Cart</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}