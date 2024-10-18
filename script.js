let points = 0; // النقاط الافتراضية

// استرجاع userId من URL الخاص بالويب تليجرام
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// تحديث النقاط عند النقر
document.getElementById('clickable-character').addEventListener('click', async function() {
    points += 5; // إضافة النقاط عند كل نقرة
    document.getElementById('points').textContent = points;

    // إرسال النقاط إلى الخادم المحلي لتحديثها في قاعدة البيانات
    try {
        const response = await fetch('http://localhost:3000/updatePoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, points: points }),
        });
        const data = await response.json();
        console.log('تم تحديث النقاط:', data);
    } catch (error) {
        console.error('حدث خطأ في تحديث النقاط:', error);
    }
});

// جلب النقاط من قاعدة البيانات عند تحميل الصفحة
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
