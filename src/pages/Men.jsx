import "../style/men.css";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Men() {
  const { products, loading, error, filters, setFilters } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  const safeProducts = Array.isArray(products) ? products : [];

  const menProducts = safeProducts.filter((product) => {
    const productCategory =
      typeof product.category === "object"
        ? product.category.name
        : product.category;
    return productCategory?.toLowerCase().includes("men");
  });

  const filteredProducts = menProducts.filter((product) => {
    if (filters.rating > 0 && product.rating < filters.rating) return false;
    if (product.price > filters.price) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === "lowToHigh") return a.price - b.price;
    if (filters.sortBy === "highToLow") return b.price - a.price;
    return 0;
  });

  const isInCart = (id) => cart.some((item) => item._id === id);
  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      {/* FILTER */}
      <div className="filter">
        <h3>Filters</h3>
        <span
          className="clear-filter"
          onClick={() =>
            setFilters({ rating: 0, price: 5000, sortBy: "" })
          }
        >
          Clear
        </span>

        <div className="filter-section">
          <p className="filter-title">Price</p>
          <input
            type="range"
            min="50"
            max="5000"
            value={filters.price}
            onChange={(e) =>
              setFilters({ ...filters, price: Number(e.target.value) })
            }
          />
        </div>

        <div className="filter-section">
          <p className="filter-title">Rating</p>
          {[4, 3, 2, 0].map((r) => (
            <label key={r}>
              <input
                type="radio"
                checked={filters.rating === r}
                onChange={() => setFilters({ ...filters, rating: r })}
              />
              {r === 0 ? "All" : `${r} Stars & above`}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <p className="filter-title">Sort By</p>
          <label>
            <input
              type="radio"
              checked={filters.sortBy === "lowToHigh"}
              onChange={() =>
                setFilters({ ...filters, sortBy: "lowToHigh" })
              }
            />
            Price - Low to High
          </label>
          <label>
            <input
              type="radio"
              checked={filters.sortBy === "highToLow"}
              onChange={() =>
                setFilters({ ...filters, sortBy: "highToLow" })
              }
            />
            Price - High to Low
          </label>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="products-area">
        <h2 className="title">
          Showing Men's Products <span>({sortedProducts.length})</span>
        </h2>

        <div className="product-grid">
          {sortedProducts.map((product) => (
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
                  className="wishlist"
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 critical fix
                    if (isInWishlist(product._id)) {
                      toast.info("Already in wishlist");
                    } else {
                      addToWishlist(product);
                      toast.success("Added to wishlist");
                    }
                  }}
                >
                  {isInWishlist(product._id) ? "❤️" : "🤍"}
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
      </div>
    </div>
  );
}
