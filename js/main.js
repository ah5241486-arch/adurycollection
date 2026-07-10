const products = [
    { id: 1, name: "কাশ্মীরি", price: 490 },
    { id: 2, name: "এয়ারটেল", price: 550 },
    { id: 3, name: "জমজম", price: 600 }
];

function displayProducts() {
    const container = document.getElementById('flash-sale-products');
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <h4>${p.name}</h4>
            <p>দাম: ৳${p.price}</p>
            <div id="controls-${p.id}">
                <button onclick="showOrderForm(${p.id})" class="pulsate-btn">Order Now</button>
            </div>
        </div>
    `).join('');
}

// বাটন ক্লিক করার পর প্লাস-মাইনাস অপশন আসা
function showOrderForm(id) {
    const area = document.getElementById(`controls-${id}`);
    area.innerHTML = `
        <div style="margin:10px 0;">
            <button onclick="changeQty(${id}, -1)" style="padding:5px 10px;">-</button>
            <span id="qty-${id}" style="margin:0 10px; font-weight:bold;">1</span>
            <button onclick="changeQty(${id}, 1)" style="padding:5px 10px;">+</button>
        </div>
        <button onclick="openCheckout(${id})" class="confirm-btn">Confirm Order</button>
    `;
}

function changeQty(id, val) {
    const span = document.getElementById(`qty-${id}`);
    let qty = Math.max(1, parseInt(span.innerText) + val);
    span.innerText = qty;
}

function openCheckout(id) {
    window.selectedProd = products.find(p => p.id === id);
    window.selectedQty = parseInt(document.getElementById(`qty-${id}`).innerText);
    document.getElementById('checkout-modal').style.display = 'block';
}

// ক্যাশ অন ডেলিভারি + হোয়াটসঅ্যাপ লজিক
function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-address').value;
    const phone = document.getElementById('cust-phone').value;

    if(!name || !addr || !phone) {
        alert("দয়া করে সব তথ্য পূরণ করুন!");
        return;
    }

    let delCharge = 130;
    if (window.selectedQty > 2) delCharge += (window.selectedQty - 2) * 10;
    
    const total = (window.selectedProd.price * window.selectedQty) + delCharge;

    const msg = `নতুন অর্ডার!%0Aনাম: ${name}%0Aঠিকানা: ${addr}%0Aফোন: ${phone}%0Aপণ্য: ${window.selectedProd.name}%0Aপরিমাণ: ${window.selectedQty}%0Aপেমেন্ট: Cash On Delivery%0Aমোট বিল: ${total} টাকা`;

    window.location.href = `https://wa.me/8801969080416?text=${msg}`;
}

document.addEventListener("DOMContentLoaded", displayProducts);
