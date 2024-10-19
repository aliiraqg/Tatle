let points = 0; // النقاط الافتراضية
let energy = 500; // الطاقة الافتراضية
const maxEnergy = 500; // الحد الأقصى للطاقة

// استرجاع userId من التخزين المحلي
const userId = localStorage.getItem('userId');

// إذا كان userId موجود، جلب النقاط من الخادم
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

// استدعاء الدالة عند تحميل الصفحة
window.onload = fetchPoints;

// عند النقر على الشخصية لزيادة النقاط
document.getElementById('clickable-character').addEventListener('click', async function () {
    if (energy > 0) {
        points += 5; // إضافة النقاط
        energy--; // تقليل الطاقة
        document.getElementById('points').textContent = points;

        try {
            const response = await fetch('http://localhost:3000/web_app_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, points: points })
            });
            console.log('تم إرسال البيانات إلى الخادم:', { userId: userId, points: points });
        } catch (error) {
            console.error('حدث خطأ أثناء إرسال البيانات إلى الخادم:', error);
        }
    } else {
        alert('لقد نفدت طاقتك! انتظر قليلًا لزيادة الطاقة.');
    }
});
