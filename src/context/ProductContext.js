import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
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
      
      // ✅ FIXED: Extract the products array from the nested structure
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

  return (
    <ProductContext.Provider
      value={{
        products,
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