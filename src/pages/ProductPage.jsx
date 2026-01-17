import "../style/men.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ProductPage() {
  const { filteredProducts, loading, error, setFilters, filters, categories } =
    useProduct();

  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setFilters({
      category: [],
      rating: 0,
      price: 5000,
      sortBy: "",
      search: "",
    });
  }, [setFilters]);

  const isInCart = (id) => cart.some((item) => item._id === id);
  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  const toggleCategory = (catName) => {
    setFilters((prev) => {
      const selected = Array.isArray(prev.category) ? prev.category : [];
      const exists = selected.includes(catName);

      return {
        ...prev,
        category: exists
          ? selected.filter((c) => c !== catName)
          : [...selected, catName],
      };
    });
  };

  const toggleRating = (ratingValue) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === ratingValue ? 0 : ratingValue,
    }));
  };

  const toggleSort = (sortValue) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: prev.sortBy === sortValue ? "" : sortValue,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      rating: 0,
      price: 5000,
      sortBy: "",
      search: "",
    });
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      <aside className="filter">
        <div className="filter-header">
          <h3>Filters</h3>
          <span className="clear-filter" onClick={clearFilters}>
            Clear
          </span>
        </div>

        <div className="filter-section">
          <p className="filter-title">Category</p>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.category?.length === 0}
              onChange={() =>
                setFilters((p) => ({
                  ...p,
                  category: [],
                }))
              }
            />
            All
          </label>

          {categories?.map((cat) => {
            const checked =
              Array.isArray(filters.category) &&
              filters.category.includes(cat.name);

            return (
              <label key={cat._id} className="filter-option">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat.name)}
                />
                {cat.name}
              </label>
            );
          })}
        </div>

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

        <div className="filter-section">
          <p className="filter-title">Rating</p>

          {[4, 3, 2].map((r) => (
            <label key={r} className="filter-option">
              <input
                type="checkbox"
                checked={filters.rating === r}
                onChange={() => toggleRating(r)}
              />
              {`${r}★ & above`}
            </label>
          ))}

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.rating === 0}
              onChange={() => setFilters((p) => ({ ...p, rating: 0 }))}
            />
            All
          </label>
        </div>

        <div className="filter-section">
          <p className="filter-title">Sort By</p>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.sortBy === "lowToHigh"}
              onChange={() => toggleSort("lowToHigh")}
            />
            Price — Low to High
          </label>

          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.sortBy === "highToLow"}
              onChange={() => toggleSort("highToLow")}
            />
            Price — High to Low
          </label>
        </div>
      </aside>

      <section className="products-area">
        <h2 className="title">
          {filters.category?.length === 0
            ? "All Products"
            : filters.category.join(", ")}{" "}
          <span>({filteredProducts.length})</span>
        </h2>

        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p className="no-products">No products found</p>
          ) : (
            filteredProducts.map((product) => (
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
            ))
          )}
        </div>
      </section>
    </div>
  );
}
