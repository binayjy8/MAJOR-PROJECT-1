import { Link } from "react-router-dom";
import "../style/profile.css";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user] = useState({
    name: "John Doe",
    email: "user@example.com",
    phone: "9876543210",
    joinDate: "December 2024",
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://project-backend-eta-pink.vercel.app/api/orders"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const result = await response.json();

      if (result?.data?.orders) {
        // ✅ ALWAYS show latest order first
        const sortedOrders = [...result.data.orders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Order fetch error:", err);
      setError("Unable to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-main-title">My Account</h1>

      {/* ================= WELCOME ================= */}
      <div className="welcome-section">
        <h2>Welcome back, {user.name}!</h2>
        <p>Member since {user.joinDate}</p>
      </div>

      {/* ================= PERSONAL INFO ================= */}
      <div className="profile-section">
        <h2>Personal Information</h2>

        <div className="info-grid">
          <div className="info-item">
            <label>Full Name</label>
            <p>{user.name}</p>
          </div>

          <div className="info-item">
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>

          <div className="info-item">
            <label>Phone Number</label>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="profile-section">
        <h2>Quick Actions</h2>

        <div className="action-grid">
          <Link to="/address" className="action-card">
            <span className="action-icon">📍</span>
            <h3>Manage Addresses</h3>
            <p>Add, edit or remove delivery addresses</p>
          </Link>

          <Link to="/wishlist" className="action-card">
            <span className="action-icon">❤️</span>
            <h3>My Wishlist</h3>
            <p>View your saved items</p>
          </Link>

          <Link to="/cart" className="action-card">
            <span className="action-icon">🛒</span>
            <h3>My Cart</h3>
            <p>View items in your shopping cart</p>
          </Link>

          <Link to="/product" className="action-card">
            <span className="action-icon">🛍️</span>
            <h3>Continue Shopping</h3>
            <p>Browse all products</p>
          </Link>
        </div>
      </div>

      {/* ================= ORDERS ================= */}
      <div className="profile-section">
        <h2>Recent Orders</h2>

        {loading ? (
          <p className="loading-text">Loading orders...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders yet</p>
            <Link to="/product">
              <button className="shop-now-btn">Start Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-id">
                      Order #{order.orderId}
                    </span>
                    <span className="order-date">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>

                  <span
                    className={`order-status status-${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-details">
                  <p>
                    <strong>Items:</strong>{" "}
                    {order.items.reduce((sum, i) => sum + i.qty, 0)}
                  </p>

                  <p className="order-total">
                    <strong>Total:</strong> ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
