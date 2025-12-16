import "../style/productDetails.css";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";


export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading } = useProduct();
  const { addToCart, addToWishlist, wishlist } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0 && id) {

      const foundProduct = products.find(p => p._id === id);
      setProduct(foundProduct);
    }
  }, [products, id]);

  const isInWishlist = product && wishlist.some(item => item._id === product._id);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`${product.name} added to cart`);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      if (isInWishlist) {
        toast.info("Already in wishlist");
      } else {
        addToWishlist(product);
        alert(`${product.name} added to wishlist!`);
      }
    }
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading product details...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <Link to="/product">
          <button>Back to Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="left-section">
        <div className="image-box">
          <img src={product.imageUrl || "/photo.jpg"} alt={product.name} />
          <span 
            className="wishlist-icon"
            onClick={handleToggleWishlist}
            style={{ cursor: 'pointer' }}
          >
            {isInWishlist ? "❤️" : "🤍"}
          </span>
        </div>

        <div>
          <button className="buy-btn" onClick={handleAddToCart}>
            Buy Now
          </button>
          <button className="cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="middle-section">
        <h2>{product.name}</h2>

        <div className="rating">
          {"⭐".repeat(Math.floor(product.rating || 0))} {product.rating || "No rating"}
        </div>

        <div className="price-box">
          <span className="price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="original">₹{product.originalPrice}</span>
              <span className="discount">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            </>
          )}
        </div>

        <div className="quantity-section">
          <p>Quantity:</p>
          <button onClick={decreaseQty}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQty}>+</button>
        </div>

        <div className="sizes">
          <p>Size:</p>
          <button 
            className={selectedSize === "S" ? "active" : ""}
            onClick={() => setSelectedSize("S")}
          >
            S
          </button>
          <button 
            className={selectedSize === "M" ? "active" : ""}
            onClick={() => setSelectedSize("M")}
          >
            M
          </button>
          <button 
            className={selectedSize === "L" ? "active" : ""}
            onClick={() => setSelectedSize("L")}
          >
            L
          </button>
          <button 
            className={selectedSize === "XL" ? "active" : ""}
            onClick={() => setSelectedSize("XL")}
          >
            XL
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <span>📦</span>
            <p>10 Days Returnable</p>
          </div>
          <div className="feature">
            <span>💵</span>
            <p>Pay on Delivery</p>
          </div>
          <div className="feature">
            <span>🔒</span>
            <p>Secure Payment</p>
          </div>
        </div>

        <div className="stock-status">
          {product.inStock ? (
            <span style={{ color: 'green' }}>✓ In Stock</span>
          ) : (
            <span style={{ color: 'red' }}>✗ Out of Stock</span>
          )}
        </div>
      </div>

      <div className="right-section">
        <h3>Description:</h3>
        {product.description ? (
          <p>{product.description}</p>
        ) : (
          <ul>
            <li>Premium quality product</li>
            <li>Comfortable and stylish</li>
            <li>Perfect for everyday wear</li>
            <li>Available in multiple sizes</li>
          </ul>
        )}
      </div>
    </div>
  );
}
