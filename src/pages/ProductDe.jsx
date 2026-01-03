import "../style/productDe.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ProductDe() {
  const { filteredProducts, loading, error, setFilters } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  // ✅ Ensure Electronics category is applied
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: "Electronics",
    }));
  }, [setFilters]);

  const isInCart = (id) => cart.some((item) => item._id === id);
  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  if (loading) return <div className="loading">Loading electronics...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-area">
      <h2 className="title">
        Electronics <span>({filteredProducts.length})</span>
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
                <i className="fa-solid fa-heart"></i>
              </span>
            </div>

            <div className="product-details">
              <p className="product-name">{product.name}</p>
              <p className="product-price">₹{product.price}</p>

              <button
                className={`cart-btn ${isInCart(product._id) ? "go" : ""}`}
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
  );
}
