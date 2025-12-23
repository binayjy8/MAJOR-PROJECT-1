import { Link } from "react-router-dom";
import "../style/wishlist.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
    toast.success(`${item.name} moved to cart!`);
  };

  const handleRemove = (item) => {
    removeFromWishlist(item._id);
    toast.success(`${item.name} removed from wishlist!`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container">
        <h2 className="wishlist-title">Your Wishlist is Empty</h2>
        <Link to="/product">
          <button className="wishlist-btn">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist ({wishlist.length})</h2>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div className="wishlist-card" key={item._id}>
            <div className="wishlist-img-box">
              <img src={item.imageUrl || "/photo.jpg"} alt={item.name} />
              <span 
                className="wishlist-heart"
                onClick={() => handleRemove(item)}
                style={{ cursor: 'pointer' }}
              >
                ❤️
              </span>
            </div>

            <div className="wishlist-info">
              <p className="wishlist-name">{item.name}</p>
              <p className="wishlist-price">₹{item.price}</p>
              <p className="product-rating">⭐ {item.rating || 0}</p>
            </div>

            <button 
              className="wishlist-btn"
              onClick={() => handleMoveToCart(item)}
            >
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}