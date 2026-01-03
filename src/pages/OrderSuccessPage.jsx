import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/orderSuccess.css";
import { useCart } from "../context/CartContext";
import { useEffect, useRef } from "react";

export default function OrderSuccessPage() {
  const { clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const clearedRef = useRef(false);

  // 🔹 Get real orderId from checkout page
  const orderId = location.state?.orderId;

  // 🔹 Redirect if accessed directly
  useEffect(() => {
    if (!orderId) {
      navigate("/product");
    }
  }, [orderId, navigate]);

  // 🔹 Clear cart only once
  useEffect(() => {
    if (!clearedRef.current) {
      clearCart();
      clearedRef.current = true;
    }
  }, [clearCart]);

  const estimatedDelivery = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!orderId) return null;

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-id">Order ID: {orderId}</p>

        <div className="success-info">
          <p>Thank you for your purchase! Your order has been confirmed.</p>
          <p className="delivery-estimate">
            Estimated Delivery: <strong>{estimatedDelivery}</strong>
          </p>
        </div>

        <div className="success-actions">
          <Link to="/profile">
            <button className="primary-btn">View Orders in Profile</button>
          </Link>
          <Link to="/product">
            <button className="secondary-btn">Continue Shopping</button>
          </Link>
        </div>

        <div className="order-updates">
          <div className="update-item">
            <span className="update-icon">📧</span>
            <span>Order confirmation sent to your email</span>
          </div>
          <div className="update-item">
            <span className="update-icon">📱</span>
            <span>You'll receive SMS tracking updates</span>
          </div>
        </div>
      </div>
    </div>
  );
}
