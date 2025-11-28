import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ---------------- CART ---------------- //

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);

      return exists
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // ---------------- WISHLIST ---------------- //

  const addToWishlist = (product) => {
    setWishlist(prev =>
      prev.find(item => item.id === product.id)
        ? prev
        : [...prev, product]
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
