import "../style/cart.css";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, addToWishlist } =
    useCart();

  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const discount = Math.round(totalPrice * 0.1);
  const deliveryCharges = 49;
  const finalTotal = totalPrice - discount + deliveryCharges;

  const handleDecreaseQty = (item) => {
    if (item.qty === 1) {
      if (window.confirm(`Remove ${item.name}?`)) {
        removeFromCart(item._id);
        toast.info("Item removed");
      }
    } else {
      decreaseQty(item._id);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="fk-empty">
        <h2>Your cart is empty!</h2>
        <Link to="/product">
          <button>Shop now</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="fk-cart-page">
      {/* LEFT */}
      <div className="fk-cart-left">
        <div className="fk-cart-header">My Cart ({totalItems})</div>

        {cart.map((item) => (
          <div className="fk-cart-card" key={item._id}>
            <div className="fk-img">
              <img
                className="fk-cart-product-img"
                src={item.imageUrl || "/photo.jpg"}
                alt={item.name}
                loading="lazy"
              />
            </div>

            <div className="fk-details">
              <h3>{item.name}</h3>
              <p className="fk-price">₹{item.price}</p>

              <div className="fk-qty">
                <button onClick={() => handleDecreaseQty(item)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>

              <div className="fk-actions">
                <button onClick={() => removeFromCart(item._id)}>REMOVE</button>

                <button
                  onClick={() => {
                    addToWishlist(item);
                    removeFromCart(item._id);
                    toast.success("Moved to wishlist");
                  }}
                >
                  MOVE TO WISHLIST
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="fk-price-box">
        <h4>PRICE DETAILS</h4>

        <div className="fk-row">
          <span>Price ({totalItems} items)</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="fk-row green">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <div className="fk-row">
          <span>Delivery Charges</span>
          <span>₹{deliveryCharges}</span>
        </div>

        <div className="fk-total">
          <span>Total Amount</span>
          <span>₹{finalTotal}</span>
        </div>

        <button
          className="fk-place-order-btn"
          onClick={() => navigate("/checkout")}
        >
          PLACE ORDER
        </button>

        <p className="fk-save">You will save ₹{discount} on this order</p>
      </div>
    </div>
  );
}
