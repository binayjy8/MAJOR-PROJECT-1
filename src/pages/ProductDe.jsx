import "../style/productDe.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function ProductDe() {
  const { products, loading, error } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  const isInCart = (id) => cart.some(item => item._id === id);
  const isInWishlist = (id) => wishlist.some(item => item._id === id);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Something went wrong</div>;

  return (
    <div className="products-area">
      <h2 className="title">
        Showing All Products <span>(showing {products.length} products)</span>
      </h2>

      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            
            <div className="image-wrapper">
              <img src={product.imageUrl} alt={product.name} />

              <span
                className={`wishlist ${isInWishlist(product._id) ? "active" : ""}`}
                onClick={() => {
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
                onClick={() => {
                  if (isInCart(product._id)) {
                    navigate("/cart");
                  } else {
                    addToCart(product);
                    toast.success("Added to cart");
                  }
                }}
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

