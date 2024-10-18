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

// إضافة مستمعي الأحداث للأقسام السفلية
document.querySelector('.nav-button-home').addEventListener('click', function() {
    navigateTo('index.html');  // الانتقال إلى الصفحة الرئيسية
});

document.querySelector('.nav-button-earnings').addEventListener('click', function() {
    navigateTo('earnings.html');  // الانتقال إلى صفحة الأرباح
});

document.querySelector('.nav-button-friends').addEventListener('click', function() {
    navigateTo('friends.html');  // الانتقال إلى صفحة الأصدقاء
});

document.querySelector('.nav-button-1win').addEventListener('click', function() {
    navigateTo('1win.html');  // الانتقال إلى صفحة 1win
});
