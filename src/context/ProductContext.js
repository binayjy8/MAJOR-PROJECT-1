import { createContext, useContext, useState, useEffect, useRef } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  /* =========================
     FILTER STATE (SINGLE SOURCE OF TRUTH)
     ========================= */
  const [filters, setFilters] = useState({
    category: "All",
    rating: 0,
    price: 5000,
    sortBy: "",
    search: "",
  });

  /* =========================
     FETCH DATA (ONCE)
     ========================= */
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
      const response = await fetch(
        "https://project-backend-eta-pink.vercel.app/api/products"
      );

      if (!response.ok) throw new Error("Products service unavailable");

      const result = await response.json();
      setProducts(result?.data?.products || []);
      setError(null);
    } catch (err) {
      setProducts([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://project-backend-eta-pink.vercel.app/api/categories"
      );
      const result = await response.json();
      setCategories(result?.data?.categories || []);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  /* =========================
     FILTERED PRODUCTS (FINAL LOGIC)
     ========================= */
  const filteredProducts = products
    .filter((product) => {
      /* 🔹 CATEGORY */
      if (filters.category === "All") return true;

      const productCategory =
        typeof product.category === "object"
          ? product.category.name
          : product.category;

      return (
        productCategory &&
        productCategory.toLowerCase() === filters.category.toLowerCase()
      );
    })
    .filter((product) => {
      /* 🔹 PRICE */
      if (product.price > filters.price) return false;

      /* 🔹 RATING */
      if (filters.rating > 0 && product.rating < filters.rating) return false;

      /* 🔹 SEARCH */
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "lowToHigh") return a.price - b.price;
      if (filters.sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts, // ✅ USE THIS EVERYWHE
        categories,
        loading,
        error,
        filters,
        setFilters,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
