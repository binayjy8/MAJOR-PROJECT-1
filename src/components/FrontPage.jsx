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
      setFilters(prev => ({
        ...prev,
        category: []
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        category: [categoryName]
      }));
    }
  };

  if (loading) {
    return (
      <div className="home-page-container">
        <div className="loading">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="home-page-container">
      {/* Category Section - Horizontal Cards */}
      <div className="categories-row">
        {/* All Category */}
        <Link 
          to="/product" 
          className="category-box"
          onClick={() => handleCategoryClick("All")}
        >
          <div className="category-img">
            <img src="/photo.jpg" alt="All" />
          </div>
          <p className="category-label">All</p>
        </Link>

        {/* Dynamic Categories - Show all if available, otherwise show placeholder */}
        {categories.length > 0 ? (
          categories
            .filter(category => category.name !== "Home")
            .map((category) => (
              <Link 
                key={category._id}
                to="/product" 
                className="category-box"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="category-img">
                  <img src={category.imageUrl || "/photo.jpg"} alt={category.name} />
                </div>
                <p className="category-label">{category.name}</p>
              </Link>
            ))
        ) : (
          // Fallback categories if database doesn't load
          <>
            <Link to="/product" className="category-box" onClick={() => handleCategoryClick("Men")}>
              <div className="category-img">
                <img src="/photo.jpg" alt="Men" />
              </div>
              <p className="category-label">Men</p>
            </Link>
            <Link to="/product" className="category-box" onClick={() => handleCategoryClick("Women")}>
              <div className="category-img">
                <img src="/photo.jpg" alt="Women" />
              </div>
              <p className="category-label">Women</p>
            </Link>
            <Link to="/product" className="category-box" onClick={() => handleCategoryClick("Kids")}>
              <div className="category-img">
                <img src="/photo.jpg" alt="Kids" />
              </div>
              <p className="category-label">Kids</p>
            </Link>
            <Link to="/product" className="category-box" onClick={() => handleCategoryClick("Electronics")}>
              <div className="category-img">
                <img src="/photo.jpg" alt="Electronics" />
              </div>
              <p className="category-label">Electronics</p>
            </Link>
          </>
        )}
      </div>

      {/* Large Banner Section */}
      <div className="main-banner">
        <img src="/photo.jpg" alt="Main Banner" />
      </div>

      {/* Featured Collections - Two Cards */}
      <div className="featured-collections">
        <div className="collection-card">
          <div className="collection-image">
            <img src="/photo.jpg" alt="Summer Collection" />
          </div>
          <div className="collection-info">
            <span className="new-tag">NEW ARRIVALS</span>
            <h2 className="collection-title">Summer Collection</h2>
            <p className="collection-desc">
              Check out our best winter collection to stay warm in style this season
            </p>
          </div>
        </div>

        <div className="collection-card">
          <div className="collection-image">
            <img src="/photo.jpg" alt="Summer Collection" />
          </div>
          <div className="collection-info">
            <span className="new-tag">NEW ARRIVALS</span>
            <h2 className="collection-title">Summer Collection</h2>
            <p className="collection-desc">
              Check out our best winter collection to stay warm in style this season
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}