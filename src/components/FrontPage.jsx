import "../style/style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";

export default function FrontPage() {
  const [categories, setCategories] = useState([]);
  const { setFilters } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://project-backend-eta-pink.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data?.data?.categories || []));
  }, []);

  const handleAllProducts = () => {
    setFilters({
      category: "All",
      rating: 0,
      price: 5000,
      sortBy: "",
      search: "",
    });
    navigate("/product");
  };

  const handleCategoryClick = (name) => {
    const key = name.toLowerCase();

    if (key === "men") navigate("/men");
    else if (key === "women") navigate("/women");
    else if (key === "kids") navigate("/kids");
    else if (key === "electronics") navigate("/electronics");
    else {
      setFilters((p) => ({ ...p, category: name }));
      navigate("/product");
    }
  };

  return (
    <div className="home-page-container">
      {/* CATEGORY STRIP */}
      <div className="category-strip">
        {/*  */}
        <div className="category-tile all-tile" onClick={handleAllProducts}>
          <span>All Products</span>
        </div>

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="category-tile"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img src={cat.imageUrl} alt={cat.name} />
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
      <div className="hero-banner"></div>

      {/*  */}
      <div className="collection-row">
        <div className="collection-card">
          <span className="tag">NEW ARRIVALS</span>
          <h2>Summer Collection</h2>
        </div>

        <div className="collection-card">
          <span className="tag">NEW ARRIVALS</span>
          <h2>Summer Collection</h2>
        </div>
      </div>
    </div>
  );
}
