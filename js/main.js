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

function displayProducts() {
    const container = document.getElementById('flash-sale-products');
    if (!container) return;
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 1fr";
    container.style.gap = "10px";

    container.innerHTML = products.map(product => `
        <div id="card-${product.id}" style="border: 1px solid #eee; padding: 10px; border-radius: 10px; text-align: center; background: #fff;">
            <img src="${product.image}" style="width: 100%; border-radius: 8px;">
            <h4 style="margin: 8px 0;">${product.name}</h4>
            <p style="color: #ff9800; font-weight: bold;">৳${product.price}</p>
            <div id="action-area-${product.id}">
                <button id="add-btn-${product.id}" onclick="showControls(${product.id})" class="pulsate-btn" style="width:100%; background:#ff9800; border:none; padding:8px; border-radius:5px;">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function showControls(id) {
    const area = document.getElementById(`action-area-${id}`);
    area.innerHTML = `
        <div style="margin-bottom: 5px;">
            <button onclick="updateQty(${id}, -1)">-</button>
            <span id="qty-${id}" style="margin: 0 10px; font-weight:bold;">1</span>
            <button onclick="updateQty(${id}, 1)">+</button>
        </div>
        <button onclick="openCheckout(${id})" class="pulsate-btn" style="width:100%; background:green; border:none; padding:8px; border-radius:5px;">Order Now</button>
    `;
}

function updateQty(id, change) {
    const span = document.getElementById(`qty-${id}`);
    let val = Math.max(1, parseInt(span.innerText) + change);
    span.innerText = val;
}

function openCheckout(id) {
    currentProduct = products.find(p => p.id === id);
    currentQty = parseInt(document.getElementById(`qty-${id}`).innerText);
    document.getElementById('checkout-modal').style.display = 'block';
}

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

// স্টাইল ইনজেক্ট করা (লাফালাফি বাটন)
const style = document.createElement('style');
style.innerHTML = `
    .pulsate-btn { animation: pulse 1.5s infinite; color: white; cursor: pointer; }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); box-shadow: 0 0 10px rgba(0,0,0,0.3); } 100% { transform: scale(1); } }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", displayProducts);
