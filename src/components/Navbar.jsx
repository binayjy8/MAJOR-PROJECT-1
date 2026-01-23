import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import "../style/navbar.css";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart, wishlist } = useCart();
  const { filters, setFilters } = useProduct();
  const navigate = useNavigate();
  const location = useLocation();

  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const [query, setQuery] = useState(filters.search || "");

  useEffect(() => {
    setQuery(filters.search || "");
  }, [filters.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();

    setFilters((prev) => ({
      ...prev,
      search: trimmed,
    }));

    if (location.pathname !== "/product") {
      navigate("/product");
    }

    setQuery("");
  };

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

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" type="submit">
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
}
