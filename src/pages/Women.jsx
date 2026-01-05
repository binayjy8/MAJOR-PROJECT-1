import "../style/women.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Women() {
  const {
    filteredProducts,
    loading,
    error,
    setFilters,
    filters,
  } = useProduct();

  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  // Force Women category + reset filters
  useEffect(() => {
    setFilters({
      category: "Women",
      rating: 0,
      price: 5000,
      sortBy: "",
      search: "",
    });
  }, [setFilters]);

  const isInCart = (id) => cart.some((item) => item._id === id);
  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  if (loading) return <div className="loading">Loading women's products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      {/* ================= FILTER ================= */}
      <aside className="filter">
        <div className="filter-header">
          <h3>Filters</h3>
          <span
            className="clear-filter"
            onClick={() =>
              setFilters({
                category: "Women",
                rating: 0,
                price: 5000,
                sortBy: "",
                search: "",
              })
            }
          >
            Clear
          </span>
        </div>

        {/* PRICE */}
        <div className="filter-section">
          <p className="filter-title">Price</p>
          <input
            type="range"
            min="50"
            max="5000"
            value={filters.price}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                price: Number(e.target.value),
              }))
            }
          />
          <p className="price-value">₹{filters.price}</p>
        </div>

        {/* RATING */}
        <div className="filter-section">
          <p className="filter-title">Rating</p>

          {[4, 3, 2, 0].map((r) => (
            <label key={r} className="filter-option">
              <input
                type="radio"
                checked={filters.rating === r}
                onChange={() => setFilters((p) => ({ ...p, rating: r }))}
              />
              {r === 0 ? "All" : `${r}★ & above`}
            </label>
          ))}
        </div>

        {/* SORT */}
        <div className="filter-section">
          <p className="filter-title">Sort By</p>

          <label className="filter-option">
            <input
              type="radio"
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

      {/* ================= PRODUCTS ================= */}
      <section className="products-area">
        <h2 className="page-title">
          Women&apos;s Products <span>({filteredProducts.length})</span>
        </h2>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div
                className="image-wrapper"
                onClick={() => navigate(`/detail/${product._id}`)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />

                {/* SAME WISHLIST AS MEN */}
                <span
                  className={`wishlist ${
                    isInWishlist(product._id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInWishlist(product._id)) {
                      toast.info("Already in wishlist");
                    } else {
                      addToWishlist(product);
                      toast.success("Added to wishlist");
                    }
                  }}
                >
                  ❤
                </span>
              </div>

              <div className="product-details">
                <p className="product-name">{product.name}</p>
                <p className="product-rating">⭐ {product.rating}</p>
                <p className="current-price">₹{product.price}</p>

                <button
                  className="main-action-btn"
                  onClick={() =>
                    isInCart(product._id)
                      ? navigate("/cart")
                      : addToCart(product)
                  }
                >
                  {isInCart(product._id) ? "Go to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
