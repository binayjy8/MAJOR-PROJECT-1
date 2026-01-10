import "../style/men.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Electronics() {
  const {
    filteredProducts,
    loading,
    error,
    setFilters,
    filters,
    categories,
  } = useProduct();

  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: "Electronics" }));
  }, [setFilters]);

  const isInCart = (id) => cart.some((i) => i._id === id);
  const isInWishlist = (id) => wishlist.some((i) => i._id === id);

  if (loading) return <div className="loading">Loading electronics...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      <aside className="filter">
        <div className="filter-header">
          <h3>Filters</h3>
          <span
            className="clear-filter"
            onClick={() =>
              setFilters((p) => ({
                ...p,
                rating: 0,
                price: 5000,
                sortBy: "",
                search: "",
              }))
            }
          >
            Clear
          </span>
        </div>

        <div className="filter-section">
          <p className="filter-title">Category</p>
          {categories.map((cat) => (
            <label key={cat._id} className="filter-option">
              <input
                type="checkbox"
                checked={filters.category === cat.name}
                onChange={() =>
                  setFilters((p) => ({ ...p, category: cat.name }))
                }
              />
              {cat.name}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <p className="filter-title">Price</p>
          <input
            type="range"
            min="50"
            max="5000"
            value={filters.price}
            onChange={(e) =>
              setFilters((p) => ({ ...p, price: Number(e.target.value) }))
            }
          />
          <p className="price-value">₹{filters.price}</p>
        </div>

        <div className="filter-section">
          <p className="filter-title">Rating</p>
          {[4, 3, 2, 0].map((r) => (
            <label key={r} className="filter-option">
              <input
                type="checkbox"
                checked={filters.rating === r}
                onChange={() => setFilters((p) => ({ ...p, rating: r }))}
              />
              {r === 0 ? "All" : `${r}★ & above`}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <p className="filter-title">Sort By</p>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.sortBy === "lowToHigh"}
              onChange={() =>
                setFilters((p) => ({ ...p, sortBy: "lowToHigh" }))
              }
            />
            Price — Low to High
          </label>
          <label className="filter-option">
            <input
              type="radio"
              checked={filters.sortBy === "highToLow"}
              onChange={() =>
                setFilters((p) => ({ ...p, sortBy: "highToLow" }))
              }
            />
            Price — High to Low
          </label>
        </div>
      </aside>

      <section className="products-area">
        <h2 className="title">
          Electronics <span>({filteredProducts.length})</span>
        </h2>

        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div key={p._id} className="product-card">
              <div
                className="image-wrapper"
                onClick={() => navigate(`/detail/${p._id}`)}
              >
                <img src={p.imageUrl} alt={p.name} className="product-image" />
                <span
                  className={`wishlist ${
                    isInWishlist(p._id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    isInWishlist(p._id)
                      ? toast.info("Already in wishlist")
                      : addToWishlist(p);
                  }}
                >
                  ❤
                </span>
              </div>

              <div className="product-details">
                <p className="product-name">{p.name}</p>
                <p className="product-rating">⭐ {p.rating}</p>
                <p className="current-price">₹{p.price}</p>

                <button
                  className="main-action-btn"
                  onClick={() =>
                    isInCart(p._id)
                      ? navigate("/cart")
                      : addToCart(p)
                  }
                >
                  {isInCart(p._id) ? "Go to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
