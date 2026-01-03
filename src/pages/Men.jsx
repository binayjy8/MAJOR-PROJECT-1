import "../style/men.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Men() {
  const { filteredProducts, loading, error, setFilters } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  // ✅ Apply Men category safely
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: "Men",
    }));
  }, [setFilters]);

  const isInCart = (id) => cart.some((item) => item._id === id);
  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  if (loading) return <div className="loading">Loading men's products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      {/* FILTER */}
      <div className="filter">
        <h3>Filters</h3>
        <span
          className="clear-filter"
          onClick={() =>
            setFilters({
              category: "Men",
              rating: 0,
              price: 5000,
              sortBy: "",
            })
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
            value={5000}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="filter-section">
          <p className="filter-title">Rating</p>
          {[4, 3, 2, 0].map((r) => (
            <label key={r}>
              <input
                type="radio"
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: r,
                  }))
                }
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
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: "lowToHigh",
                }))
              }
            />
            Price - Low to High
          </label>
          <label>
            <input
              type="radio"
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: "highToLow",
                }))
              }
            />
            Price - High to Low
          </label>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="products-area">
        <h2 className="title">
          Men's Products <span>({filteredProducts.length})</span>
        </h2>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div
                className="image-wrapper"
                onClick={() => navigate(`/detail/${product._id}`)}
              >
                <img src={product.imageUrl} alt={product.name} />

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
      </div>
    </div>
  );
}
