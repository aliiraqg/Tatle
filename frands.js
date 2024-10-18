// رابط الويب الذي سيتم نسخه (مثال لرابط التليجرام)
const baseInviteUrl = "https://t.me/Ndjshshshdhdhfbot?start=";

// استرجاع userId من التطبيق أو قاعدة البيانات
const userId = "123456"; // هنا يجب أن يكون userId الخاص بالمستخدم الحالي

// نسخ رابط الدعوة إلى الحافظة
function copyInviteLink() {
    const inviteLink = baseInviteUrl + userId;

    // إنشاء عنصر مؤقت لنسخ الرابط إلى الحافظة
    const tempInput = document.createElement('input');
    tempInput.value = inviteLink;
    document.body.appendChild(tempInput);

    // تحديد الرابط ونسخه
    tempInput.select();
    document.execCommand("copy");

    // إزالة العنصر المؤقت بعد النسخ
    document.body.removeChild(tempInput);
}

// مشاركة رابط الدعوة مع تطبيق Telegram
function shareInviteLink() {
    const inviteLink = baseInviteUrl + userId;

    // استخدام واجهة المشاركة مع تطبيق Telegram
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=انضم إلى التطبيق باستخدام هذا الرابط وكسب نقاط!`;

    // فتح واجهة مشاركة رابط الدعوة
    window.open(telegramShareUrl, "_blank");
}

// وظيفة التنقل إلى صفحات أخرى
function navigateTo(page) {
    window.location.href = page;
}
