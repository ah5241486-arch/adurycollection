const products = [
    { id: 1, name: "কাশ্মীরি", price: 490 },
    { id: 2, name: "এয়ারটেল", price: 550 },
    { id: 3, name: "জমজম", price: 600 }
];

// প্রোডাক্ট রেন্ডার করা
function displayProducts() {
    const container = document.getElementById('flash-sale-products');
    if (!container) return;
    
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <h4>${p.name}</h4>
            <p>দাম: ৳${p.price}</p>
            <div id="controls-${p.id}">
                <button onclick="showOrderForm(${p.id})" class="btn-shop">Order Now</button>
            </div>
        </div>
    `).join('');
}

// অর্ডার ফর্ম দেখানো
function showOrderForm(id) {
    const p = products.find(x => x.id === id);
    const area = document.getElementById(`controls-${id}`);
    area.innerHTML = `
        <div style="margin:10px 0;">
            <button onclick="changeQty(${id}, -1)">-</button>
            <span id="qty-${id}" style="margin:0 10px;">1</span>
            <button onclick="changeQty(${id}, 1)">+</button>
        </div>
        <button onclick="openCheckout(${id})" style="background:green; color:white; padding:5px 10px;">Confirm Order</button>
    `;
}

function changeQty(id, val) {
    const span = document.getElementById(`qty-${id}`);
    let qty = Math.max(1, parseInt(span.innerText) + val);
    span.innerText = qty;
}

// মডাল ওপেন করা
function openCheckout(id) {
    window.selectedProd = products.find(p => p.id === id);
    window.selectedQty = parseInt(document.getElementById(`qty-${id}`).innerText);
    document.getElementById('checkout-modal').style.display = 'block';
}

// হোয়াটসঅ্যাপে অর্ডার পাঠানো
function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-address').value;
    const phone = document.getElementById('cust-phone').value;

    if(!name || !addr || !phone) return alert("দয়া করে সব তথ্য পূরণ করুন!");

    // ডেলিভারি চার্জ হিসাব (প্রথম ২ পিস ১৩০, এরপর প্রতি পিস ১০ টাকা বাড়তি)
    let delCharge = 130;
    if (window.selectedQty > 2) {
        delCharge += (window.selectedQty - 2) * 10;
    }

    const totalBill = (window.selectedProd.price * window.selectedQty) + delCharge;

    const msg = `নতুন অর্ডার এসেছে!%0A
    নাম: ${name}%0A
    ঠিকানা: ${addr}%0A
    ফোন: ${phone}%0A
    পণ্য: ${window.selectedProd.name}%0A
    পরিমাণ: ${window.selectedQty} পিস%0A
    ডেলিভারি চার্জ: ${delCharge} টাকা%0A
    মোট বিল: ${totalBill} টাকা`;

    window.location.href = `https://wa.me/8801969080416?text=${msg}`;
}

document.addEventListener("DOMContentLoaded", displayProducts);
