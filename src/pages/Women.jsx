import "../style/women.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Women() {
  const { filteredProducts, loading, error, setFilters } = useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  // ✅ Apply Women category safely
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: "Women",
    }));
  }, [setFilters]);

  const isInCart = (id) => cart.some((item) => item._id === id);
  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  if (loading) return <div className="loading">Loading women's products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      {/* FILTER */}
      <aside className="filter">
        <div className="filter-header">
          <h3>Filters</h3>
          <span
            className="clear-filter"
            onClick={() =>
              setFilters({
                category: "Women",
                rating: 0,
                price: 5000,
                sortBy: "",
              })
            }
          >
            Clear
          </span>
        </div>

        <div className="filter-block">
          <p className="filter-title">PRICE</p>
          <input
            type="range"
            min="50"
            max="5000"
            value={5000}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="filter-block">
          <p className="filter-title">RATING</p>
          {[4, 3, 2, 0].map((r) => (
            <label key={r} className="filter-option">
              <input
                type="radio"
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: r,
                  }))
                }
              />
              {r === 0 ? "All" : `${r}★ & above`}
            </label>
          ))}
        </div>

        <div className="filter-block">
          <p className="filter-title">SORT BY</p>
          <label className="filter-option">
            <input
              type="radio"
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: "lowToHigh",
                }))
              }
            />
            Price — Low to High
          </label>
          <label className="filter-option">
            <input
              type="radio"
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: "highToLow",
                }))
              }
            />
            Price — High to Low
          </label>
        </div>
      </aside>

      {/* PRODUCTS */}
      <section className="products-area">
        <h2 className="page-title">
          Women's Products <span>({filteredProducts.length})</span>
        </h2>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div
                className="image-box"
                onClick={() => navigate(`/detail/${product._id}`)}
              >
                <img src={product.imageUrl} alt={product.name} />

                <button
                  className={`wishlist-btn ${
                    isInWishlist(product._id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isInWishlist(product._id)) {
                      addToWishlist(product);
                      toast.success("Added to wishlist");
                    }
                  }}
                >
                  ❤
                </button>
              </div>

              <div className="product-info">
                <p className="name">{product.name}</p>
                <p className="rating">★ {product.rating}</p>
                <p className="price">₹{product.price}</p>

                <button
                  className="cart-btn"
                  onClick={() =>
                    isInCart(product._id)
                      ? navigate("/cart")
                      : addToCart(product)
                  }
                >
                  {isInCart(product._id) ? "GO TO CART" : "ADD TO CART"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
