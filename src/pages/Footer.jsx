import { Link } from "react-router-dom";
import "../style/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopEasy</h3>
          <p>
            Your one-stop shop for fashion and electronics. Quality products at
            affordable prices.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Facebook">
              📘
            </a>
            <a href="#" aria-label="Twitter">
              🐦
            </a>
            <a href="#" aria-label="Instagram">
              📷
            </a>
            <a href="#" aria-label="LinkedIn">
              💼
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">All Products</Link>
            </li>
            <li>
              <Link to="/men">Men</Link>
            </li>
            <li>
              <Link to="/women">Women</Link>
            </li>
            <li>
              <Link to="/kids">Kids</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <Link to="/profile">My Account</Link>
            </li>
            <li>
              <Link to="/cart">Shopping Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/address">Manage Addresses</Link>
            </li>
            <li>
              <a href="#">Track Order</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>📧 support@shopeasy.com</li>
            <li>📞 +91 9876543210</li>
            <li>📍 Mumbai, Maharashtra, India</li>
            <li>⏰ Mon-Sat: 9AM - 6PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 ShopEasy. All rights reserved.</p>

        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms of Service</a>
          <span>|</span>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
