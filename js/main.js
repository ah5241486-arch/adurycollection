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
    container.innerHTML = products.map(product => `
        <div class="product-card" id="card-${product.id}">
            <img src="${product.image}">
            <h4 style="margin:8px 0;">${product.name}</h4>
            <p style="color:#ff9800; font-weight:bold;">৳${product.price}</p>
            <div id="action-area-${product.id}">
                <button onclick="showControls(${product.id})" class="pulsate-btn">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function showControls(id) {
    document.getElementById(`action-area-${id}`).innerHTML = `
        <div style="margin-bottom:5px;">
            <button onclick="updateQty(${id}, -1)" style="padding:2px 8px;">-</button>
            <span id="qty-${id}" style="margin:0 10px; font-weight:bold;">1</span>
            <button onclick="updateQty(${id}, 1)" style="padding:2px 8px;">+</button>
        </div>
        <button onclick="openCheckout(${id})" class="pulsate-btn" style="background:green;">Order Now</button>
    `;
}

function updateQty(id, change) {
    const el = document.getElementById(`qty-${id}`);
    el.innerText = Math.max(1, parseInt(el.innerText) + change);
}

function openCheckout(id) {
    window.selectedProd = products.find(p => p.id === id);
    window.selectedQty = parseInt(document.getElementById(`qty-${id}`).innerText);
    document.getElementById('checkout-modal').style.display = 'block';
}

function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-address').value;
    const phone = document.getElementById('cust-phone').value;
    if(!name || !addr || !phone) return alert("সব তথ্য পূরণ করুন!");
    
    const del = 130 + (window.selectedQty > 2 ? (window.selectedQty - 2) * 10 : 0);
    const tot = (window.selectedProd.price * window.selectedQty) + del;
    
    const msg = `অর্ডার এসেছে!%0Aনাম: ${name}%0Aঠিকানা: ${addr}%0Aফোন: ${phone}%0Aপণ্য: ${window.selectedProd.name}%0Aপিস: ${window.selectedQty}%0Aমোট: ${tot} টাকা`;
    window.location.href = `https://wa.me/8801969080416?text=${msg}`;
}

document.addEventListener("DOMContentLoaded", displayProducts);
