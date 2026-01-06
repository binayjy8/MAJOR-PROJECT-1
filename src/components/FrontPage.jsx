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
     CATEGORY CLICK HANDLER
     ========================= */
  const handleCategoryClick = (categoryName) => {
    const lowerName = categoryName.toLowerCase();

    // ✅ ALL PRODUCTS
    if (categoryName === "All") {
      setFilters({
        category: "All",
        rating: 0,
        price: 5000,
        sortBy: "",
        search: "",
      });
      navigate("/product");
      return;
    }

    // ✅ MEN
    if (lowerName.includes("men") && !lowerName.includes("women")) {
      navigate("/men");
      return;
    }

    // ✅ WOMEN
    if (lowerName.includes("women")) {
      navigate("/women");
      return;
    }

    // ✅ KIDS
    if (lowerName.includes("kids") || lowerName.includes("children")) {
      navigate("/kids");
      return;
    }

    // ✅ ELECTRONICS (🔥 MAIN FIX)
    if (lowerName.includes("electronics")) {
      navigate("/electronics");
      return;
    }

    // ✅ FALLBACK (SAFE)
    setFilters({
      category: categoryName,
      rating: 0,
      price: 5000,
      sortBy: "",
      search: "",
    });
    navigate("/product");
  };

  /* =========================
     IMAGE HELPERS
     ========================= */
  const getAllCategoryImage = () => {
    if (products?.length > 0) {
      return products[Math.floor(Math.random() * products.length)].imageUrl;
    }
    return "https://via.placeholder.com/300x400?text=All+Products";
  };

  const getCategoryImage = (categoryName) => {
    if (products?.length > 0) {
      const match = products.find((p) => {
        const cat =
          typeof p.category === "object" ? p.category.name : p.category;
        return cat?.toLowerCase().includes(categoryName.toLowerCase());
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
            <img src={getAllCategoryImage()} alt="All" />
          </div>
          <p className="category-label">All</p>
        </div>

        {/* DYNAMIC CATEGORIES */}
        {categories
          .filter((cat) => cat.name !== "Home")
          .map((category) => (
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

      {/* =========================
          MAIN BANNER
         ========================= */}
      <div className="main-banner">
        <img
          src={
            products?.length > 0
              ? products[0].imageUrl
              : "https://via.placeholder.com/1200x400"
          }
          alt="Main Banner"
        />
      </div>

      {/* =========================
          FEATURED COLLECTIONS
         ========================= */}
      <div className="featured-collections">
        <div className="collection-card">
          <div className="collection-image">
            <img
              src={
                products?.length > 1
                  ? products[1].imageUrl
                  : "https://via.placeholder.com/600x400"
              }
              alt="Summer Collection"
            />
          </div>
          <div className="collection-info">
            <span className="new-tag">NEW ARRIVALS</span>
            <h2 className="collection-title">Summer Collection</h2>
            <p className="collection-desc">
              Check out our best summer collection
            </p>
          </div>
        </div>

        <div className="collection-card">
          <div className="collection-image">
            <img
              src={
                products?.length > 2
                  ? products[2].imageUrl
                  : "https://via.placeholder.com/600x400"
              }
              alt="Winter Collection"
            />
          </div>
          <div className="collection-info">
            <span className="new-tag">NEW ARRIVALS</span>
            <h2 className="collection-title">Winter Collection</h2>
            <p className="collection-desc">
              Stay warm with our winter collection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
