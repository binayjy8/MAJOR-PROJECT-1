import "../style/style.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { products, setFilters } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://project-backend-eta-pink.vercel.app/api/categories"
      );
      const result = await response.json();

      if (result?.data?.categories) {
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     CATEGORY CLICK (ROUTE BASED)
     ========================= */
  const handleCategoryClick = (categoryName) => {
    const name = categoryName.toLowerCase();

    if (name === "all") {
      setFilters((prev) => ({ ...prev, category: "All" }));
      navigate("/product");
      return;
    }

    if (name === "men") {
      navigate("/men");
      return;
    }

    if (name === "women") {
      navigate("/women");
      return;
    }

    if (name === "kids") {
      navigate("/kids");
      return;
    }

    if (name === "electronics") {
      navigate("/electronics");
      return;
    }

    // fallback for any future category
    setFilters((prev) => ({ ...prev, category: categoryName }));
    navigate("/product");
  };

  /* =========================
     IMAGE HELPERS
     ========================= */
  const getAllCategoryImage = () => {
    if (products.length > 0) {
      return products[Math.floor(Math.random() * products.length)].imageUrl;
    }
    return "https://via.placeholder.com/300x400?text=All+Products";
  };

  const getCategoryImage = (categoryName) => {
    if (products.length > 0) {
      const match = products.find((p) => {
        const cat =
          typeof p.category === "object" ? p.category.name : p.category;
        return cat?.toLowerCase() === categoryName.toLowerCase();
      });
      if (match) return match.imageUrl;
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
      {/* =========================
          CATEGORIES
         ========================= */}
      <div className="categories-row">
        {/* ALL */}
        <div
          className="category-box"
          onClick={() => handleCategoryClick("All")}
        >
          <div className="category-img">
            <img src={getAllCategoryImage()} alt="All Products" />
          </div>
          <p className="category-label">All</p>
        </div>

        {/* DYNAMIC CATEGORIES */}
        {categories.map((category) => (
          <div
            key={category._id}
            className="category-box"
            onClick={() => handleCategoryClick(category.name)}
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
        ))}
      </div>
    </div>
  );
}
