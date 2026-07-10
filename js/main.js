// ১. প্রোডাক্ট ডাটা
const products = [
    { id: 1, name: "কাশ্মীরি", price: 490, image: "https://via.placeholder.com/200" },
    { id: 2, name: "এয়ারটেল", price: 550, image: "https://via.placeholder.com/200" },
    { id: 3, name: "জমজম", price: 600, image: "https://via.placeholder.com/200" },
    { id: 4, name: "আরি সিকুয়েবস", price: 650, image: "https://via.placeholder.com/200" },
    { id: 5, name: "মার্শাল", price: 950, image: "https://via.placeholder.com/200" },
    { id: 6, name: "জয়পুরী", price: 750, image: "https://via.placeholder.com/200" }
];

let currentProduct = null;
let currentQty = 0;

// ২. প্রোডাক্ট রেন্ডার করা
function displayProducts() {
    const container = document.getElementById('flash-sale-products');
    if (!container) return;
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" style="width: 100%; border-radius: 8px;">
            <h4>${product.name}</h4>
            <p style="color: #ff9800; font-weight: bold;">৳${product.price}</p>
            <div id="action-area-${product.id}">
                <button onclick="showControls(${product.id})" class="pulsate-btn" style="width:100%; background:#e91e63; border:none; padding:8px; border-radius:5px; color:white; font-weight:bold;">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// ৩. কন্ট্রোল বাটন দেখানো
function showControls(id) {
    const area = document.getElementById(`action-area-${id}`);
    area.innerHTML = `
        <div style="margin-bottom: 5px;">
            <button onclick="updateQty(${id}, -1)" style="padding: 5px 10px;">-</button>
            <span id="qty-${id}" style="margin: 0 10px; font-weight:bold;">1</span>
            <button onclick="updateQty(${id}, 1)" style="padding: 5px 10px;">+</button>
        </div>
        <button onclick="openCheckout(${id})" class="pulsate-btn" style="width:100%; background:green; border:none; padding:8px; border-radius:5px; color:white; font-weight:bold;">Order Now</button>
    `;
}

// ৪. পরিমাণ আপডেট
function updateQty(id, change) {
    const span = document.getElementById(`qty-${id}`);
    let val = Math.max(1, parseInt(span.innerText) + change);
    span.innerText = val;
}

// ৫. চেকআউট মডাল খোলা
function openCheckout(id) {
    currentProduct = products.find(p => p.id === id);
    currentQty = parseInt(document.getElementById(`qty-${id}`).innerText);
    document.getElementById('checkout-modal').style.display = 'block';
}

// ৬. অর্ডার কনফার্ম করা
function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-address').value;
    const phone = document.getElementById('cust-phone').value;

    if (!name || !addr || !phone) return alert("দয়া করে নাম, ঠিকানা ও ফোন নম্বর লিখুন!");

    const delivery = 130 + (currentQty > 2 ? (currentQty - 2) * 10 : 0);
    const total = (currentProduct.price * currentQty) + delivery;

    let msg = `নতুন অর্ডার এসেছে!%0A--------------------%0Aনাম: ${name}%0Aঠিকানা: ${addr}%0Aফোন: ${phone}%0A--------------------%0Aপণ্য: ${currentProduct.name}%0Aপরিমাণ: ${currentQty} পিস%0Aদাম: ${currentProduct.price * currentQty} টাকা%0Aডেলিভারি চার্জ: ${delivery} টাকা%0Aমোট বিল: ${total} টাকা`;

    window.location.href = `https://wa.me/8801969080416?text=${msg}`;
}

// ৭. লাফালাফি বাটনের স্টাইল ইনজেক্ট করা
const style = document.createElement('style');
style.innerHTML = `
    .pulsate-btn { animation: pulse 1.5s infinite; cursor: pointer; transition: 0.3s; }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); box-shadow: 0 0 10px rgba(0,0,0,0.3); } 100% { transform: scale(1); } }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", displayProducts);
