let points = 0; // النقاط الافتراضية

// استرجاع userId من URL الخاص بالويب تليجرام
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// تحديث النقاط عند النقر
document.getElementById('clickable-character').addEventListener('click', function() {
    points += 5; // إضافة النقاط عند كل نقرة
    document.getElementById('points').textContent = points;

    // إرسال النقاط إلى قاعدة البيانات عبر Telegram Web App
    Telegram.WebApp.sendData(JSON.stringify({ points: points }));  // إرسال النقاط للبوت
});

// جلب النقاط من قاعدة البيانات عند تحميل الصفحة
async function fetchPoints() {
    try {
        const response = await fetch(`/getUserPoints?userId=${userId}`);
        const data = await response.json();
        points = data.points || 0;
        document.getElementById('points').textContent = points;
    } catch (error) {
        console.error('خطأ في استرجاع النقاط:', error);
    }
}

// استدعاء دالة استرجاع النقاط عند تحميل الصفحة
fetchPoints();
