import "../style/productDetail.css";
import { Link } from "react-router-dom";

export default function ProductDetail() {
  
  const products = [
    {
      id: 1,
      name: "Men Premium Jacket",
      price: 2000,
      originalPrice: 3999,
      discount: "50% off",
      inCart: true,
      inWishlist: true,
    },
    {
      id: 2,
      name: "Men Premium Jacket",
      price: 2000,
      originalPrice: 3999,
      discount: "50% off",
      inCart: false,
      inWishlist: false,
    },
    {
      id: 3,
      name: "Men Premium Jacket",
      price: 2000,
      originalPrice: 3999,
      discount: "50% off",
      inCart: false,
      inWishlist: false,
    },
    {
      id: 4,
      name: "Men Premium Jacket",
      price: 2000,
      originalPrice: 3999,
      discount: "50% off",
      inCart: false,
      inWishlist: false,
    },
  ];

  return (
    <div className="product-page">
      {/* FILTER SIDEBAR - NO CHANGES */}
      <div className="filter">
        <h3>Filters</h3>
        <a className="clear-filter">Clear</a>

        {/* PRICE FILTER */}
        <div className="filter-section">
          <p className="filter-title">Price</p>
          <div className="price-range">
             <span className="price-label">50</span>
             <input type="range" min="50" max="200" className="range-slider" />
             <span className="price-label">150</span>
             <span className="price-label">200</span>
          </div>
        </div>

        {/* CATEGORY FILTER - ADDED CHECKED STATE for Men Clothing */}
        <div className="filter-section">
          <p className="filter-title">Category</p>
          <label>
            <input type="checkbox" checked readOnly /> Men Clothing
          </label>
          <br />
          <label>
            <input type="checkbox" /> Women Clothing
          </label>
        </div>

        {/* RATING FILTER - ADDED CHECKED STATE for 4 Stars */}
        <div className="filter-section">
          <p className="filter-title">Rating</p>
          <label>
            <input type="radio" name="rating" checked readOnly /> 4 Stars & above
          </label>
          <br />
          <label>
            <input type="radio" name="rating" /> 3 Stars & above
          </label>
          <br />
          <label>
            <input type="radio" name="rating" /> 2 Stars & above
          </label>
          <br />
          <label>
            <input type="radio" name="rating" /> 1 Star & above
          </label>
        </div>

        {/* SORT FILTER - ADDED CHECKED STATE for Price - Low to High */}
        <div className="filter-section">
          <p className="filter-title">Sort by</p>
          <label>
            <input type="radio" name="sort" checked readOnly /> Price - Low to High
          </label>
          <br />
          <label>
            <input type="radio" name="sort" /> Price - High to Low
          </label>
        </div>
      </div>

      
      <div className="products-area">
        <h2 className="title">
          Showing All Products <span>(Showing 20 products)</span>
        </h2>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="image-wrapper">
                <img src="/photo.jpg" alt="product" />
                <span className="wishlist">❤️</span>
              </div>

              <div className="product-details">
                <p className="product-name">{product.name}</p>
                
                <p className="product-pricing">
                  <span className="current-price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                </p>
                <p className="product-discount">{product.discount}</p>
                
                <button className={`main-action-btn ${product.inCart ? "primary" : ""}`}>
                  {product.inCart ? "Go to Cart" : "Add to Cart"}
                </button>
                
                <button className="secondary-action-btn">
                  {product.inWishlist ? "Remove from Wishlist" : "Save to Wishlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
