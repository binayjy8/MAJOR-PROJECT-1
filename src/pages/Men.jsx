import "../style/all.css";

export default function Men() {
  return (
    <div className="product-page">

      {/* FILTER SIDEBAR */}
      <div className="filter">
        <h3>Filters</h3>
        <a className="clear-filter">Clear</a>

        {/* PRICE FILTER */}
        <div className="filter-section">
          <p className="filter-title">Price</p>
          <input type="range" min="50" max="200" />
        </div>

        {/* CATEGORY FILTER */}
        <div className="filter-section">
          <p className="filter-title">Category</p>
          <label>
            <input type="checkbox" /> Men Clothing
          </label>
          <br />
          <label>
            <input type="checkbox" /> Women Clothing
          </label>
        </div>

        {/* RATING FILTER */}
        <div className="filter-section">
          <p className="filter-title">Rating</p>
          <label>
            <input type="radio" name="rating" /> 4 Stars & above
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

        {/* SORT FILTER */}
        <div className="filter-section">
          <p className="filter-title">Sort by</p>
          <label>
            <input type="radio" name="sort" /> Price - Low to High
          </label>
          <br />
          <label>
            <input type="radio" name="sort" /> Price - High to Low
          </label>
        </div>
      </div>

      {/* PRODUCTS AREA */}
      <div className="products-area">
        <h2 className="title">
          Showing All Products <span>(Showing 20 products)</span>
        </h2>

        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div className="product-card" key={i}>
              <div className="image-wrapper">
                <img src="/photo.jpg" alt="product" />
                <span className="wishlist">❤️</span>
              </div>

              <p className="product-name">Men Premium Jacket</p>
              <p className="product-price">₹2000</p>

              <button className={i === 1 ? "primary" : ""}>
                {i === 1 ? "Go to Cart" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
