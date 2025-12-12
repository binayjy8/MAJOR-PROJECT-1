import { Link } from "react-router-dom";
import "../style/profile.css";
import { useState } from "react";

export default function ProfilePage() {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210"
  });

  const [orders] = useState([
    {
      id: "ORD123456",
      date: "2024-12-10",
      total: 2499,
      status: "Delivered",
      items: 2
    },
    {
      id: "ORD123455",
      date: "2024-12-05",
      total: 1599,
      status: "Shipped",
      items: 1
    },
    {
      id: "ORD123454",
      date: "2024-11-28",
      total: 3299,
      status: "Delivered",
      items: 3
    }
  ]);

  return (
    <div className="profile-container">
      <h1 className="profile-main-title">My Account</h1>

      {/* Personal Information Section */}
      <div className="profile-section">
        <div className="section-header">
          <h2>Personal Information</h2>
          <button className="edit-btn">Edit</button>
        </div>
        
        <div className="info-grid">
          <div className="info-item">
            <label>Name</label>
            <p>{user.name}</p>
          </div>
          <div className="info-item">
            <label>Email</label>
            <p>{user.email}</p>
          </div>
          <div className="info-item">
            <label>Phone</label>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
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

      {/* Order History Section */}
      <div className="profile-section">
        <h2>Order History</h2>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders yet</p>
            <Link to="/product">
              <button className="shop-now-btn">Start Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="order-details">
                  <p><strong>Items:</strong> {order.items}</p>
                  <p className="order-total"><strong>Total:</strong> ₹{order.total}</p>
                </div>
                
                <div className="order-actions">
                  <button className="view-details-btn">View Details</button>
                  {order.status === "Delivered" && (
                    <button className="reorder-btn">Reorder</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}