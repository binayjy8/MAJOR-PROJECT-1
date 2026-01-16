import "../style/men.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Men() {
  const { filteredProducts, loading, error, setFilters, filters, categories } =
    useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  // ✅ DO NOT RESET search HERE
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category?.length ? prev.category : ["Men"], // ✅ default category
      rating: prev.rating ?? 0,
      price: prev.price ?? 5000,
      sortBy: prev.sortBy ?? "",
      // search: prev.search  ✅ keep existing search
    }));
  }, [setFilters]);

  const selectedCategory = Array.isArray(filters.category) ? filters.category : [];

  const toggleCategory = (name) => {
    setFilters((prev) => {
      const current = Array.isArray(prev.category) ? prev.category : [];
      const exists = current.includes(name);

      return {
        ...prev,
        category: exists ? current.filter((c) => c !== name) : [...current, name],
      };
    });
  };

  const isInCart = (id) => cart.some((i) => i._id === id);
  const isInWishlist = (id) => wishlist.some((i) => i._id === id);

  if (loading) return <div className="loading">Loading men products...</div>;
  if (error) return <div className="error">{error}</div>;

  const pageTitle =
    selectedCategory.length > 0 ? selectedCategory.join(", ") : "All";

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
                category: [],
                rating: 0,
                price: 5000,
                sortBy: "",
                // ✅ keep search
              }))
            }
            role="button"
          >
            Clear
          </span>
        </div>

        <div className="filter-section">
          <p className="filter-title">Category</p>

          {categories.map((cat) => (
            <div key={cat._id} className="filter-option">
              <input
                id={`cat-${cat._id}`}
                type="checkbox"
                checked={selectedCategory.includes(cat.name)}
                onChange={() => toggleCategory(cat.name)}
              />
              <label htmlFor={`cat-${cat._id}`}>{cat.name}</label>
            </div>
          ))}
        </div>

        <div className="filter-section">
          <p className="filter-title">Price</p>
          <input
            type="range"
            min="50"
            max="5000"
            step="50"
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
            <div key={r} className="filter-option">
              <input
                id={`rate-${r}`}
                type="checkbox"
                checked={filters.rating === r}
                onChange={() => setFilters((p) => ({ ...p, rating: r }))}
              />
              <label htmlFor={`rate-${r}`}>
                {r === 0 ? "All" : `${r}★ & above`}
              </label>
            </div>
          ))}
        </div>

        <div className="filter-section">
          <p className="filter-title">Sort By</p>

          <div className="filter-option">
            <input
              id="sort-low"
              type="checkbox"
              checked={filters.sortBy === "lowToHigh"}
              onChange={() =>
                setFilters((p) => ({
                  ...p,
                  sortBy: p.sortBy === "lowToHigh" ? "" : "lowToHigh",
                }))
              }
            />
            <label htmlFor="sort-low">Price — Low to High</label>
          </div>

          <div className="filter-option">
            <input
              id="sort-high"
              type="checkbox"
              checked={filters.sortBy === "highToLow"}
              onChange={() =>
                setFilters((p) => ({
                  ...p,
                  sortBy: p.sortBy === "highToLow" ? "" : "highToLow",
                }))
              }
            />
            <label htmlFor="sort-high">Price — High to Low</label>
          </div>
        </div>
      </aside>

      <section className="products-area">
        <h2 className="title">
          {pageTitle} Products <span>({filteredProducts.length})</span>
        </h2>

        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p className="no-products">No products found</p>
          ) : (
            filteredProducts.map((p) => (
              <div key={p._id} className="product-card">
                <div
                  className="image-wrapper"
                  onClick={() => navigate(`/detail/${p._id}`)}
                >
                  <img src={p.imageUrl} alt={p.name} className="product-image" />

                  <span
                    className={`wishlist ${isInWishlist(p._id) ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isInWishlist(p._id)) toast.info("Already in wishlist");
                      else {
                        addToWishlist(p);
                        toast.success("Added to wishlist");
                      }
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
                      isInCart(p._id) ? navigate("/cart") : addToCart(p)
                    }
                  >
                    {isInCart(p._id) ? "Go to Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
