// رابط الويب الذي سيتم نسخه (مثال لرابط التليجرام)
const baseInviteUrl = "https://t.me/your_bot?start=";

// استرجاع userId (قد تحتاج إلى جلب userId من قاعدة البيانات أو من URL)
const userId = "123456"; // يجب أن يتم تحديث هذا باستخدام userId الحقيقي للمستخدم

// نسخ رابط الدعوة إلى الحافظة
function copyInviteLink() {
    const inviteLink = baseInviteUrl + userId;

    // إنشاء عنصر مؤقت لنسخ الرابط إلى الحافظة
    const tempInput = document.createElement('input');
    tempInput.value = inviteLink;
    document.body.appendChild(tempInput);

    // تحديد الرابط ونسخه
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // لأجهزة الموبايل
    document.execCommand("copy");

    // إزالة العنصر المؤقت بعد النسخ
    document.body.removeChild(tempInput);

    // عرض رسالة تأكيد
    alert("تم نسخ رابط الدعوة: " + inviteLink);
}

// مشاركة رابط الدعوة مع تطبيق Telegram
function shareInviteLink() {
    const inviteLink = baseInviteUrl + userId;

    // استخدام واجهة المشاركة في المتصفح أو تطبيق Telegram
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=انضم إلى التطبيق باستخدام هذا الرابط وكسب نقاط!`;

    // فتح واجهة مشاركة رابط الدعوة
    window.open(telegramShareUrl, "_blank");
}
