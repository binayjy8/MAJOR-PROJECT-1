import "../style/cart.css";

export default function CartPage() {
  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart (1)</h2>

      <div className="cart-content">

        {/* LEFT SECTION – PRODUCT CARD */}
        <div className="cart-product-box">

          <div className="cart-image-box">
            <img src="/photo.jpg" alt="Men Premium Jacket" />
          </div>

          <div className="cart-product-info">
            <h3>Men Premium Jacket</h3>
            <p className="cart-price">₹2000 <span className="cart-old-price">₹3999</span></p>
            <p className="cart-offer">50% off</p>

            <div className="cart-qty-row">
              Quantity:
              <button className="qty-btn">-</button>
              <span className="qty-number">1</span>
              <button className="qty-btn">+</button>
            </div>

            <button className="cart-remove-btn">Remove From Cart</button>
            <button className="cart-move-btn">Move to Wishlist</button>
          </div>

        </div>

        {/* RIGHT SECTION – PRICE DETAILS */}
        <div className="price-box">
          <h3 className="price-head">PRICE DETAILS</h3>

          <div className="price-row">
            <span>Price (1 item)</span>
            <span>₹2000</span>
          </div>

          <div className="price-row">
            <span>Discount</span>
            <span className="discount">- ₹1000</span>
          </div>

          <div className="price-row">
            <span>Delivery Charges</span>
            <span>₹499</span>
          </div>

          <div className="price-total">
            <span>Total Amount</span>
            <span>₹2499</span>
          </div>

          <p className="save-note">You will save ₹1000 on this order</p>

          <button className="place-order-btn">PLACE ORDER</button>
        </div>

      </div>
    </div>
  );
}
