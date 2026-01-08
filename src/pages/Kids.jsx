import "../style/kids.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Kids() {
  const { filteredProducts, loading, error, setFilters, filters } =
    useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  // ✅ SET ONLY CATEGORY (DO NOT RESET FILTERS)
  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: "Kids" }));
  }, [setFilters]);

  const isInCart = (id) => cart.some((i) => i._id === id);
  const isInWishlist = (id) => wishlist.some((i) => i._id === id);

  if (loading) return <div className="loading">Loading kids products...</div>;
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
              }))
            }
          >
            Clear
          </span>
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
          <p>₹{filters.price}</p>
        </div>

        <div className="filter-section">
          <p className="filter-title">Rating</p>
          {[4, 3, 2, 0].map((r) => (
            <label key={r}>
              <input
                type="radio"
                checked={filters.rating === r}
                onChange={() => setFilters((p) => ({ ...p, rating: r }))}
              />
              {r === 0 ? "All" : `${r}★ & above`}
            </label>
          ))}
        </div>
      </aside>

      <section className="products-area">
        <h2>Kids Products ({filteredProducts.length})</h2>

        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div key={p._id} className="product-card">
              <div onClick={() => navigate(`/detail/${p._id}`)}>
                <img src={p.imageUrl} alt={p.name} />
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

              <p>{p.name}</p>
              <p>₹{p.price}</p>

              <button
                onClick={() =>
                  isInCart(p._id) ? navigate("/cart") : addToCart(p)
                }
              >
                {isInCart(p._id) ? "Go to Cart" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
