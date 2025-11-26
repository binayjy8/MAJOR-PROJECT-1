import "../style/style.css";
import { Link } from "react-router-dom";

export default function AllProducts(){
    return(
        <>
        <div className="card card-margin">
            <div className="item">
            <Link to="/men">
            <img src="/photo.jpg" alt="img"/>
            <p className="item-text">Men</p>
            </Link>
            </div>
            <div className="item"><img src="/photo.jpg" alt="img"/>
            <p className="item-text">Women</p>
            </div>
            <div className="item"><img src="/photo.jpg" alt="img"/>
            <p className="item-text">Kids</p>
            </div>
            <div className="item"><img src="/photo.jpg" alt="img"/>
            <p className="item-text">Electronics</p>
            </div>
            <div className="item"><img src="/photo.jpg" alt="img"/>
            <p className="item-text">Home</p>
            </div>
        </div>
        <div className="middle"><img src="/photo.jpg" alt="img"/></div>
        <div className="last">
            <div className="feature-block">
               
                <div className="image-placeholder">
                    <img src="/photo.jpg" alt="Featured Product"/>
                </div>
                
                <div className="feature-text">
                    <p className="arrival-tag">NEW ARRIVALS</p>
                    <h3 className="collection-title">Summer Collection</h3>
                    <p className="collection-desc">Check out our best winter collection to stay warm in style this season</p>
                </div>
            </div>

            
            <div className="feature-block">
                
                <div className="image-placeholder">
                    <img src="/photo.jpg" alt="Featured Product"/>
                </div>
                <div className="feature-text">
                    <p className="arrival-tag">NEW ARRIVALS</p>
                    <h3 className="collection-title">Summer Collection</h3>
                    <p className="collection-desc">Check out our best winter collection to stay warm in style this season</p>
                </div>
            </div>
        </div>
        </>
    )
}