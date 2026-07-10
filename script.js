// ===== প্রোডাক্ট ডেটা =====
const products = [
    {
        id: 1,
        name: "নীল জর্জেট থ্রি-পিস",
        price: 2200,
        fabric: "জর্জেট",
        size: "S-XL",
        img: "https://via.placeholder.com/400x300/3d1e4a/ffffff?text=Blue+Georgette"
    },
    {
        id: 2,
        name: "গোলাপি সিল্ক থ্রি-পিস",
        price: 2500,
        fabric: "সিল্ক",
        size: "M-XXL",
        img: "https://via.placeholder.com/400x300/e94560/ffffff?text=Pink+Silk"
    },
    {
        id: 3,
        name: "সাদা কটন থ্রি-পিস",
        price: 1800,
        fabric: "কটন",
        size: "S-L",
        img: "https://via.placeholder.com/400x300/cccccc/666?text=White+Cotton"
    },
    {
        id: 4,
        name: "কালো চিফন থ্রি-পিস",
        price: 2100,
        fabric: "চিফন",
        size: "S-XXL",
        img: "https://via.placeholder.com/400x300/333333/ffffff?text=Black+Chiffon"
    },
    {
        id: 5,
        name: "হলুদ প্রিন্ট থ্রি-পিস",
        price: 1900,
        fabric: "জর্জেট",
        size: "M-XL",
        img: "https://via.placeholder.com/400x300/f4d03f/333?text=Yellow+Print"
    },
    {
        id: 6,
        name: "সবুজ এমব্রয়ডারি থ্রি-পিস",
        price: 2800,
        fabric: "সিল্ক",
        size: "S-XL",
        img: "https://via.placeholder.com/400x300/27ae60/ffffff?text=Green+Embroidery"
    }
];

// ===== গ্লোবাল ভেরিয়েবল =====
let cart = [];
let totalItems = 0;

// ===== প্রোডাক্ট লোড =====
const productList = document.getElementById('productList');

products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="badge">${p.fabric}</div>
        <h3>${p.name}</h3>
        <div class="details">📏 সাইজ: ${p.size}</div>
        <div class="price">৳${p.price}</div>
        <button onclick="addToCart(${p.id})">
            <i class="fas fa-plus"></i> কার্টে যোগ করুন
        </button>
    `;
    productList.appendChild(card);
});

// ===== কার্ট ফাংশন =====
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    totalItems++;
    updateCart();
    updateCartUI();
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        totalItems -= cart[index].quantity;
        cart.splice(index, 1);
        updateCart();
        updateCartUI();
    }
}

function updateCartUI() {
    document.getElementById('cartCount').innerText = totalItems;
}

// ===== ডেলিভারি চার্জ ক্যালকুলেট =====
function calculateDelivery(itemCount) {
    if (itemCount === 0) return 0;
    if (itemCount <= 2) return 130;
    return 130 + (itemCount - 2) * 10;
}

// ===== কার্ট আপডেট =====
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const deliveryEl = document.getElementById('deliveryCharge');
    const totalEl = document.getElementById('totalPrice');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center;color:#999;">কার্ট খালি</p>';
        subtotalEl.textContent = '৳০';
        deliveryEl.textContent = '৳০';
        totalEl.textContent = '৳০';
        return;
    }

    let subtotal = 0;
    let itemCount = 0;

    let html = '';
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        itemCount += item.quantity;
        html += `
            <div class="cart-item">
                <span class="item-name">${item.name} (x${item.quantity})</span>
                <span>
                    <span class="item-price">৳${item.price * item.quantity}</span>
                    <span class="remove-btn" onclick="removeFromCart(${item.id})">✕</span>
                </span>
            </div>
        `;
    });

    cartItems.innerHTML = html;
    subtotalEl.textContent = `৳${subtotal}`;

    const delivery = calculateDelivery(itemCount);
    deliveryEl.textContent = `৳${delivery}`;

    const total = subtotal + delivery;
    totalEl.textContent = `৳${total}`;
}

// ===== কার্ট টগল =====
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

// ===== চেকআউট =====
function showCheckout() {
    if (cart.length === 0) {
        alert('⚠️ দয়া করে প্রথমে পণ্য যোগ করুন!');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    modal.classList.add('active');

    // অর্ডার সামারি
    let html = '';
    let total = 0;
    let itemCount = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        html += `<p>${item.name} x${item.quantity} = ৳${item.price * item.quantity}</p>`;
    });

    const delivery = calculateDelivery(itemCount);
    const grandTotal = total + delivery;

    document.getElementById('orderItems').innerHTML = html;
    document.getElementById('orderTotal').innerHTML = `৳${grandTotal} (ডেলিভারি: ৳${delivery})`;
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// ===== অর্ডার প্লেস =====
function placeOrder(event) {
    event.preventDefault();

    const name = document.getElementById('customerName').value;
    const address = document.getElementById('customerAddress').value;
    const phone = document.getElementById('customerPhone').value;
    const note = document.getElementById('customerNote').value;

    // অর্ডার ডেটা
    let orderDetails = {
        name,
        address,
        phone,
        note,
        items: cart,
        total: document.getElementById('orderTotal').textContent
    };

    console.log('📦 অর্ডার ডেটা:', orderDetails);

    // সাকসেস দেখান
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('successModal').classList.add('active');

    // কার্ট খালি করুন
    cart = [];
    totalItems = 0;
    updateCart();
    updateCartUI();

    // ফর্ম রিসেট
    document.getElementById('orderForm').reset();
}

function closeSuccess() {
    document.getElementById('successModal').classList.remove('active');
    document.getElementById('cartSidebar').classList.remove('open');
}

// ===== ক্লিক করলে বন্ধ =====
document.getElementById('checkoutModal').addEventListener('click', function(e) {
    if (e.target === this) closeCheckout();
});

document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) closeSuccess();
});
