let points = 0; // النقاط الافتراضية

// استرجاع userId من URL الخاص بالويب تليجرام
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// تحديث النقاط عند النقر
document.getElementById('clickable-character').addEventListener('click', function() {
    points += 5; // إضافة النقاط عند كل نقرة
    document.getElementById('points').textContent = points;

    // إرسال النقاط إلى البوت عبر WebAppData
    try {
        // استخدام Telegram.WebApp.sendData لإرسال النقاط إلى البوت
        Telegram.WebApp.sendData(JSON.stringify({ points: points }));
        console.log('تم إرسال البيانات إلى البوت:', { points: points });
    } catch (error) {
        console.error('حدث خطأ أثناء إرسال البيانات إلى البوت:', error);
    }
});

// عند تحميل الصفحة، تأكد من جلب النقاط الحالية للمستخدم (إذا كانت متاحة)
async function fetchPoints() {
    try {
        const response = await fetch(`http://localhost:3000/getUserPoints?userId=${userId}`);
        const data = await response.json();
        points = data.points || 0;
        document.getElementById('points').textContent = points;
    } catch (error) {
        console.error('خطأ في استرجاع النقاط:', error);
    }
}

// استدعاء دالة استرجاع النقاط عند تحميل الصفحة
fetchPoints();
