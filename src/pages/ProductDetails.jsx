import "../style/productDetails.css";
import { Link, link } from "react-router-dom";

export default function ProductDetails() {
  return (
    <div className="product-details-container">

      {/* LEFT IMAGE */}
      <div className="left-section">
        <div className="image-box">
          <img src="/photo.jpg" alt="product" />
          <span className="wishlist-icon">🤍</span>
        </div>

        <Link to="/wishlist">
            <button className="buy-btn">Buy Now</button>
            <button className="cart-btn">Add to Cart</button>
        </Link>
        
      </div>

      {/* MIDDLE SECTION */}
      <div className="middle-section">
        <h2>Men Premium Jacket Quilted Hooded Winter Jacket</h2>

        <div className="rating">⭐ ⭐ ⭐ ⭐ 4.5</div>

        <div className="price-box">
          <span className="price">₹2000</span>
          <span className="original">₹3999</span>
          <span className="discount">50% off</span>
        </div>

        <div className="quantity-section">
          <p>Quantity:</p>
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>

        <div className="sizes">
          <p>Size:</p>
          <button>S</button>
          <button className="active">M</button>
          <button>L</button>
          <button>XL</button>
        </div>

        <div className="features">
          <div className="feature">
            <img src="/icon1.png" />
            <p>10 Days Returnable</p>
          </div>
          <div className="feature">
            <img src="/icon2.png" />
            <p>Pay on Delivery</p>
          </div>
          <div className="feature">
            <img src="/icon3.png" />
            <p>Secure Payment</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">
        <h3>Description:</h3>
        <ul>
          <li>Style Redefined: Versatile bomber jacket.</li>
          <li>All-Weather Ready.</li>
          <li>Unparalleled Comfort.</li>
          <li>Travel Friendly.</li>
        </ul>
      </div>

    </div>
  );
}
