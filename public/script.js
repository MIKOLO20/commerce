/* ============================================ 
   PRODUCT DATA
   ============================================ */
const products = [
    { id: 1, name: \"High-Grade Plain Soft 100% Cotton Dark grey Round Neck T-shirt\", originalPrice: 39000, discountedPrice: 29970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"./clothes/1-46-630x630.jpg\" },
    { id: 2, name: \"High-Grade Plain Soft 100% Cotton Army-Green Round Neck T-shirt\", originalPrice: 39000, discountedPrice: 29970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"./clothes/1-47-630x630.jpg\" },
    { id: 3, name: \"High-Grade Plain Soft 100% Cotton Coral red Neck T-shirt\", originalPrice: 39000, discountedPrice: 29970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"./clothes/1-48-630x630.jpg\" },
    { id: 4, name: \"High-Grade Plain Soft 100% Cotton Almond Round Neck T-shirt\", originalPrice: 39000, discountedPrice: 29970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"./clothes/1-49-630x630.jpg\" },
    { id: 5, name: \"High-Grade Plain Soft 100% Cotton Army-Green Round Neck T-shirt\", originalPrice: 39000, discountedPrice: 29970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"./clothes/1-50-630x630.jpg\" },
    { id: 6, name: \"High-Grade Plain Soft 100% Cotton light blue Hoodie\", originalPrice: 69000, discountedPrice: 49970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKUB1Ahj3znOtZBwWRo5WC6NSoqzbuOtZ5bg&s\" },
    { id: 7, name: \"High-Grade Plain Soft 100% Cotton deep-orange Hoodie\", originalPrice: 69000, discountedPrice: 49970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWMGE16b_TDNFis3ch3Sn8F0pxeQxWWLG_g&s\" },
    { id: 8, name: \"High-Grade Plain Soft 100% Cotton yellow Hoodie\", originalPrice: 69000, discountedPrice: 49970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF5Y90QzR4got7vCBLLKEVjtxvVfVey5oJ7Q&s\" },
    { id: 9, name: \"High-Grade Plain Soft 100% Cotton Black Hoodie\", originalPrice: 69000, discountedPrice: 49970, sizes: [\"M\", \"L\", \"XL\"], imageUrl: \"https://www.flannels.com/images/imgzoom/53/53750903_xxl.jpg\" }
];

/* ============================================ 
   DOM ELEMENTS
   ============================================ */
const productContainer = document.getElementById(\"product\");
const navbarHeart = document.querySelector(\".nav-heart\");
const navbarHeartCount = document.querySelector(\".nav-heart-count\");
const navbarCartCount = document.querySelector(\".nav-cart-count\");
const searchBtn = document.getElementById(\"searchBtn\");
const searchBtnMobile = document.getElementById(\"searchBtn-mobile\");
const queryInput = document.getElementById(\"query\");
const queryInputMobile = document.getElementById(\"query-mobile\");
const modalBody = document.getElementById(\"body\") || document.createElement('div');
const sortDropdown = document.querySelector(\".sort-dropdown\");

/* ============================================ 
   STATE MANAGEMENT
   ============================================ */
let wishlistCount = 0;

/* ============================================ 
   DISPLAY PRODUCTS
   ============================================ */
const displayProducts = () => {
    if (!productContainer) {
        console.error("Product container not found!");
        return;
    }
    
    productContainer.innerHTML = products.map(product => `
        <div class="cloth">
            <div class="img-box">
                <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" />
                <div class="cart-hover" data-id="${product.id}" title="Add to cart">🛒</div>
                <div class="top d-flex justify-content-between align-items-center text-white est">
                    <button class="pp" type="button">UP TO -23%</button>
                    <div class="ppp" title="Add to wishlist">
                        <i class="fa-regular fa-heart wishlist-icon" data-id="${product.id}"></i>
                    </div>
                </div>
            </div>
            <p class="text-start"><strong>${product.name}</strong></p>
            <p class="text-start">
                <span class="line">₦${product.originalPrice.toLocaleString()}</span>
                <strong>₦${product.discountedPrice.toLocaleString()}</strong>
            </p>
            <h3 class="text-start">SIZE</h3>
            <div class="d-flex gap-2">
                ${product.sizes.map(size => `<button class="btn btn-outline-light" type="button">${size}</button>`).join("")}
            </div>
        </div>
    `).join("");
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(displayProducts, 100);
    });
} else {
    setTimeout(displayProducts, 100);
}

/* ============================================ 
   SEARCH FUNCTIONALITY
   ============================================ */
const performSearch = (query) => {
    if (!query.trim()) {
        modalBody.innerHTML = \"<p class='text-center text-danger'><strong>Please enter a valid search term</strong></p>\";
        return;
    }

    const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.sizes.some(size => size.toLowerCase() === query.toLowerCase())
    );

    if (results.length === 0) {
        modalBody.innerHTML = \"<p class='text-center text-danger'><strong>No products found</strong></p>\";
    } else {
        modalBody.innerHTML = results.map(product => `
            <div class=\"cloth mb-4\">
                <div class=\"img-box\">
                    <img src=\"${product.imageUrl}\" alt=\"${product.name}\" style=\"width:100%; height:200px; object-fit: cover; border-radius:8px\" />
                    <div class=\"cart-hover\" data-id=\"${product.id}\" style=\"position: static; margin-top: 10px;\">🛒</div>
                </div>
                <p class=\"mt-2\"><strong>${product.name}</strong></p>
                <p><span class=\"line\">₦${product.originalPrice.toLocaleString()}</span> <strong>₦${product.discountedPrice.toLocaleString()}</strong></p>
            </div>
        `).join(\"\");
    }

    const myModal = new bootstrap.Modal(document.getElementById('myModal'), { backdrop: 'static' });
    myModal.show();
};

if (searchBtn) {
    searchBtn.addEventListener(\"click\", () => performSearch(queryInput.value));
    queryInput.addEventListener(\"keypress\", (e) => {
        if (e.key === \"Enter\") performSearch(queryInput.value);
    });
}

if (searchBtnMobile) {
    searchBtnMobile.addEventListener(\"click\", () => performSearch(queryInputMobile.value));
    queryInputMobile.addEventListener(\"keypress\", (e) => {
        if (e.key === \"Enter\") performSearch(queryInputMobile.value);
    });
}

/* ============================================ 
   CART MANAGEMENT
   ============================================ */
const initializeCart = () => {
    const savedCart = JSON.parse(localStorage.getItem(\"cart\")) || [];
    updateCartCount(savedCart);
};

const updateCartCount = (cart) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    navbarCartCount.textContent = totalItems;
};

const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem(\"cart\")) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            discountedPrice: product.discountedPrice,
            imageUrl: product.imageUrl,
            quantity: 1
        });
    }

    localStorage.setItem(\"cart\", JSON.stringify(cart));
    updateCartCount(cart);
    
    // Show feedback
    showNotification(\"Added to cart!\");
};

/* ============================================ 
   WISHLIST MANAGEMENT
   ============================================ */
const toggleWishlist = (icon) => {
    const isActive = icon.classList.contains(\"active\");
    
    icon.classList.toggle(\"active\");
    
    if (!isActive) {
        wishlistCount++;
        icon.classList.replace(\"fa-regular\", \"fa-solid\");
    } else {
        wishlistCount--;
        icon.classList.replace(\"fa-solid\", \"fa-regular\");
    }
    
    navbarHeartCount.textContent = wishlistCount;
    updateNavbarHeart();
    
    // Show feedback
    const action = !isActive ? \"Added to\" : \"Removed from\";
    showNotification(`${action} wishlist!`);
};

const updateNavbarHeart = () => {
    if (wishlistCount > 0) {
        navbarHeart.classList.add(\"active-heart\");
        navbarHeart.classList.replace(\"fa-regular\", \"fa-solid\");
    } else {
        navbarHeart.classList.remove(\"active-heart\");
        navbarHeart.classList.replace(\"fa-solid\", \"fa-regular\");
    }
};

/* ============================================ 
   EVENT LISTENERS
   ============================================ */
document.addEventListener(\"click\", (event) => {
    const target = event.target;

    // Add to cart
    if (target.classList.contains(\"cart-hover\")) {
        const productId = parseInt(target.dataset.id);
        addToCart(productId);
    }

    // Wishlist toggle
    if (target.classList.contains(\"wishlist-icon\")) {
        toggleWishlist(target);
    }
});

/* ============================================ 
   SORT FUNCTIONALITY
   ============================================ */
if (sortDropdown) {
    sortDropdown.addEventListener(\"change\", (e) => {
        const sortValue = e.target.value;
        const sorted = [...products];
        
        switch (sortValue) {
            case \"Sort by price low to high\":
                sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
                break;
            case \"Sort by price high to low\":
                sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
                break;
            case \"Sort by popularity\":
                // Keep original order as default/popular
                break;
            default:
                // Sort by latest (original order)
                break;
        }
        
        productContainer.innerHTML = sorted.map(product => `
            <div class=\"cloth\">
                <div class=\"img-box\">
                    <img src=\"${product.imageUrl}\" alt=\"${product.name}\" loading=\"lazy\" />
                    <div class=\"cart-hover\" data-id=\"${product.id}\" title=\"Add to cart\">🛒</div>
                    <div class=\"top d-flex justify-content-between align-items-center text-white est\">
                        <button class=\"pp\" type=\"button\">UP TO -23%</button>
                        <div class=\"ppp\" title=\"Add to wishlist\">
                            <i class=\"fa-regular fa-heart wishlist-icon\" data-id=\"${product.id}\"></i>
                        </div>
                    </div>
                </div>
                <p class=\"text-start\"><strong>${product.name}</strong></p>
                <p class=\"text-start\">
                    <span class=\"line\">₦${product.originalPrice.toLocaleString()}</span>
                    <strong>₦${product.discountedPrice.toLocaleString()}</strong>
                </p>
                <h3 class=\"text-start\">SIZE</h3>
                <div class=\"d-flex gap-2\">
                    ${product.sizes.map(size => `<button class=\"btn btn-outline-light\" type=\"button\">${size}</button>`).join(\"\")}
                </div>
            </div>
        `).join(\"\");
    });
}

/* ============================================ 
   NOTIFICATION SYSTEM
   ============================================ */
const showNotification = (message) => {
    const notification = document.createElement(\"div\");
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = \"slideOut 0.3s ease-in\";
        setTimeout(() => notification.remove(), 300);
    }, 2000);
};

// Add CSS animations
const style = document.createElement(\"style\");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================ 
   INITIALIZATION
   ============================================ */
initializeCart();


