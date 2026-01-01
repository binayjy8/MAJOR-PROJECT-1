import "../style/women.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Women() {
  const { products, loading, error, filters, setFilters } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  const womenProducts = (products || []).filter((p) =>
    (typeof p.category === "object"
      ? p.category.name
      : p.category
    )?.toLowerCase().includes("women")
  );

  const finalProducts = womenProducts
    .filter((p) => p.price <= filters.price)
    .filter((p) => (filters.rating ? p.rating >= filters.rating : true))
    .sort((a, b) => {
      if (filters.sortBy === "lowToHigh") return a.price - b.price;
      if (filters.sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      {/* FILTER */}
      <aside className="filter">
        <div className="filter-header">
          <h3>Filters</h3>
          <span
            className="clear-filter"
            onClick={() =>
              setFilters({ rating: 0, price: 5000, sortBy: "" })
            }
          >
            Clear
          </span>
        </div>

        <div className="filter-block">
          <p className="filter-title">PRICE</p>
          <input
            type="range"
            min="50"
            max="5000"
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: Number(e.target.value) })
            }
          />
          <div className="price-range-text">
            <span>₹50</span>
            <span>₹5000</span>
          </div>
        </div>

        <div className="filter-block">
          <p className="filter-title">RATING</p>
          {[4, 3, 2, 0].map((r) => (
            <label key={r} className="filter-option">
              <input
                type="radio"
                checked={filters.rating === r}
                onChange={() => setFilters({ ...filters, rating: r })}
              />
              {r === 0 ? "All" : `${r}★ & above`}
            </label>
          ))}
        </div>

        <div className="filter-block">
          <p className="filter-title">SORT BY</p>
          <label className="filter-option">
            <input
              type="radio"
              checked={filters.sortBy === "lowToHigh"}
              onChange={() =>
                setFilters({ ...filters, sortBy: "lowToHigh" })
              }
            />
            Price — Low to High
          </label>
          <label className="filter-option">
            <input
              type="radio"
              checked={filters.sortBy === "highToLow"}
              onChange={() =>
                setFilters({ ...filters, sortBy: "highToLow" })
              }
            />
            Price — High to Low
          </label>
        </div>
      </aside>

      {/* PRODUCTS */}
      <section className="products-area">
        <h2 className="page-title">
          Women's Products <span>({finalProducts.length})</span>
        </h2>

        <div className="product-grid">
          {finalProducts.map((p) => {
            const inCart = cart.some((c) => c._id === p._id);
            const inWishlist = wishlist.some((w) => w._id === p._id);

            return (
              <div className="product-card" key={p._id}>
                <div className="image-box">
                  <img src={p.imageUrl} alt={p.name} />

                  <button
                    className={`wishlist-btn ${inWishlist ? "active" : ""}`}
                    onClick={() => {
                      if (!inWishlist) {
                        addToWishlist(p);
                        toast.success("Added to wishlist");
                      }
                    }}
                    aria-label="Add to wishlist"
                  >
                    <span className="heart-icon">❤</span>
                  </button>
                </div>

                <div className="product-info">
                  <p className="name">{p.name}</p>
                  <p className="rating">★ {p.rating}</p>
                  <p className="price">₹{p.price}</p>

                  <button
                    className="cart-btn"
                    onClick={() =>
                      inCart ? navigate("/cart") : addToCart(p)
                    }
                  >
                    {inCart ? "GO TO CART" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
