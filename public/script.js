  let wishlistCount = 0;

const navbarHeart = document.querySelector(".nav-heart");
const navbarHeartCount = document.querySelector(".nav-heart-count");



 let product = [
        {
            id: 1,
            name: "High-Grade Plain Soft 100% Cotton Dark grey Round Neck T-shirt",
            originalPrice: 39000,
            discountedPrice: 29970,
            sizes: ["M", "L", "XL"],
            imageUrl: "./clothes/1-46-630x630.jpg"
        },
        {
            id: 2,
            name: "High-Grade Plain Soft 100% Cotton Army-Green Round Neck T-shirt",
            originalPrice: 39000,
            discountedPrice: 29970,
            sizes: ["M", "L", "XL"],
            imageUrl: "./clothes/1-47-630x630.jpg"
        },
        {
           id: 3,
            name: "High-Grade Plain Soft 100% Cotton Coral red Neck T-shirt",
            originalPrice: 39000,
            discountedPrice: 29970,
            sizes: ["M", "L", "XL"],
            imageUrl: "./clothes/1-48-630x630.jpg" 
        },
        {
            id: 4,
            name: "High-Grade Plain Soft 100% Cotton Almond Round Neck T-shirt",
            originalPrice: 39000,
            discountedPrice: 29970,
            sizes: ["M", "L", "XL"],
            imageUrl: "./clothes/1-49-630x630.jpg"
        },
        {
            id: 5,
            name: "High-Grade Plain Soft 100% Cotton Army-Green Round Neck T-shirt",
            originalPrice: 39000,
            discountedPrice: 29970,
            sizes: ["M", "L", "XL"],
            imageUrl: "./clothes/1-50-630x630.jpg"
        },
        {
            id: 6,
            name: "High-Grade Plain Soft 100% Cotton light blue Hoodie",
            originalPrice: 69000,
            discountedPrice: 49970,
            sizes: ["M", "L", "XL"],
            imageUrl: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKUB1Ahj3znOtZBwWRo5WC6NSoqzbuOtZ5bg&s"
        },
        {
            id: 7,
            name: "High-Grade Plain Soft 100% Cotton deep-orange Hoodie",
            originalPrice: 69000,
            discountedPrice: 49970,
            sizes: ["M", "L", "XL"],
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWMGE16b_TDNFis3ch3Sn8F0pxeQxWWLG_g&s"
        },
        {
            id: 8,
            name: "High-Grade Plain Soft 100% Cotton yellow Hoodie",
            originalPrice: 69000,
            discountedPrice: 49970,
            sizes: ["M", "L", "XL"],
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF5Y90QzR4got7vCBLLKEVjtxvVfVey5oJ7Q&s"
        },
        {
            id: 9,
            name: "High-Grade Plain Soft 100% Cotton Black Hoodie",
            originalPrice: 69000,
            discountedPrice: 49970,
            sizes: ["M", "L", "XL"],
            imageUrl: "https://www.flannels.com/images/imgzoom/53/53750903_xxl.jpg"
        }
        
    ]


        const productContainer = document.getElementById("product");

const displayProducts = () => {
   productCard.innerHTML = `
    <div class="cloth cl1">
        <div class="img-box">
            <img src="${product.imageUrl}" alt="${product.name}">
            
            <div class="cart-hover" onclick="addToCart(${product.id})">🛒</div>

            <div class="top d-flex justify-content-between align-items-center text-white est">
                <button class="pp">UP TO -23%</button>
                <div class="ppp">
                    <i class="fa-regular fa-heart" onclick="toggleWishlist(this, ${product.id})"></i>
                </div>
            </div>
        </div>

        <p class="text-start">${product.name}</p>
        <p class="text-start">
            <span class="line">₦${product.originalPrice}</span> ₦${product.discountedPrice}
        </p>
    </div>
`;

};

displayProducts();

// SEARCH FUNCTION
function searchProducts() {
    let query = document.getElementById("query").value.trim().toLowerCase();
    let modalBody = document.getElementById("body");

    let results = product.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.sizes.some(size => size.toLowerCase() === query)
    );

    if (results.length === 0) {
        modalBody.innerHTML = "<h4>No products found</h4>";
        return;
    }

    modalBody.innerHTML = results.map(p => `
        <div class="cloth mb-3">
            <img src="${p.imageUrl}" style="width:100%; height:200px; border-radius:8px" />
            <p>${p.name}</p>
            <p><span class="line">₦${p.originalPrice}</span> ₦${p.discountedPrice}</p>
        </div>
    `).join("");
}

// REGISTER CLICK EVENTS FOR WISHLIST
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("wishlist-icon")) {

        let icon = e.target;

        // TOGGLE PRODUCT HEART
        icon.classList.toggle("active");

        if (icon.classList.contains("active")) {
            wishlistCount++;
            icon.classList.replace("fa-regular", "fa-solid");
        } else {
            wishlistCount--;
            icon.classList.replace("fa-solid", "fa-regular");
        }

        // UPDATE NAVBAR COUNT
        navbarHeartCount.textContent = wishlistCount;

        // UPDATE NAVBAR HEART COLOR
        if (wishlistCount > 0) {
            navbarHeart.classList.add("active-heart");
            navbarHeart.classList.replace("fa-regular", "fa-solid");
        } else {
            navbarHeart.classList.remove("active-heart");
            navbarHeart.classList.replace("fa-solid", "fa-regular");
        }
    }
});

    let cartCount = 0;

function addToCart(id) {
    cartCount++;
    document.querySelector(".nav-cart-count").innerText = cartCount;

    // OPTIONAL: show small animation
    let cartIcon = document.querySelector(".nav-cart-count");
    cartIcon.style.transform = "scale(1.3)";
    setTimeout(() => cartIcon.style.transform = "scale(1)", 200);
}


