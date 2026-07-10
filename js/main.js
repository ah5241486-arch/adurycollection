// হোয়াটসঅ্যাপে অর্ডার পাঠানোর ফাংশন
function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-address').value;
    const phone = document.getElementById('cust-phone').value;

    // তথ্য চেক করা
    if (!name || !addr || !phone) {
        alert("দয়া করে আপনার নাম, ঠিকানা এবং ফোন নম্বর সঠিকভাবে পূরণ করুন!");
        return;
    }

    // ডেলিভারি চার্জ হিসাব (প্রথম ২ পিস ১৩০ টাকা, এরপর প্রতি পিসে ১০ টাকা বাড়তি)
    let delCharge = 130;
    if (window.selectedQty > 2) {
        delCharge += (window.selectedQty - 2) * 10;
    }

    // মোট বিলের হিসাব
    const totalBill = (window.selectedProd.price * window.selectedQty) + delCharge;

    // মেসেজ ফরম্যাট
    const msg = `নতুন অর্ডার এসেছে!%0A%0A` +
                `নাম: ${name}%0A` +
                `ঠিকানা: ${addr}%0A` +
                `ফোন: ${phone}%0A` +
                `পণ্য: ${window.selectedProd.name}%0A` +
                `পরিমাণ: ${window.selectedQty} পিস%0A` +
                `ডেলিভারি চার্জ: ${delCharge} টাকা%0A` +
                `মোট বিল: ${totalBill} টাকা`;

    // হোয়াটসঅ্যাপ লিংক (আপনার নাম্বারসহ)
    window.location.href = `https://wa.me/8801969080416?text=${msg}`;
}
