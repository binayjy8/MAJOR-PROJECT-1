import "../style/cart.css";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    addToWishlist,
  } = useCart();

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item._id);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your Cart is Empty</h2>
        <Link to="/product">
          <button className="place-order-btn">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart ({totalItems})</h2>

      <div className="cart-content">
        {/* LEFT */}
        <div className="cart-left">
          {cart.map((item) => (
            <div className="cart-product-box" key={item._id}>
              <div className="cart-image-box">
                <img
                  src={item.imageUrl || "/photo.jpg"}
                  alt={item.name}
                />
              </div>

              <div className="cart-product-info">
                <h3>{item.name}</h3>
                <p className="cart-price">₹{item.price}</p>

                <div className="cart-qty-row">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(item._id)}
                  >
                    −
                  </button>

                  <span className="qty-number">{item.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(item._id)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-actions">
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    REMOVE
                  </button>

                  <button
                    className="cart-move-btn"
                    onClick={() => handleMoveToWishlist(item)}
                  >
                    MOVE TO WISHLIST
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="price-box">
          <h3 className="price-head">PRICE DETAILS</h3>

          <div className="price-row">
            <span>Price ({totalItems} items)</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="price-row">
            <span>Delivery Charges</span>
            <span>₹49</span>
          </div>

          <div className="price-total">
            <span>Total Amount</span>
            <span>₹{totalPrice + 49}</span>
          </div>

          <button
            className="place-order-btn"
            onClick={() => navigate("/checkout")}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
