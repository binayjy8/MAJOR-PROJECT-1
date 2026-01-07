import "../style/productDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, loading } = useProduct();
  const { addToCart, addToWishlist, wishlist, cart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    if (products.length) {
      const found = products.find((p) => p._id === id);
      setProduct(found || null);
    }
  }, [products, id]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="error">Product not found</div>;

  const isInWishlist = wishlist.some((i) => i._id === product._id);
  const isInCart = cart.some((i) => i._id === product._id);

  const handleAddToCart = () => {
    addToCart({ ...product, qty: quantity, size: selectedSize });
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    addToCart({ ...product, qty: quantity, size: selectedSize });
    navigate("/checkout");
  };

  return (
    <div className="product-details-container">
      {/* LEFT */}
      <div className="left-section">
        <div className="image-box">
          <img src={product.imageUrl} alt={product.name} />

          <span
            className={`wishlist-icon ${isInWishlist ? "active" : ""}`}
            onClick={() => {
              if (isInWishlist) {
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

        <button className="buy-btn" onClick={handleBuyNow}>
          Buy Now
        </button>

        <button
          className="cart-btn"
          onClick={() =>
            isInCart ? navigate("/cart") : handleAddToCart()
          }
        >
          {isInCart ? "Go to Cart" : "Add to Cart"}
        </button>
      </div>

      {/* RIGHT (MAIN CONTENT) */}
      <div className="middle-section">
        <h2>{product.name}</h2>

        <div className="rating">⭐ {product.rating}</div>

        <div className="price-box">
          <span className="price">₹{product.price}</span>
          <span className="discount">50% off</span>
        </div>

        {/* QUANTITY */}
        <div className="quantity-section">
          <p>Quantity</p>
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        {/* SIZE */}
        <div className="sizes">
          <p>Size</p>
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={selectedSize === size ? "active" : ""}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* FEATURES */}
        <div className="features">
          <p>✔ 10 Days Return</p>
          <p>✔ Pay on Delivery</p>
          <p>✔ Secure Payment</p>
        </div>

        {/* ✅ DESCRIPTION   */}
        <div className="description-section">
          <h3>Description</h3>
          <p>
            {product.description ||
              "Premium quality product with great comfort."}
          </p>
        </div>
      </div>
    </div>
  );
}
