import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

  const fetchProducts = useCallback(async () => {
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
      setError(err.message || "Something went wrong");
    } finally {
      setTimeout(() => setLoading(false), 0);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        "https://project-backend-eta-pink.vercel.app/api/categories"
      );
      const result = await response.json();
      setCategories(result?.data?.categories || []);
    } catch (err) {
      console.error("Category fetch error:", err);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchProducts();
      fetchCategories();
      fetchedRef.current = true;
    }
  }, [fetchProducts, fetchCategories]);

  const getProductCategory = (product) => {
    const productCategory =
      typeof product.category === "object"
        ? product.category?.name
        : product.category;

    return (productCategory || "").toLowerCase().trim();
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const selectedCategories = Array.isArray(filters.category)
          ? filters.category.map((c) => c.toLowerCase().trim())
          : [];

        if (selectedCategories.length === 0) return true;

        const normalizedProductCategory = getProductCategory(product);
        if (!normalizedProductCategory) return false;

        return selectedCategories.includes(normalizedProductCategory);
      })
      .filter((product) => {
        if (Number(product.price) > Number(filters.price)) return false;

        if (
          filters.rating > 0 &&
          Number(product.rating) < Number(filters.rating)
        )
          return false;

        if (
          filters.search &&
          !product.name.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "lowToHigh")
          return Number(a.price) - Number(b.price);
        if (filters.sortBy === "highToLow")
          return Number(b.price) - Number(a.price);
        return 0;
      });
  }, [products, filters]);

  const safeSetFilters = useCallback((updater) => {
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
  }, []);

  const value = useMemo(
    () => ({
      products,
      filteredProducts,
      categories,
      loading,
      error,
      filters,
      setFilters: safeSetFilters,
      fetchProducts,
    }),
    [
      products,
      filteredProducts,
      categories,
      loading,
      error,
      filters,
      safeSetFilters,
      fetchProducts,
    ]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
