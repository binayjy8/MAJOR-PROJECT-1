import { createContext, useContext, useState } from "react";
import { products as productData } from "../data/product";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products] = useState(productData);

  const [filters, setFilters] = useState({
    category: [],
    rating: 0,
    price: 5000,
    sortBy: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ProductContext.Provider
      value={{
        products,
        filters,
        setFilters,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
