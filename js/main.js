const products = [
    { id: 1, name: "কাশ্মীরি", price: 490, image: "https://via.placeholder.com/200" },
    { id: 2, name: "এয়ারটেল", price: 550, image: "https://via.placeholder.com/200" },
    { id: 3, name: "জমজম", price: 600, image: "https://via.placeholder.com/200" },
    { id: 4, name: "আরি সিকুয়েবস", price: 650, image: "https://via.placeholder.com/200" },
    { id: 5, name: "মার্শাল", price: 950, image: "https://via.placeholder.com/200" },
    { id: 6, name: "জয়পুরী", price: 750, image: "https://via.placeholder.com/200" }
];

function displayProducts() {
    const container = document.getElementById('flash-sale-products');
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 1fr";
    container.style.gap = "10px";

    container.innerHTML = products.map(product => `
        <div id="card-${product.id}" style="border: 1px solid #eee; padding: 10px; border-radius: 10px; text-align: center; background: #fff;">
            <img src="${product.image}" style="width: 100%; border-radius: 8px;">
            <h4 style="margin: 8px 0;">${product.name}</h4>
            <p style="color: #ff9800; font-weight: bold;">৳${product.price}</p>
            
            <div id="action-area-${product.id}">
                <button id="add-btn-${product.id}" onclick="showControls(${product.id})" style="width:100%; background:#ff9800; color:white; border:none; padding:8px; border-radius:5px;">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function showControls(id) {
    const area = document.getElementById(`action-area-${id}`);
    area.innerHTML = `
        <div style="margin-bottom: 5px;">
            <button onclick="updateQty(${id}, -1)">-</button>
            <span id="qty-${id}" style="margin: 0 10px;">1</span>
            <button onclick="updateQty(${id}, 1)">+</button>
        </div>
        <button onclick="orderSingle(${id})" style="width:100%; background:green; color:white; border:none; padding:5px; border-radius:5px;">Order Now</button>
    `;
}

function updateQty(id, change) {
    const span = document.getElementById(`qty-${id}`);
    let val = Math.max(1, parseInt(span.innerText) + change);
    span.innerText = val;
}

function orderSingle(id) {
    const product = products.find(p => p.id === id);
    const qty = parseInt(document.getElementById(`qty-${id}`).innerText);
    const delivery = 130 + (qty > 2 ? (qty - 2) * 10 : 0);
    const total = (product.price * qty) + delivery;
    
    let msg = `অর্ডার: ${product.name} (${qty} পিস) - ${product.price * qty} টাকা%0Aডেলিভারি: ${delivery} টাকা%0Aমোট: ${total} টাকা%0A%0Aআপনার নাম ও ঠিকানা দিন:`;
    window.location.href = `https://wa.me/8801969080416?text=${msg}`;
}

document.addEventListener("DOMContentLoaded", displayProducts);
