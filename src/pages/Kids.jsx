import "../style/kids.css";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Kids() {
  const { products, loading, error, filters, setFilters } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  const safeProducts = Array.isArray(products) ? products : [];

  const kidsProducts = safeProducts.filter((product) => {
    const category =
      typeof product.category === "object"
        ? product.category.name
        : product.category;
    return category?.toLowerCase().includes("kid");
  });

  const filteredProducts = kidsProducts.filter((product) => {
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      {/* FILTER */}
      <div className="filter">
        <h3>Filters</h3>
        <span
          className="clear-filter"
          onClick={() =>
            setFilters({ category: [], rating: 0, price: 5000, sortBy: "" })
          }
        >
          Clear
        </span>

        <div className="filter-section">
          <p className="filter-title">Price: ₹{filters.price}</p>
          <input
            type="range"
            min="50"
            max="5000"
            value={filters.price}
            onChange={(e) =>
              setFilters((p) => ({ ...p, price: Number(e.target.value) }))
            }
          />
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="products-area">
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <div className="product-card" key={product._id}>
              {/* IMAGE */}
              <div className="image-wrapper">
                <Link to={`/detail/${product._id}`}>
                  <img src={product.imageUrl} alt={product.name} />
                </Link>
              </div>

              {/* WISHLIST — OUTSIDE IMAGE */}
              <span
                className="wishlist"
                onClick={() => {
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

              {/* DETAILS */}
              <div className="product-details">
                <p className="product-name">{product.name}</p>
                <p className="product-rating">⭐ {product.rating}</p>
                <p className="price">₹{product.price}</p>

                <button
                  className="main-btn"
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
