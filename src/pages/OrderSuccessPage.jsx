import { Link } from "react-router-dom";
import "../style/orderSuccess.css";

export default function OrderSuccessPage() {
  const orderId = "ORD" + Math.random().toString(36).substring(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-id">Order ID: {orderId}</p>
        
        <div className="success-info">
          <p>Thank you for your purchase!</p>
          <p>Your order has been confirmed and will be delivered by:</p>
          <p className="delivery-date">{estimatedDelivery}</p>
        </div>

        <div className="success-actions">
          <Link to="/profile">
            <button className="primary-btn">View Order Details</button>
          </Link>
          <Link to="/product">
            <button className="secondary-btn">Continue Shopping</button>
          </Link>
        </div>

        <div className="order-updates">
          <p>📧 Order confirmation has been sent to your email</p>
          <p>📱 You will receive SMS updates about your order</p>
        </div>
      </div>
    </div>
  );
}