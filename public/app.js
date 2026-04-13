// Check if user is logged in
function isUserLoggedIn() {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser).isLoggedIn : false;
}

function requireLogin(action = "access this feature") {
    if (!isUserLoggedIn()) {
        alert(`Please login to ${action}`);
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// Product Data
const products = [
    { id: 1, name: "High-Grade Plain Soft 100% Cotton Dark grey Round Neck T-shirt", originalPrice: 39000, discountedPrice: 29970, sizes: ["M", "L", "XL"], imageUrl: "./clothes/1-46-630x630.jpg" },
    { id: 2, name: "High-Grade Plain Soft 100% Cotton Army-Green Round Neck T-shirt", originalPrice: 39000, discountedPrice: 29970, sizes: ["M", "L", "XL"], imageUrl: "./clothes/1-47-630x630.jpg" },
    { id: 3, name: "High-Grade Plain Soft 100% Cotton Coral red Neck T-shirt", originalPrice: 39000, discountedPrice: 29970, sizes: ["M", "L", "XL"], imageUrl: "./clothes/1-48-630x630.jpg" },
    { id: 4, name: "High-Grade Plain Soft 100% Cotton Almond Round Neck T-shirt", originalPrice: 39000, discountedPrice: 29970, sizes: ["M", "L", "XL"], imageUrl: "./clothes/1-49-630x630.jpg" },
    { id: 5, name: "High-Grade Plain Soft 100% Cotton Army-Green Round Neck T-shirt", originalPrice: 39000, discountedPrice: 29970, sizes: ["M", "L", "XL"], imageUrl: "./clothes/1-50-630x630.jpg" },
    { id: 6, name: "High-Grade Plain Soft 100% Cotton light blue Hoodie", originalPrice: 69000, discountedPrice: 49970, sizes: ["M", "L", "XL"], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKUB1Ahj3znOtZBwWRo5WC6NSoqzbuOtZ5bg&s" },
    { id: 7, name: "High-Grade Plain Soft 100% Cotton deep-orange Hoodie", originalPrice: 69000, discountedPrice: 49970, sizes: ["M", "L", "XL"], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWMGE16b_TDNFis3ch3Sn8F0pxeQxWWLG_g&s" },
    { id: 8, name: "High-Grade Plain Soft 100% Cotton yellow Hoodie", originalPrice: 69000, discountedPrice: 49970, sizes: ["M", "L", "XL"], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF5Y90QzR4got7vCBLLKEVjtxvVfVey5oJ7Q&s" },
    { id: 9, name: "High-Grade Plain Soft 100% Cotton Black Hoodie", originalPrice: 69000, discountedPrice: 49970, sizes: ["M", "L", "XL"], imageUrl: "https://www.flannels.com/images/imgzoom/53/53750903_xxl.jpg" }
];

let wishlistCount = 0;

// DOM elements
let productContainer, navbarHeart, navbarHeartCount, navbarCartCount, searchBtn, queryInput, modalBody, sortDropdown;
let searchBtnMobile, queryInputMobile;

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Ensure Bootstrap is available on mobile
    if (typeof bootstrap === 'undefined') {
        console.warn('Bootstrap not loaded - waiting...');
        setTimeout(init, 500);
    } else {
        init();
    }
});

window.addEventListener('load', function() {
    console.log('Page fully loaded');
});

function init() {
    // Get DOM elements
    productContainer = document.getElementById("product");
    navbarHeart = document.querySelector(".nav-heart");
    navbarHeartCount = document.querySelector(".nav-heart-count");
    navbarCartCount = document.querySelector(".nav-cart-count");
    searchBtn = document.getElementById("searchBtn");
    queryInput = document.getElementById("query");
    searchBtnMobile = document.getElementById("searchBtn-mobile");
    queryInputMobile = document.getElementById("query-mobile");
    modalBody = document.getElementById("body");
    sortDropdown = document.querySelector(".sort-dropdown");
    
    console.log('Initializing - Product Container found:', !!productContainer);
    console.log('Search button found:', !!searchBtn);
    console.log('Query input found:', !!queryInput);
    
    if (!productContainer) {
        console.error('ERROR: Product container not found!');
        return;
    }
    
    // Display products
    displayProducts(products);
    
    // Initialize cart
    initializeCart();
    
    // Setup modal cleanup
    setupModalCleanup();
    
    // Event listeners
    setupEventListeners();
}

function setupModalCleanup() {
    const myModal = document.getElementById('myModal');
    if (myModal) {
        // Handle when modal is hidden
        myModal.addEventListener('hidden.bs.modal', function() {
            console.log('Modal hidden - cleaning up');
            
            // Bootstrap handles modal-open class, just restore body styles
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            // Clear search inputs
            if (queryInput) queryInput.value = '';
            if (queryInputMobile) queryInputMobile.value = '';
            
            // Remove any leftover backdrop (with safety check)
            setTimeout(() => {
                document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                    if (!document.body.classList.contains('modal-open')) {
                        backdrop.remove();
                    }
                });
            }, 300);
        });
        
        // Handle when modal is shown
        myModal.addEventListener('shown.bs.modal', function() {
            console.log('Modal shown');
        });
        
        // Handle ESC key to properly close modal
        myModal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const bsModal = bootstrap.Modal.getInstance(myModal);
                if (bsModal) {
                    bsModal.hide();
                }
            }
        });
    }
}

function displayProducts(productsToDisplay) {
    if (!productContainer) return;
    
    let html = '';
    productsToDisplay.forEach(product => {
        html += `
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
                ${product.sizes.map(size => `<button class="btn btn-outline-light" type="button">${size}</button>`).join('')}
            </div>
        </div>
        `;
    });
    
    productContainer.innerHTML = html;
    console.log('Displayed ' + productsToDisplay.length + ' products');
}

function initializeCart() {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (navbarCartCount) {
        navbarCartCount.textContent = savedCart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function setupEventListeners() {
    // Cart hover click - supports both click and touch
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cart-hover')) {
            addToCart(parseInt(e.target.dataset.id));
        }
        
        if (e.target.classList.contains('wishlist-icon')) {
            toggleWishlist(e.target);
        }
    });
    
    // Touch support for mobile
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('cart-hover')) {
            e.preventDefault();
            addToCart(parseInt(e.target.dataset.id));
        }
        
        if (e.target.classList.contains('wishlist-icon')) {
            e.preventDefault();
            toggleWishlist(e.target);
        }
    }, { passive: false });
    
    // Desktop Search
    if (searchBtn && queryInput) {
        searchBtn.addEventListener('click', performSearch);
        queryInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
        queryInput.addEventListener('input', debounce(performLiveSearch, 300));
    }
    
    // Mobile Search
    if (searchBtnMobile && queryInputMobile) {
        searchBtnMobile.addEventListener('click', performSearchMobile);
        queryInputMobile.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearchMobile();
        });
        queryInputMobile.addEventListener('input', debounce(performLiveSearchMobile, 300));
    }
    
    // Sort
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function(e) {
            let sorted = [...products];
            if (e.target.value === "Sort by price low to high") {
                sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
            } else if (e.target.value === "Sort by price high to low") {
                sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
            }
            displayProducts(sorted);
        });
    }
}

function addToCart(productId) {
    if (!requireLogin("add items to cart")) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
    
    localStorage.setItem("cart", JSON.stringify(cart));
    navbarCartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    showNotification('Added to cart!');
}

function toggleWishlist(icon) {
    if (!requireLogin("add items to wishlist")) {
        icon.classList.remove('active');
        return;
    }
    
    icon.classList.toggle('active');
    
    if (icon.classList.contains('active')) {
        wishlistCount++;
        icon.classList.replace('fa-regular', 'fa-solid');
        showNotification('Added to wishlist!');
    } else {
        wishlistCount--;
        icon.classList.replace('fa-solid', 'fa-regular');
        showNotification('Removed from wishlist!');
    }
    
    if (navbarHeartCount) navbarHeartCount.textContent = wishlistCount;
    
    if (navbarHeart) {
        if (wishlistCount > 0) {
            navbarHeart.classList.add('active-heart');
            navbarHeart.classList.replace('fa-regular', 'fa-solid');
        } else {
            navbarHeart.classList.remove('active-heart');
            navbarHeart.classList.replace('fa-solid', 'fa-regular');
        }
    }
}

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Enhanced search with fuzzy matching
function searchProducts(query) {
    const q = query.trim().toLowerCase();
    
    if (!q) return [];
    
    return products.filter(product => {
        const name = product.name.toLowerCase();
        const nameMatch = name.includes(q);
        const sizeMatch = product.sizes.some(size => size.toLowerCase().includes(q));
        
        // Extract color keywords from product name
        const colorKeywords = ['grey', 'gray', 'green', 'red', 'blue', 'black', 'white', 'yellow', 'orange', 'coral', 'almond', 'army', 'light'];
        const colorMatch = colorKeywords.some(color => name.includes(color) && q.includes(color.substring(0, 3)));
        
        return nameMatch || sizeMatch || colorMatch;
    });
}

function performLiveSearch() {
    const query = queryInput.value.trim().toLowerCase();
    
    if (query.length < 2) return;
    
    const results = searchProducts(query);
    renderSearchResults(results, query);
    
    const myModal = document.getElementById('myModal');
    if (myModal) {
        try {
            const bsModal = bootstrap.Modal.getInstance(myModal);
            if (bsModal) {
                bsModal.show();
            } else {
                new bootstrap.Modal(myModal).show();
            }
        } catch(e) {
            console.error('Modal error:', e);
        }
    }
}

function performSearch() {
    const query = queryInput.value.trim().toLowerCase();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    const results = searchProducts(query);
    renderSearchResults(results, query);
    
    const myModal = document.getElementById('myModal');
    if (myModal) {
        try {
            // First hide any existing modal
            const bsModal = bootstrap.Modal.getInstance(myModal);
            if (bsModal) {
                bsModal.dispose();
            }
            
            // Show fresh modal
            new bootstrap.Modal(myModal, {
                backdrop: true,
                keyboard: true,
                focus: true
            }).show();
        } catch(e) {
            console.error('Modal error:', e);
        }
    }
}

function renderSearchResults(results, query) {
    console.log('Searching for:', query, 'Found:', results.length);
    
    if (!modalBody) {
        console.error('Modal body not found!');
        return;
    }
    
    let html = '';
    
    if (results.length === 0) {
        html = `
        <div class="text-center py-5">
            <p class="text-muted mb-3" style="font-size: 16px;">No products found for "<strong>${query}</strong>"</p>
            <p class="text-muted small">Try searching for colors, sizes, or product types</p>
            <div class="mt-4">
                <strong class="d-block mb-2">Popular searches:</strong>
                <button class="btn btn-sm btn-outline-primary me-2 mb-2" onclick="document.getElementById('query').value = 'Grey'; performSearch();">Grey</button>
                <button class="btn btn-sm btn-outline-primary me-2 mb-2" onclick="document.getElementById('query').value = 'Hoodie'; performSearch();">Hoodie</button>
                <button class="btn btn-sm btn-outline-primary me-2 mb-2" onclick="document.getElementById('query').value = 'XL'; performSearch();">XL</button>
            </div>
        </div>
        `;
    } else {
        html += `<div class="mb-3"><small><strong style="color: #28a745;">${results.length} result${results.length !== 1 ? 's' : ''} found</strong></small></div>`;
        html += '<div class="row g-3">';
        
        results.forEach(product => {
            html += `
            <div class="col-md-6 col-lg-4">
                <div class="cloth h-100">
                    <div class="img-box">
                        <img src="${product.imageUrl}" alt="${product.name}" style="width:100%; height:200px; object-fit: cover; border-radius:8px;" />
                        <div class="cart-hover" data-id="${product.id}" title="Add to cart">🛒</div>
                    </div>
                    <p class="mb-2" style="margin-top: 10px;"><strong style="font-size: 14px;">${product.name}</strong></p>
                    <p class="mb-2">
                        <span style="text-decoration: line-through; color: #999; font-size: 12px;">₦${product.originalPrice.toLocaleString()}</span><br/>
                        <strong style="color: #28a745; font-size: 16px;">₦${product.discountedPrice.toLocaleString()}</strong>
                    </p>
                    <div class="d-flex gap-1 flex-wrap">
                        ${product.sizes.map(size => `<span class="badge bg-info" style="font-size: 12px;">${size}</span>`).join('')}
                    </div>
                </div>
            </div>
            `;
        });
        
        html += '</div>';
    }
    
    modalBody.innerHTML = html;
}

// Mobile search wrapper functions
function performLiveSearchMobile() {
    const query = queryInputMobile.value.trim().toLowerCase();
    queryInput.value = query;
    performLiveSearch();
}

function performSearchMobile() {
    const query = queryInputMobile.value.trim().toLowerCase();
    queryInput.value = query;
    performSearch();
}

function showNotification(message) {
    const notification = document.createElement('div');
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
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}
