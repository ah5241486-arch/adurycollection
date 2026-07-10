// ১. প্রোডাক্ট লিস্ট
const products = [
    { id: 1, name: "কাশ্মীরি", price: 490, image: "https://via.placeholder.com/250" },
    { id: 2, name: "এয়ারটেল", price: 550, image: "https://via.placeholder.com/250" },
    { id: 3, name: "জমজম", price: 600, image: "https://via.placeholder.com/250" },
    { id: 4, name: "আরি সিকুয়েবস", price: 650, image: "https://via.placeholder.com/250" },
    { id: 5, name: "মার্শাল", price: 950, image: "https://via.placeholder.com/250" },
    { id: 6, name: "জয়পুরী", price: 750, image: "https://via.placeholder.com/250" }
];

let cart = [];

// ২. প্রোডাক্ট ডিসপ্লে ফাংশন
function displayProducts() {
    const productGrid = document.getElementById('flash-sale-products');
    if (!productGrid) return;
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" style="border: 1px solid #ddd; padding: 15px; margin: 10px; border-radius: 10px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <img src="${product.image}" style="width: 100%; border-radius: 5px;">
            <h3 style="margin: 10px 0;">${product.name}</h3>
            <p style="color: #e91e63; font-weight: bold;">${product.price} টাকা</p>
            <div style="margin: 10px 0;">
                <button onclick="updateQty(${product.id}, -1)" style="padding: 5px 10px;">-</button>
                <span id="qty-${product.id}" style="margin: 0 10px; font-weight: bold;">0</span>
                <button onclick="updateQty(${product.id}, 1)" style="padding: 5px 10px;">+</button>
            </div>
            <button onclick="addToCart(${product.id})" style="background: #e91e63; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Add to Cart</button>
        </div>
    `).join('');
}

// ৩. কোয়ান্টিটি আপডেট
function updateQty(id, change) {
    const span = document.getElementById(`qty-${id}`);
    let val = parseInt(span.innerText) + change;
    if (val < 0) val = 0;
    span.innerText = val;
}

// ৪. কার্টে যোগ করা
function addToCart(id) {
    const qty = parseInt(document.getElementById(`qty-${id}`).innerText);
    if (qty <= 0) return alert("দয়া করে পণ্যের সংখ্যা সিলেক্ট করুন!");
    
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }
    alert(product.name + " (" + qty + " পিস) কার্টে যোগ হয়েছে!");
}

// ৫. চেকআউট এবং হোয়াটসঅ্যাপ অর্ডার
function checkout() {
    if (cart.length === 0) return alert("আপনার কার্ট খালি!");
    
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let deliveryCharge = (totalQty <= 2) ? 130 : 130 + ((totalQty - 2) * 10);
    let grandTotal = subtotal + deliveryCharge;

    let message = "অর্ডার লিস্ট:\n";
    cart.forEach(item => message += `- ${item.name}: ${item.qty} পিস (${item.price * item.qty} টাকা)\n`);
    message += `\nসাব-টোটাল: ${subtotal} টাকা\nডেলিভারি চার্জ: ${deliveryCharge} টাকা\nমোট: ${grandTotal} টাকা\n\nনাম:\nঠিকানা:\nফোন নাম্বার:`;

    window.open(`https://wa.me/8801969080416?text=${encodeURIComponent(message)}`, '_blank');
}

// ৬. পেজ লোড হলে বাটন তৈরি
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    
    // বাটন তৈরি
    const btn = document.createElement("button");
    btn.innerText = "অর্ডার সম্পন্ন করুন (WhatsApp)";
    btn.className = "pulsate-btn";
    btn.style = "display:block; margin: 30px auto; padding: 20px 40px; background: #e91e63; color: white; border: none; border-radius: 50px; font-size: 18px; font-weight: bold; cursor: pointer; animation: pulse 1.5s infinite;";
    btn.onclick = checkout;
    
    // স্টাইল হেডারে ইনজেক্ট করা
    const style = document.createElement('style');
    style.innerHTML = `@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(233, 30, 99, 0.6); } 100% { transform: scale(1); } }`;
    document.head.appendChild(style);
    
    document.getElementById('flash-sale-products').after(btn);
});
