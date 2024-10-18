let points = 0; // النقاط الافتراضية

// التأكد من وجود Telegram WebApp وتهيئته
if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
    // تهيئة Telegram WebApp
    Telegram.WebApp.ready();

    // استرجاع بيانات المستخدم من Telegram WebApp
    const initData = Telegram.WebApp.initData;
    const initDataUnsafe = Telegram.WebApp.initDataUnsafe;

    // التحقق من أن بيانات المستخدم موجودة
    if (initData && initDataUnsafe && initDataUnsafe.user) {
        const userId = initDataUnsafe.user.id; // معرف المستخدم من Telegram
        const username = initDataUnsafe.user.username || initDataUnsafe.user.first_name || 'اسم المستخدم الافتراضي'; // اسم المستخدم أو الاسم الأول

        // تعيين اسم المستخدم في الصفحة
        document.getElementById('username').textContent = username;

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
    } else {
        alert('حدث خطأ في استرجاع بيانات المستخدم من تليجرام.');
    }
} else {
    console.error('Telegram WebApp غير متاح.');
}

// دالة التنقل بين الصفحات
function navigateTo(page) {
    window.location.href = page;
}
