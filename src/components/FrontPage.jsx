import "../style/style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";

export default function AllProducts() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setFilters } = useProduct();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://project-backend-eta-pink.vercel.app/api/categories");
      const result = await response.json();
      
      if (result.data && result.data.categories) {
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName) => {
    if (categoryName === "All") {
      // When "All" is clicked, clear category filter to show ALL products
      setFilters(prev => ({
        ...prev,
        category: [] // Empty array = show all products
      }));
    } else {
      // Filter by specific category
      setFilters(prev => ({
        ...prev,
        category: [categoryName]
      }));
    }
  };

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="homepage-container">
      {/* Category Cards Section */}
      <div className="category-section">
        {/* Add "All" category first to show all products */}
        <Link 
          to="/product" 
          className="category-card"
          onClick={() => handleCategoryClick("All")}
        >
          <div className="category-image">
            <img src="/photo.jpg" alt="All Products" />
          </div>
          <p className="category-label">All</p>
        </Link>

        {/* Display other categories from database */}
        {categories
          .filter(category => category.name !== "Home") // Filter out "Home" if it exists in DB
          .map((category) => (
            <Link 
              key={category._id}
              to="/product" 
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-image">
                <img src="/photo.jpg" alt={category.name} />
              </div>
              <p className="category-label">{category.name}</p>
            </Link>
          ))}
      </div>

      {/* Banner Section */}
      <div className="banner-section">
        <img src="/photo.jpg" alt="Main Banner" />
      </div>

      {/* Featured Collections Section */}
      <div className="featured-section">
        <div className="featured-card">
          <div className="featured-image">
            <img src="/photo.jpg" alt="Featured Product" />
          </div>
          <div className="featured-content">
            <span className="arrival-tag">NEW ARRIVALS</span>
            <h3 className="collection-title">Summer Collection</h3>
            <p className="collection-desc">
              Check out our best summer collection to stay cool in style this season
            </p>
          </div>
        </div>

        <div className="featured-card">
          <div className="featured-image">
            <img src="/photo.jpg" alt="Featured Product" />
          </div>
          <div className="featured-content">
            <span className="arrival-tag">NEW ARRIVALS</span>
            <h3 className="collection-title">Winter Collection</h3>
            <p className="collection-desc">
              Check out our best winter collection to stay warm in style this season
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}