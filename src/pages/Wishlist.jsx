import "../style/wishlist.css";

export default function Wishlist() {
  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>

      <div className="wishlist-grid">

        {/* Card 1 */}
        <div className="wishlist-card">
          <div className="wishlist-img-box">
            <img src="/photo.jpg" alt="Men Premium Jacket" />
            <span className="wishlist-heart">❤️</span>
          </div>

          <div className="wishlist-info">
            <p className="wishlist-name">Men Premium Jacket</p>
            <p className="wishlist-price">₹2000</p>
          </div>

          <button className="wishlist-btn">Move to Cart</button>
        </div>

      </div>
    </div>
  );
}

