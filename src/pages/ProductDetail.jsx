import "./ProductDetail.css";

export default function ProductDetail() {
  return (
    <div className="detail-container">

      <div className="detail-left">
        <img src="/photo.jpg" alt="product" className="detail-image" />
      </div>

      <div className="detail-right">
        <h2 className="detail-title">Men Premium Jacket</h2>

        <p className="detail-price">₹2000 <span className="old-price">₹3999</span></p>
        <p className="offer">50% Off</p>

        <p className="detail-description">
          This premium quality jacket is perfect for winter.
          Made from high-grade material for comfort and style.
        </p>

        <div className="detail-buttons">
          <button className="btn add-cart-btn">Add to Cart</button>
          <button className="btn wishlist-btn">❤️ Save to Wishlist</button>
        </div>
      </div>

    </div>
  );
}
