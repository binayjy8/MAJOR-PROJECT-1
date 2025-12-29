import { Link } from "react-router-dom";
import "../style/wishlist.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container">
        <h2>Your Wishlist is Empty</h2>
        <Link to="/product">
          <button className="wishlist-btn">Explore Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist ({wishlist.length})</h2>

      <div className="wishlist-grid">
        {wishlist.map(item => (
          <div className="wishlist-card" key={item._id}>
            <div className="wishlist-img-box">
              <img src={item.imageUrl} alt={item.name} />

              <span
                className="wishlist-heart"
                onClick={() => {
                  removeFromWishlist(item._id);
                  toast.info("Removed from wishlist");
                }}
              >
                <i className="fa-solid fa-heart"></i>
              </span>
            </div>

            <p>{item.name}</p>
            <p className="wishlist-price">₹{item.price}</p>

            <button
              className="wishlist-btn"
              onClick={() => {
                addToCart(item);
                removeFromWishlist(item._id);
                toast.success("Moved to cart");
              }}
            >
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
