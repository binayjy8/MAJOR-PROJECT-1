import "../style/men.css";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Men() {
  const { filteredProducts, loading, error, setFilters, filters } =
    useProduct();
  const { addToCart, addToWishlist, cart, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: "Men" }));
  }, [setFilters]);

  const isInCart = (id) => cart.some((i) => i._id === id);
  const isInWishlist = (id) => wishlist.some((i) => i._id === id);

  if (loading) return <div className="loading">Loading men products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      <aside className="filter">
        <span
          className="clear-filter"
          onClick={() =>
            setFilters((p) => ({
              ...p,
              rating: 0,
              price: 5000,
              sortBy: "",
            }))
          }
        >
          Clear
        </span>
      </aside>

      <section className="products-area">
        <h2>Men Products ({filteredProducts.length})</h2>

        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div key={p._id} className="product-card">
              <div onClick={() => navigate(`/detail/${p._id}`)}>
                <img src={p.imageUrl} alt={p.name} />
                <span
                  className={`wishlist ${
                    isInWishlist(p._id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    isInWishlist(p._id)
                      ? toast.info("Already in wishlist")
                      : addToWishlist(p);
                  }}
                >
                  ❤
                </span>
              </div>

              <p>{p.name}</p>
              <p>₹{p.price}</p>

              <button
                onClick={() =>
                  isInCart(p._id) ? navigate("/cart") : addToCart(p)
                }
              >
                {isInCart(p._id) ? "Go to Cart" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
