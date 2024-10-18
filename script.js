let points = 0; // النقاط الافتراضية
let energy = 10; // تعيين الطاقة الافتراضية
const maxEnergy = 10; // الحد الأقصى للطاقة

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
        const energyIncrease = Math.floor(timeDifference / (5 * 1000)); // زيادة الطاقة كل 5 ثواني

        // حساب الطاقة الجديدة بناءً على الوقت المنقضي
        energy = Math.min(energy + energyIncrease, maxEnergy); // التأكد من عدم تجاوز الحد الأقصى للطاقة
        document.querySelector('.energy span').textContent = energy;
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
            showEnergyAlert(); // عرض التنبيه عند نفاذ الطاقة
        }
    });

    // زيادة الطاقة تلقائيًا كل 5 ثوانٍ
    setInterval(function() {
        if (energy < maxEnergy) {
            energy++;
            document.querySelector('.energy span').textContent = energy;
        }
    }, 5000);

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

// دالة عرض التنبيه المخصص لنفاذ الطاقة
function showEnergyAlert() {
    const alertBox = document.getElementById('energy-alert');
    alertBox.style.display = 'block';
    
    setTimeout(function() {
        alertBox.style.display = 'none';
    }, 3000); // التنبيه يظهر لمدة 3 ثوانٍ فقط
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

document.addEventListener('cut
