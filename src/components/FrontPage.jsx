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
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="homepage-container">
      {/* Category Cards Section - Horizontal Scroll */}
      <div className="category-section-wrapper">
        <div className="category-section">
          {/* All Category */}
          <Link 
            to="/product" 
            className="category-card"
            onClick={() => handleCategoryClick("All")}
          >
            <div className="category-image-round">
              <img src="/photo.jpg" alt="All Products" />
            </div>
            <p className="category-name">All</p>
          </Link>

          {/* Dynamic Categories from Database */}
          {categories
            .filter(category => category.name !== "Home")
            .map((category) => (
              <Link 
                key={category._id}
                to="/product" 
                className="category-card"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="category-image-round">
                  <img src={category.imageUrl || "/photo.jpg"} alt={category.name} />
                </div>
                <p className="category-name">{category.name}</p>
              </Link>
            ))}
        </div>
      </div>

      {/* Banner Section */}
      <div className="hero-banner">
        <img src="/photo.jpg" alt="Hero Banner" />
      </div>
    </div>
  );
}