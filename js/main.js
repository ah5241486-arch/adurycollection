// আমাদের প্রোডাক্টগুলোর একটি লিস্ট বা ডাটাবেজ
const products = [const products = [
    { id: 1, name: "কাশ্মীরি", price: "৪৯০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 2, name: "এয়ারটেল", price: "৫৫০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 3, name: "জমজম", price: "৬০০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 4, name: "আরি সিকুয়েবস", price: "৬৫০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 5, name: "মার্শাল", price: "৯৫০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 6, name: "জয়পুরী", price: "৭৫০ টাকা", image: "https://via.placeholder.com/250" }
];

    {
        id: 1,
        name: "কাশ্মীরি শাল",
        price: "১২০০ টাকা",
        image: "https://via.placeholder.com/250"
    },
    {
        id: 2,
        name: "জমজম থ্রি-পিস",
        price: "১৫০০ টাকা",
        image: "https://via.placeholder.com/250"
    },
    {
        id: 3,
        name: "নতুন কালেকশন ড্রেস",
        price: "১৮০০ টাকা",
        image: "https://via.placeholder.com/250"
    }
];

// এই ডাটাগুলো পরে আমরা ওয়েবসাইটে দেখাব।
console.log("প্রোডাক্ট ডাটা লোড হয়েছে:", products);
// প্রোডাক্টগুলোকে ওয়েবসাইটে দেখানোর ফাংশন
function displayProducts() {
    const productGrid = document.getElementById('flash-sale-products');
    
    // প্রোডাক্ট গ্রিড পরিষ্কার করা
    productGrid.innerHTML = "";

    // প্রতিটি প্রোডাক্টের জন্য HTML তৈরি করা
    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <button class="btn-add">কার্টে যোগ করুন</button>
            </div>
        `;
        productGrid.innerHTML += productHTML;
    });
}

// ফাংশনটি রান করা
displayProducts();
// সার্চ ফাংশন
function searchProducts() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );

    const productGrid = document.getElementById('flash-sale-products');
    productGrid.innerHTML = "";

    filteredProducts.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <button class="btn-add">কার্টে যোগ করুন</button>
            </div>
        `;
    });
}
// ১. প্রোডাক্ট ডাটা
const products = [
    { id: 1, name: "কাশ্মীরি শাল", price: "১২০০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 2, name: "জমজম থ্রি-পিস", price: "১৫০০ টাকা", image: "https://via.placeholder.com/250" },
    { id: 3, name: "নতুন কালেকশন ড্রেস", price: "১৮০০ টাকা", image: "https://via.placeholder.com/250" }
];

// ২. প্রোডাক্ট রেন্ডার করা (আপডেট করা)
function displayProducts(productList = products) {
    const productGrid = document.getElementById('flash-sale-products');
    productGrid.innerHTML = "";

    productList.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <button class="btn-add" onclick="addToCart('${product.name}')">কার্টে যোগ করুন</button>
            </div>
        `;
    });
}

// ৩. সার্চ ফাংশন
function searchProducts() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );
    displayProducts(filteredProducts);
}

// ৪. কার্টে যোগ করা
function addToCart(productName) {
    alert(productName + " কার্টে যোগ করা হয়েছে!");
}

// শুরুতে প্রোডাক্টগুলো দেখাও
displayProducts();
