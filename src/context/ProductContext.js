import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: [],
    rating: 0,
    price: 5000,
    sortBy: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching products...");
      
      const response = await fetch("https://project-backend-eta-pink.vercel.app/api/products");
      
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const result = await response.json();
      console.log("📦 Response:", result);
      
      if (result.data && result.data.products && Array.isArray(result.data.products)) {
        setProducts(result.data.products);
        console.log("✅ Products set:", result.data.products.length);
        setError(null);
      } else {
        console.warn("⚠️ Invalid data structure");
        setProducts([]);
        setError("Invalid data structure");
      }
      
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      console.log("🔄 Fetching categories...");
      const response = await fetch("https://project-backend-eta-pink.vercel.app/api/categories");
      const result = await response.json();
      
      if (result.data && result.data.categories) {
        setCategories(result.data.categories);
        console.log("✅ Categories set:", result.data.categories.length);
      }
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        filters,
        setFilters,
        searchTerm,
        setSearchTerm,
        fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}