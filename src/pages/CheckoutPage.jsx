import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../style/checkout.css";

export default function CheckoutPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [addresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      street: "123 Main Street, Apt 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true
    },
    {
      id: 2,
      name: "John Doe",
      phone: "9876543210",
      street: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      isDefault: false
    }
  ]);

  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find(addr => addr.isDefault)?.id || addresses[0]?.id
  );

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryCharges = 49;
  const finalTotal = totalPrice + deliveryCharges;

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    // Here you would normally make an API call to create the order
    alert("Order placed successfully!");
    navigate("/order-success");
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-content">
        {/* Left Section - Address & Payment */}
        <div className="checkout-left">
          {/* Delivery Address */}
          <div className="checkout-section">
            <h2>1. Select Delivery Address</h2>
            
            <div className="address-selection">
              {addresses.map(address => (
                <div 
                  key={address.id} 
                  className={`checkout-address-card ${selectedAddress === address.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === address.id}
                    onChange={() => setSelectedAddress(address.id)}
                  />
                  <div className="address-info">
                    <h3>{address.name}</h3>
                    <p>{address.phone}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="add-new-address-btn"
              onClick={() => navigate("/address")}
            >
              + Add New Address
            </button>
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <h2>2. Select Payment Method</h2>
            
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div>
                  <strong>Cash on Delivery</strong>
                  <p>Pay when you receive the product</p>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div>
                  <strong>UPI</strong>
                  <p>Pay using UPI apps</p>
                </div>
              </label>

              <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div>
                  <strong>Credit/Debit Card</strong>
                  <p>Pay securely with your card</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {cart.map(item => (
                <div key={item._id} className="summary-item">
                  <img src={item.imageUrl || "/photo.jpg"} alt={item.name} />
                  <div className="summary-item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Qty: {item.qty}</p>
                  </div>
                  <p className="item-price">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>

            <div className="summary-pricing">
              <div className="price-row">
                <span>Price ({cart.reduce((sum, item) => sum + item.qty, 0)} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="price-row">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <button 
              className="place-order-btn"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

            <p className="secure-notice">
              🔒 Your transaction is secured with SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}