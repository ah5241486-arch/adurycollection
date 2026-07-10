// প্রোডাক্ট ডাটা
const products = [
    { id: 1, name: "কাশ্মীরি", price: "৪৯০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 2, name: "এয়ারটেল", price: "৫৫০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 3, name: "জমজম", price: "৬০০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 4, name: "আরি সিকুয়েবস", price: "৬৫০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 5, name: "মার্শাল", price: "৯৫০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 6, name: "জয়পুরী", price: "৭৫০ টাকা", image: "https://via.placeholder.com/250" }
];

// প্রোডাক্ট রেন্ডার করা
function displayProducts(productList = products) {
    const productGrid = document.getElementById('flash-sale-products');
    if (productGrid) {
        productGrid.innerHTML = "";
        productList.forEach(product => {
            productGrid.innerHTML += `
                <div class="product-card" style="border: 1px solid #ddd; padding: 10px; margin: 10px; border-radius: 8px; text-align: center;">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%;">
                    <h3>${product.name}</h3>
                    <p class="price" style="color: #e91e63; font-weight: bold;">${product.price}</p>
                    <button class="btn-add" onclick="addToCart('${product.name}')" style="background: #e91e63; color: white; border: none; padding: 8px 15px; cursor: pointer;">কার্টে যোগ করুন</button>
                </div>
            `;
        });
    }
}

// সার্চ ফাংশন
function searchProducts() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );
    displayProducts(filteredProducts);
}

// কার্টে যোগ করা
function addToCart(productName) {
    alert(productName + " কার্টে যোগ করা হয়েছে!");
}

// পেজ লোড হওয়ার সাথে সাথে প্রোডাক্ট দেখানো
document.addEventListener("DOMContentLoaded", function() {
    displayProducts();
});
