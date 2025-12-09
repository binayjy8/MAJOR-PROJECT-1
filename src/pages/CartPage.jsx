import "../style/cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, addToWishlist } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item._id);
    alert(`${item.name} moved to wishlist!`);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">Your Cart is Empty</h2>
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
        {/* LEFT SECTION – PRODUCT CARDS */}
        <div style={{ flex: 1 }}>
          {cart.map((item) => (
            <div className="cart-product-box" key={item._id}>
              <div className="cart-image-box">
                <img src={item.imageUrl || "/photo.jpg"} alt={item.name} />
              </div>

              <div className="cart-product-info">
                <h3>{item.name}</h3>
                <p className="cart-price">₹{item.price}</p>

                <div className="cart-qty-row">
                  Quantity:
                  <button className="qty-btn" onClick={() => decreaseQty(item._id)}>-</button>
                  <span className="qty-number">{item.qty}</span>
                  <button className="qty-btn" onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <button 
                  className="cart-remove-btn"
                  onClick={() => {
                    removeFromCart(item._id);
                    alert(`${item.name} removed from cart!`);
                  }}
                >
                  Remove From Cart
                </button>
                <button 
                  className="cart-move-btn"
                  onClick={() => handleMoveToWishlist(item)}
                >
                  Move to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SECTION – PRICE DETAILS */}
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

          <button className="place-order-btn">PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
}
