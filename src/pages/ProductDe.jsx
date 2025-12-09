import "../style/productDe.css";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { products, loading, error, filters, setFilters } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false;
    }
    
    // Rating filter
    if (filters.rating > 0 && product.rating < filters.rating) {
      return false;
    }
    
    // Price filter
    if (product.price > filters.price) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === "lowToHigh") {
      return a.price - b.price;
    }
    if (filters.sortBy === "highToLow") {
      return b.price - a.price;
    }
    return 0;
  });

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({ ...prev, rating }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, price: Number(e.target.value) }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      rating: 0,
      price: 5000,
      sortBy: "",
    });
  };

  const isInCart = (id) => cart.some(item => item._id === id);
  const isInWishlist = (id) => wishlist.some(item => item._id === id);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-page">
      {/* FILTER SIDEBAR */}
      <div className="filter">
        <h3>Filters</h3>
        <a className="clear-filter" onClick={clearFilters}>Clear</a>

        {/* PRICE FILTER */}
        <div className="filter-section">
          <p className="filter-title">Price: ₹{filters.price}</p>
          <div className="price-range">
            <span className="price-label">50</span>
            <input 
              type="range" 
              min="50" 
              max="5000" 
              value={filters.price}
              onChange={handlePriceChange}
              className="range-slider" 
            />
            <span className="price-label">5000</span>
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="filter-section">
          <p className="filter-title">Category</p>
          <label>
            <input 
              type="checkbox" 
              checked={filters.category.includes("Men")}
              onChange={() => handleCategoryChange("Men")}
            /> Men Clothing
          </label>
          <br />
          <label>
            <input 
              type="checkbox"
              checked={filters.category.includes("Women")}
              onChange={() => handleCategoryChange("Women")}
            /> Women Clothing
          </label>
        </div>

        {/* RATING FILTER */}
        <div className="filter-section">
          <p className="filter-title">Rating</p>
          <label>
            <input 
              type="radio" 
              name="rating" 
              checked={filters.rating === 4}
              onChange={() => handleRatingChange(4)}
            /> 4 Stars & above
          </label>
          <br />
          <label>
            <input 
              type="radio" 
              name="rating"
              checked={filters.rating === 3}
              onChange={() => handleRatingChange(3)}
            /> 3 Stars & above
          </label>
        </div>

        {/* SORT FILTER */}
        <div className="filter-section">
          <p className="filter-title">Sort by</p>
          <label>
            <input 
              type="radio" 
              name="sort"
              checked={filters.sortBy === "lowToHigh"}
              onChange={() => handleSortChange("lowToHigh")}
            /> Price - Low to High
          </label>
          <br />
          <label>
            <input 
              type="radio" 
              name="sort"
              checked={filters.sortBy === "highToLow"}
              onChange={() => handleSortChange("highToLow")}
            /> Price - High to Low
          </label>
        </div>
      </div>

      {/* PRODUCTS AREA */}
      <div className="products-area">
        <h2 className="title">
          Showing All Products <span>(Showing {sortedProducts.length} products)</span>
        </h2>

        <div className="product-grid">
          {sortedProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="image-wrapper">
                <img src={product.imageUrl || "/photo.jpg"} alt={product.name} />
                <span 
                  className="wishlist"
                  onClick={() => 
                    isInWishlist(product._id) 
                      ? alert("Already in wishlist") 
                      : addToWishlist(product)
                  }
                >
                  {isInWishlist(product._id) ? "❤️" : "🤍"}
                </span>
              </div>

              <div className="product-details">
                <p className="product-name">{product.name}</p>
                <p className="product-rating">⭐ {product.rating || 0}</p>
                
                <p className="product-pricing">
                  <span className="current-price">₹{product.price}</span>
                </p>
                
                <Link to={`/detail/${product._id}`}>
                  <button className={`main-action-btn ${isInCart(product._id) ? "primary" : ""}`}>
                    {isInCart(product._id) ? "Go to Cart" : "Add to Cart"}
                  </button>
                </Link>
                
                <button 
                  className="secondary-action-btn"
                  onClick={() => 
                    isInWishlist(product._id) 
                      ? alert("Already in wishlist") 
                      : addToWishlist(product)
                  }
                >
                  {isInWishlist(product._id) ? "Remove from Wishlist" : "Save to Wishlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

