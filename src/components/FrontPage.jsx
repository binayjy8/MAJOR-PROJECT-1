import "../style/style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const FALLBACK_CATEGORIES = [
  { _id: "1", name: "Men" },
  { _id: "2", name: "Women" },
  { _id: "3", name: "Kids" },
  { _id: "4", name: "Electronics" },
  { _id: "5", name: "Home" },
];

export default function FrontPage() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const { setFilters } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://project-backend-eta-pink.vercel.app/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const cats = data?.data?.categories || data?.categories || [];
        if (Array.isArray(cats) && cats.length > 0) setCategories(cats);
      })
      .catch(() => {});
  }, []);

  const categoryImages = {
    men: "https://images.unsplash.com/photo-1520975867597-0af37a22e31e",
    women: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    kids: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    electronics: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    home: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  };

  const normalizeCategory = (name) => name.toLowerCase().trim().split(" ")[0];

  const goToCategory = (name) => {
    const key = normalizeCategory(name);

    if (key === "home") {
      setFilters((p) => ({
        ...p,
        category: ["Home"],
        rating: 0,
        price: 5000,
        sortBy: "",
        search: "",
      }));
      navigate("/product");
      return;
    }

    setFilters((p) => ({
      ...p,
      category: [name],
      rating: 0,
      price: 5000,
      sortBy: "",
      search: "",
    }));

    if (key === "men") navigate("/men");
    else if (key === "women") navigate("/women");
    else if (key === "kids") navigate("/kids");
    else if (key === "electronics") navigate("/electronics");
    else navigate("/product");
  };

  return (
    <div className="home-page">
      <div className="home-categories">
        {categories.map((cat) => {
          const key = normalizeCategory(cat.name);
          return (
            <div
              key={cat._id}
              className="category-box"
              onClick={() => goToCategory(cat.name)}
            >
              <img src={categoryImages[key]} alt={cat.name} />
              <span>{cat.name}</span>
            </div>
          );
        })}
      </div>

      <div className="home-banner">
        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322"
          alt="Main Banner"
        />
      </div>

      <div className="home-collections">
        <div className="collection-card">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
            alt="Summer Collection"
          />
          <div className="collection-text">
            <span>NEW ARRIVALS</span>
            <h3>Summer Collection</h3>
          </div>
        </div>

        <div className="collection-card">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Electronics Collection"
          />
          <div className="collection-text">
            <span>NEW ARRIVALS</span>
            <h3>Electronics Collection</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
