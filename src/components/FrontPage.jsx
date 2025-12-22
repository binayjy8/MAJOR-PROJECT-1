import "../style/style.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setFilters, products } = useProduct();
  const navigate = useNavigate();

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
    const lowerName = categoryName.toLowerCase();
    
    if (categoryName === "All") {
      setFilters(prev => ({
        ...prev,
        category: []
      }));
      navigate("/product");
    } else if (lowerName.includes("men") && !lowerName.includes("women")) {
      navigate("/men");
    } else if (lowerName.includes("women")) {
      navigate("/women");
    } else if (lowerName.includes("kids") || lowerName.includes("children")) {
      navigate("/kids");
    } else {
      setFilters(prev => ({
        ...prev,
        category: [categoryName]
      }));
      navigate("/product");
    }
  };

  const getAllCategoryImage = () => {
    if (products && products.length > 0) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      return randomProduct.imageUrl;
    }
    return "https://via.placeholder.com/300x400?text=All+Products";
  };

  const getCategoryImage = (categoryName) => {
    if (products && products.length > 0) {
      const categoryProducts = products.filter(p => {
        const pCat = typeof p.category === 'object' ? p.category.name : p.category;
        return pCat?.toLowerCase().includes(categoryName.toLowerCase());
      });
      
      if (categoryProducts.length > 0) {
        return categoryProducts[0].imageUrl;
      }
    }
    return `https://via.placeholder.com/300x400?text=${categoryName}`;
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
      <div className="categories-row">
        <div 
          className="category-box"
          onClick={() => handleCategoryClick("All")}
          style={{ cursor: 'pointer' }}
        >
          <div className="category-img">
            <img src={getAllCategoryImage()} alt="All" />
          </div>
          <p className="category-label">All</p>
        </div>

        {categories.length > 0 ? (
          categories
            .filter(category => category.name !== "Home")
            .map((category) => (
              <div 
                key={category._id}
                className="category-box"
                onClick={() => handleCategoryClick(category.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-img">
                  <img 
                    src={category.imageUrl || getCategoryImage(category.name)} 
                    alt={category.name}
                    onError={(e) => {
                      e.target.src = getCategoryImage(category.name);
                    }}
                  />
                </div>
                <p className="category-label">{category.name}</p>
              </div>
            ))
        ) : (
          <div className="no-categories">
            <p>No categories available. Please check your database connection.</p>
          </div>
        )}
      </div>

      <div className="main-banner">
        <img 
          src={products && products.length > 0 ? products[0].imageUrl : "https://via.placeholder.com/1200x400?text=Welcome+to+Our+Store"} 
          alt="Main Banner" 
        />
      </div>

      <div className="featured-collections">
        <div className="collection-card">
          <div className="collection-image">
            <img 
              src={products && products.length > 1 ? products[1].imageUrl : "https://via.placeholder.com/600x400?text=Summer+Collection"} 
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
              src={products && products.length > 2 ? products[2].imageUrl : "https://via.placeholder.com/600x400?text=Winter+Collection"} 
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