import "../style/style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";

export default function AllProducts() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setFilters, products } = useProduct();

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

  // Get a random product image for "All" category
  const getAllCategoryImage = () => {
    if (products && products.length > 0) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      return randomProduct.imageUrl;
    }
    return "/photo.jpg"; // Fallback onl 
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
        {/* All Category - Now with dynamic image */}
        <Link 
          to="/product" 
          className="category-box"
          onClick={() => handleCategoryClick("All")}
        >
          <div className="category-img">
            <img src={getAllCategoryImage()} alt="All" />
          </div>
          <p className="category-label">All</p>
        </Link>

        {/* Dynamic Categories from Database */}
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
                  <img 
                    src={category.imageUrl} 
                    alt={category.name}
                    onError={(e) => {
                      // If image fails to load, use a product image from that category
                      const categoryProducts = products?.filter(p => {
                        const pCat = typeof p.category === 'object' ? p.category.name : p.category;
                        return pCat === category.name;
                      });
                      if (categoryProducts && categoryProducts.length > 0) {
                        e.target.src = categoryProducts[0].imageUrl;
                      }
                    }}
                  />
                </div>
                <p className="category-label">{category.name}</p>
              </Link>
            ))
        ) : (
          // Fallback message if no categories load
          <div className="no-categories">
            <p>No categories available. Please check your database connection.</p>
          </div>
        )}
      </div>

      {/* Large Banner Section */}
      <div className="main-banner">
        <img 
          src={products && products.length > 0 ? products[0].imageUrl : "/photo.jpg"} 
          alt="Main Banner" 
        />
      </div>

      {/* Featured Collections - Two Cards with dynamic images */}
      <div className="featured-collections">
        <div className="collection-card">
          <div className="collection-image">
            <img 
              src={products && products.length > 1 ? products[1].imageUrl : "/photo.jpg"} 
              alt="Summer Collection" 
            />
          </div>
          <div className="collection-info">
            <span className="new-tag">NEW ARRIVALS</span>
            <h2 className="collection-title">Summer Collection</h2>
            <p className="collection-desc">
              Check out our best summer collection to stay stylish this season
            </p>
          </div>
        </div>

        <div className="collection-card">
          <div className="collection-image">
            <img 
              src={products && products.length > 2 ? products[2].imageUrl : "/photo.jpg"} 
              alt="Winter Collection" 
            />
          </div>
          <div className="collection-info">
            <span className="new-tag">NEW ARRIVALS</span>
            <h2 className="collection-title">Winter Collection</h2>
            <p className="collection-desc">
              Check out our best winter collection to stay warm in style this season
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}