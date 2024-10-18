let points = 0; // النقاط الافتراضية

// دالة التنقل بين الصفحات مع تمرير userId
function navigateTo(page) {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    
    if (userId) {
        // الانتقال إلى الصفحة مع إرفاق userId في الرابط
        window.location.href = `${page}?userId=${userId}`;
    } else {
        alert("لم يتم العثور على معرف المستخدم. تأكد من فتح التطبيق عبر تليجرام.");
    }
}

// استرجاع userId من URL الخاص بالويب تليجرام
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// التحقق من أن userId موجود
if (!userId) {
    alert("لم يتم العثور على معرف المستخدم. تأكد من فتح التطبيق عبر تليجرام.");
} else {
    // تحديث النقاط عند النقر على الشخصية
    document.getElementById('clickable-character').addEventListener('click', async function() {
        points += 5; // إضافة النقاط عند كل نقرة
        document.getElementById('points').textContent = points;

        // إرسال النقاط إلى الخادم عبر WebAppData
        try {
            const response = await fetch('http://localhost:3000/web_app_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, points: points })
            });
            const data = await response.json();
            console.log('تم إرسال البيانات إلى الخادم:', { userId: userId, points: points });
        } catch (error) {
            console.error('حدث خطأ أثناء إرسال البيانات إلى الخادم:', error);
        }
    });

    // عند تحميل الصفحة، تأكد من جلب النقاط الحالية للمستخدم (إذا كانت متاحة)
    async function fetchPoints() {
        try {
            const response = await fetch(`http://localhost:3000/getUserPoints?userId=${userId}`);
            const data = await response.json();
            points = data.points || 0;  // تعيين النقاط المسترجعة أو 0 إذا لم تكن موجودة
            document.getElementById('points').textContent = points;
        } catch (error) {
            console.error('خطأ في استرجاع النقاط:', error);
        }
    }

    // استدعاء دالة استرجاع النقاط عند تحميل الصفحة
    fetchPoints();
}
