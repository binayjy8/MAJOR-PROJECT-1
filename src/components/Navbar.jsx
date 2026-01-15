import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import "../style/navbar.css";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { cart, wishlist } = useCart();
  const { filters, setFilters } = useProduct();
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-top">
          <Link to="/" className="navbar-logo">
            ShopEasy
          </Link>

          <div className="navbar-right">
            <button className="login-btn" onClick={() => navigate("/profile")}>
              <FaUserCircle className="profile-icon" />
              <span className="profile-text">Profile</span>
            </button>

            <Link to="/wishlist" className="nav-icon">
              <FaHeart className="nav-svg-icon" />
              {wishlist.length > 0 && (
                <span className="badge">{wishlist.length}</span>
              )}
            </Link>

            <Link to="/cart" className="nav-icon">
              <FaShoppingCart className="nav-svg-icon" />
              {totalCartItems > 0 && (
                <span className="badge cart-badge">{totalCartItems}</span>
              )}
            </Link>
          </div>
        </div>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
          />
          <button className="search-btn">🔍</button>
        </div>
      </div>
    </nav>
  );
}
