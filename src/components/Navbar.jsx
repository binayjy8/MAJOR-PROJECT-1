import "../style/style.css";

export default function Navbar() {
    return(
        
    <div class="navbar">
    <div class="logo">MyShoppingSite</div>

    <div class="search-box">
        <i class="search-icon">🔍</i>
        <input type="text" placeholder="Search" />
    </div>

    <div class="user-controls">
        <button class="login-btn">Login</button>

        <div class="icon-box">
            <span class="badge">0</span>
            🤍
        </div>

        <div class="icon-box">
            <span class="badge">0</span>
            🛒
        </div>

        <span class="cart-text">Cart</span>
    </div>
</div>

    )
}