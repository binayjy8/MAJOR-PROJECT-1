import { createContext, useContext, useEffect, useRef, useState } from "react";

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

  const filteredProducts = products
    .filter((product) => {
      const selectedCategories = Array.isArray(filters.category)
        ? filters.category.map((c) => c.toLowerCase().trim())
        : filters.category
        ? [filters.category.toLowerCase().trim()]
        : [];

      if (selectedCategories.length === 0) return true;

      const productCategory =
        typeof product.category === "object"
          ? product.category?.name
          : product.category;

      if (!productCategory) return false;

      const normalizedProductCategory = productCategory.toLowerCase().trim();

      return selectedCategories.some((cat) =>
        normalizedProductCategory.includes(cat)
      );
    })
    .filter((product) => {
      if (product.price > filters.price) return false;
      if (filters.rating > 0 && product.rating < filters.rating) return false;

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

  const safeSetFilters = (updater) => {
    setFilters((prev) => {
      const safePrev = {
        ...prev,
        category: Array.isArray(prev.category)
          ? prev.category
          : prev.category
          ? [prev.category]
          : [],
      };

      const next = typeof updater === "function" ? updater(safePrev) : updater;

      return {
        ...next,
        category: Array.isArray(next.category)
          ? next.category
          : next.category
          ? [next.category]
          : [],
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
