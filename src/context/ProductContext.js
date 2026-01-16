import { createContext, useContext, useEffect, useRef, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  const [filters, setFilters] = useState({
    category: [], // ✅ MUST stay array for multi-select
    rating: 0,
    price: 5000,
    sortBy: "",
    search: "",
  });

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
      setError(null);

      const response = await fetch(
        "https://project-backend-eta-pink.vercel.app/api/products"
      );

      if (!response.ok) throw new Error("Products service unavailable");

      const result = await response.json();
      const productList = result?.data?.products;

      if (!Array.isArray(productList)) throw new Error("Invalid product data");

      setProducts(productList);
    } catch (err) {
      console.error("Product fetch error:", err);
      setProducts([]);
      setError(err.message);
    } finally {
      setTimeout(() => setLoading(false), 0);
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

  // ✅ Helper: always return clean product category string
  const getProductCategory = (product) => {
    const productCategory =
      typeof product.category === "object"
        ? product.category?.name
        : product.category;

    return (productCategory || "").toLowerCase().trim();
  };

  const filteredProducts = products
    .filter((product) => {
      // ✅ selected categories always normalized array
      const selectedCategories = Array.isArray(filters.category)
        ? filters.category.map((c) => c.toLowerCase().trim())
        : [];

      // ✅ If no category selected, show all
      if (selectedCategories.length === 0) return true;

      const normalizedProductCategory = getProductCategory(product);

      if (!normalizedProductCategory) return false;

      // ✅ IMPORTANT FIX: exact match for multi-category selection
      return selectedCategories.includes(normalizedProductCategory);
    })
    .filter((product) => {
      // ✅ Price filter
      if (Number(product.price) > Number(filters.price)) return false;

      // ✅ Rating filter
      if (filters.rating > 0 && Number(product.rating) < Number(filters.rating))
        return false;

      // ✅ Search filter
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

  // ✅ Safe setter ensures category is always array
  const safeSetFilters = (updater) => {
    setFilters((prev) => {
      const safePrev = {
        ...prev,
        category: Array.isArray(prev.category) ? prev.category : [],
      };

      const next = typeof updater === "function" ? updater(safePrev) : updater;

      return {
        ...next,
        category: Array.isArray(next.category) ? next.category : [],
      };
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        categories,
        loading,
        error,
        filters,
        setFilters: safeSetFilters,
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
