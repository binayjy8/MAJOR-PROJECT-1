import "../style/productDe.css";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


export default function ProductDetail() {
  const { products, loading, error, filters, setFilters, searchTerm, categories } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  // ✅ ADD SAFETY CHECK - Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Filter products based on selected filters
  const filteredProducts = safeProducts.filter(product => {
    // Search filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Category filter - Handle both string and object
    if (filters.category.length > 0) {
      const productCategory = typeof product.category === 'object' 
        ? product.category.name 
        : product.category;
      
      if (!filters.category.includes(productCategory)) {
        return false;
      }
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

  // ✅ Check if no products after loading
  if (!loading && safeProducts.length === 0) {
    return (
      <div className="error">
        <h2>No products found</h2>
        <p>Please check your backend connection</p>
      </div>
    );
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

        {/* CATEGORY FILTER - Dynamic from Database */}
        <div className="filter-section">
          <p className="filter-title">Category</p>
          {Array.isArray(categories) && categories.map(cat => (
            <label key={cat._id}>
              <input 
                type="checkbox" 
                checked={filters.category.includes(cat.name)}
                onChange={() => handleCategoryChange(cat.name)}
              /> {cat.name}
              <br />
            </label>
          ))}
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
          <br />
          <label>
            <input 
              type="radio" 
              name="rating"
              checked={filters.rating === 2}
              onChange={() => handleRatingChange(2)}
            /> 2 Stars & above
          </label>
          <br />
          <label>
            <input 
              type="radio" 
              name="rating"
              checked={filters.rating === 0}
              onChange={() => handleRatingChange(0)}
            /> All
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
                <Link to={`/detail/${product._id}`}>
                  <img src={product.imageUrl || "/photo.jpg"} alt={product.name} />
                </Link>
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
                
                <button 
                  className={`main-action-btn ${isInCart(product._id) ? "primary" : ""}`}
                  onClick={() => {
                    if (isInCart(product._id)) {      
                    navigate("/cart");
                    } else {
                      addToCart(product);
                      alert(`${product.name} added to cart!`);
                    }
                  }}
                >
                  {isInCart(product._id) ? "Go to Cart" : "Add to Cart"}
                </button>
                
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