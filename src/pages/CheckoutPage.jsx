import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import { useNavigate } from "react-router-dom";
import "../style/checkout.css";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { cart, setCart } = useCart();
  const { addresses } = useAddress();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id
  );
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryCharges = 49;
  const finalTotal = totalPrice + deliveryCharges;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      const selectedAddr = addresses.find((a) => a.id === selectedAddress);
      const orderId =
        "ORD" + Math.random().toString(36).substring(2, 9).toUpperCase();

      const orderData = {
        orderId,
        address: selectedAddr,
        items: cart,
        paymentMethod,
        totalAmount: finalTotal,
        status: "Confirmed",
      };

      const response = await fetch(
        "https://project-backend-eta-pink.vercel.app/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        setCart([]);
        toast.success("Order placed successfully!");
        navigate("/order-success", { state: { orderId } });
      } else {
        toast.error("Failed to place order");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!cart.length) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">
        {/* LEFT */}
        <div className="checkout-left">
          {/* ADDRESS */}
          <div className="checkout-card">
            <h2>Delivery Address</h2>

            {addresses.map((address) => (
              <label
                key={address.id}
                className={`address-card ${
                  selectedAddress === address.id ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === address.id}
                  onChange={() => setSelectedAddress(address.id)}
                />
                <div>
                  <strong>{address.name}</strong>
                  <p>{address.phone}</p>
                  <p>
                    {address.street}, {address.city}, {address.state} -{" "}
                    {address.pincode}
                  </p>
                </div>
              </label>
            ))}

            <button
              className="secondary-btn"
              onClick={() => navigate("/address")}
            >
              + Add New Address
            </button>
          </div>

          {/* PAYMENT */}
          <div className="checkout-card">
            <h2>Payment Method</h2>

            {[
              { id: "cod", label: "Cash on Delivery" },
              { id: "upi", label: "UPI" },
              { id: "card", label: "Credit / Debit Card" },
            ].map((method) => (
              <label
                key={method.id}
                className={`payment-card ${
                  paymentMethod === method.id ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method.label}
              </label>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <div className="order-summary">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div key={item._id} className="summary-item">
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">
                    {item.qty} × ₹{item.price}
                  </p>
                </div>
                <strong>₹{item.qty * item.price}</strong>
              </div>
            ))}

            <div className="price-breakup">
              <div>
                <span>Items Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <div>
                <span>Delivery</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <div className="total">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>

            <p className="secure-text">
              🔒 Secure payments · Easy returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
