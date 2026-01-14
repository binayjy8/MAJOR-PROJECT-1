import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import "../style/navbar.css";

export default function Navbar() {
  const { cart, wishlist } = useCart();
  const { filters, setFilters } = useProduct();
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* TOP ROW */}
        <div className="navbar-top">
          <Link to="/" className="navbar-logo">
            ShopEasy
          </Link>

          <div className="navbar-right">
            <button
              className="login-btn"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <Link to="/wishlist" className="nav-icon">
              ❤
              {wishlist.length > 0 && (
                <span className="badge">{wishlist.length}</span>
              )}
            </Link>

            <Link to="/cart" className="nav-icon cart-icon">
              🛒
              {totalCartItems > 0 && (
                <span className="badge cart-badge">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* SEARCH ROW */}
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

