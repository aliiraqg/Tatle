let points = 0; // النقاط الافتراضية
let energy = 10; // تعيين الطاقة الافتراضية
const maxEnergy = 10; // الحد الأقصى للطاقة
const energyIncreaseInterval = 5 * 1000; // زيادة الطاقة كل 5 ثواني

// استرجاع userId من URL الخاص بالويب تليجرام أو من التخزين المحلي
const urlParams = new URLSearchParams(window.location.search);
const userIdFromUrl = urlParams.get('userId');
const usernameFromUrl = urlParams.get('username'); // استرجاع اسم المستخدم من URL

// إذا كان userId موجود في URL، نخزنه في Local Storage
if (userIdFromUrl) {
    localStorage.setItem('userId', userIdFromUrl);
}

// استرجاع userId من Local Storage
const userId = localStorage.getItem('userId');

// التحقق من أن userId موجود
if (!userId) {
    alert("لم يتم العثور على معرف المستخدم. تأكد من فتح التطبيق عبر تليجرام.");
} else {
    // تعيين اسم المستخدم في العنصر
    document.getElementById('username').textContent = usernameFromUrl || "أنت الأفضل"; // عرض اسم المستخدم

    // استرجاع الوقت الأخير الذي كان المستخدم فيه نشطًا
    const lastActivityTime = localStorage.getItem('lastActivityTime');
    if (lastActivityTime) {
        const currentTime = Date.now();
        const timeDifference = currentTime - lastActivityTime; // الفرق بالمللي ثانية
        const energyIncrease = Math.floor(timeDifference / energyIncreaseInterval); // زيادة الطاقة بناءً على الوقت المنقضي

        // حساب الطاقة الجديدة بناءً على الوقت المنقضي وزيادتها تدريجيًا
        energy = Math.min(energy + energyIncrease, maxEnergy); // التأكد من عدم تجاوز الحد الأقصى للطاقة
        document.querySelector('.energy span').textContent = energy;

        // تخزين الوقت الحالي كآخر نشاط بعد الحساب
        const remainderTime = timeDifference % energyIncreaseInterval; // الوقت المتبقي من الزيادة الكاملة
        localStorage.setItem('lastActivityTime', currentTime - remainderTime);
    }

    // تحديث النقاط عند النقر على الشخصية
    document.getElementById('clickable-character').addEventListener('click', async function() {
        if (energy > 0) { // التحقق من وجود طاقة
            points += 5; // إضافة النقاط عند كل نقرة
            energy--; // تقليل الطاقة
            document.getElementById('points').textContent = points;
            document.querySelector('.energy span').textContent = energy;

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

            // تخزين وقت آخر تفاعل في Local Storage
            localStorage.setItem('lastActivityTime', Date.now());
        } else {
            // إظهار نافذة مخصصة بدلاً من التنبيه التقليدي
            showCustomAlert('لقد نفذت طاقتك! انتظر قليلًا لزيادة الطاقة.');
        }
    });

    // زيادة الطاقة تلقائيًا كل 5 ثوانٍ
    setInterval(function() {
        if (energy < maxEnergy) {
            energy++;
            document.querySelector('.energy span').textContent = energy;
            // تخزين وقت آخر تفاعل
            localStorage.setItem('lastActivityTime', Date.now());
        }
    }, energyIncreaseInterval);

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

// دالة التنقل بين الصفحات
function navigateTo(page) {
    window.location.href = page;
}

// دالة إظهار تنبيه مخصص
function showCustomAlert(message) {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('custom-alert');
    alertContainer.textContent = message;

    document.body.appendChild(alertContainer);

    // إخفاء التنبيه بعد 3 ثواني
    setTimeout(() => {
        document.body.removeChild(alertContainer);
    }, 3000);
}

// منع تكبير الصفحة باللمس على الأجهزة المحمولة
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
});
document.addEventListener('gestureend', function (e) {
    e.preventDefault();
});

// منع النسخ واللصق والقص
document.addEventListener('copy', function(e) {
    e.preventDefault(); // منع النسخ
});

document.addEventListener('cut', function(e) {
    e.preventDefault(); // منع القص
});

document.addEventListener('paste', function(e) {
    e.preventDefault(); // منع اللصق
});
