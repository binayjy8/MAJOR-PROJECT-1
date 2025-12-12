import "../style/style.css";
import { Link } from "react-router-dom";

export default function AllProducts(){
    return(
        <>
        <div className="homepage-container">
            {/* Category Cards Section */}
            <div className="category-section">
                <Link to="/product" className="category-card">
                    <div className="category-image">
                        <img src="/photo.jpg" alt="Men"/>
                    </div>
                    <p className="category-label">Men</p>
                </Link>

                <Link to="/product" className="category-card">
                    <div className="category-image">
                        <img src="/photo.jpg" alt="Women"/>
                    </div>
                    <p className="category-label">Women</p>
                </Link>

                <Link to="/product" className="category-card">
                    <div className="category-image">
                        <img src="/photo.jpg" alt="Kids"/>
                    </div>
                    <p className="category-label">Kids</p>
                </Link>

                <Link to="/product" className="category-card">
                    <div className="category-image">
                        <img src="/photo.jpg" alt="Electronics"/>
                    </div>
                    <p className="category-label">Electronics</p>
                </Link>

                <Link to="/product" className="category-card">
                    <div className="category-image">
                        <img src="/photo.jpg" alt="Home"/>
                    </div>
                    <p className="category-label">Home</p>
                </Link>
            </div>

            {/* Banner Section */}
            <div className="banner-section">
                <img src="/photo.jpg" alt="Main Banner"/>
            </div>

            {/* Featured Collections Section */}
            <div className="featured-section">
                <div className="featured-card">
                    <div className="featured-image">
                        <img src="/photo.jpg" alt="Featured Product"/>
                    </div>
                    <div className="featured-content">
                        <span className="arrival-tag">NEW ARRIVALS</span>
                        <h3 className="collection-title">Summer Collection</h3>
                        <p className="collection-desc">Check out our best summer collection to stay cool in style this season</p>
                    </div>
                </div>

                <div className="featured-card">
                    <div className="featured-image">
                        <img src="/photo.jpg" alt="Featured Product"/>
                    </div>
                    <div className="featured-content">
                        <span className="arrival-tag">NEW ARRIVALS</span>
                        <h3 className="collection-title">Winter Collection</h3>
                        <p className="collection-desc">Check out our best winter collection to stay warm in style this season</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}