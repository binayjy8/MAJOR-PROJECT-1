import { createContext, useContext, useState, useEffect } from "react";
import { useRef } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  const [filters, setFilters] = useState({
    category: [],
    rating: 0,
    price: 5000,
    sortBy: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchProducts();
      fetchCategories();
      fetchedRef.current = true;
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const response = await fetch("https://project-backend-eta-pink.vercel.app/api/products");
      
      if (!response.ok) {
        setProducts([]);
        setError("Products service unavailable");
        return;
      }
      
      const result = await response.json();
      
      if (result.data && result.data.products && Array.isArray(result.data.products)) {
        setProducts(result.data.products);
        setError(null);
      } else {
        setProducts([]);
        setError("Invalid data structure");
      }
      
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://project-backend-eta-pink.vercel.app/api/categories");
      const result = await response.json();
      
      if (result.data && result.data.categories) {
        setCategories(result.data.categories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
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