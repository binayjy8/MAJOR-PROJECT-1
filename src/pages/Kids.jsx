import "../style/all.css";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Kids() {
  const { products, loading, error, filters, setFilters } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  const safeProducts = Array.isArray(products) ? products : [];

  // Filter for Kids' pr
  const kidsProducts = safeProducts.filter(product => {
    const productCategory = typeof product.category === 'object' 
      ? product.category.name 
      : product.category;
    return productCategory?.toLowerCase().includes('kids') || 
           productCategory?.toLowerCase().includes('children') ||
           productCategory?.toLowerCase().includes('kid');
  });

  const filteredProducts = kidsProducts.filter(product => {
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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === "lowToHigh") {
      return a.price - b.price;
    }
    if (filters.sortBy === "highToLow") {
      return b.price - a.price;
    }
    return 0;
  });

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
          Showing Kids' Products <span>(Showing {sortedProducts.length} products)</span>
        </h2>

        {sortedProducts.length === 0 ? (
          <div className="no-products">
            <p>No kids products found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="product-grid">
            {sortedProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="image-wrapper">
                  <Link to={`/detail/${product._id}`}>
                    <img src={product.imageUrl} alt={product.name} />
                  </Link>
                  <span 
                    className="wishlist"
                    onClick={() => {
                      if (isInWishlist(product._id)) {
                        toast.info(`${product.name} already in wishlist`);
                      } else {
                        addToWishlist(product);
                        toast.success(`${product.name} added to wishlist`);
                      }
                    }}
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
                        toast.success(`${product.name} added to cart`);
                      }
                    }}
                  >
                    {isInCart(product._id) ? "Go to Cart" : "Add to Cart"}
                  </button>
                  
                  <button 
                    className="secondary-action-btn"
                    onClick={() => {
                      if (isInWishlist(product._id)) {
                        toast.info(`${product.name} already in wishlist`);
                      } else {
                        addToWishlist(product);
                        toast.success(`${product.name} added to wishlist`);
                      }
                    }}
                  >
                    {isInWishlist(product._id) ? "Remove from Wishlist" : "Save to Wishlist"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}