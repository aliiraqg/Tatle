let points = 0; // النقاط الافتراضية
let energy = 500; // الطاقة الافتراضية

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
    document.getElementById('username').textContent = usernameFromUrl || "  انت الافضل"; // عرض اسم المستخدم

    // تحديث النقاط والطاقة عند النقر على الشخصية
    document.getElementById('clickable-character').addEventListener('click', async function() {
        if (energy > 0) { // التحقق من وجود طاقة
            points += 5; // إضافة النقاط عند كل نقرة
            energy -= 1; // تقليل الطاقة عند كل نقرة
            document.getElementById('points').textContent = points;
            document.getElementById('energy').textContent = energy;

            // إرسال النقاط والطاقة إلى الخادم عبر WebAppData
            try {
                const response = await fetch('http://localhost:3000/web_app_data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: userId, points: points, energy: energy })
                });
                const data = await response.json();
                console.log('تم إرسال البيانات إلى الخادم:', { userId: userId, points: points, energy: energy });
            } catch (error) {
                console.error('حدث خطأ أثناء إرسال البيانات إلى الخادم:', error);
            }
        } else {
            alert("الطاقة غير كافية للقيام بالمزيد من الضغطات.");
        }
    });

    // عند تحميل الصفحة، تأكد من جلب النقاط الحالية والطاقة للمستخدم (إذا كانت متاحة)
    async function fetchPointsAndEnergy() {
        try {
            const response = await fetch(`http://localhost:3000/getUserPoints?userId=${userId}`);
            const data = await response.json();
            points = data.points || 0;  // تعيين النقاط المسترجعة أو 0 إذا لم تكن موجودة
            energy = data.energy || 500;  // تعيين الطاقة المسترجعة أو 500 إذا لم تكن موجودة
            document.getElementById('points').textContent = points;
            document.getElementById('energy').textContent = energy;
        } catch (error) {
            console.error('خطأ في استرجاع النقاط والطاقة:', error);
        }
    }

    // استدعاء دالة استرجاع النقاط والطاقة عند تحميل الصفحة
    fetchPointsAndEnergy();

    // استعادة الطاقة كل 5 ثواني
    setInterval(() => {
        if (energy < 500) {
            energy += 1; // زيادة الطاقة بمقدار 1 كل 5 ثواني
            document.getElementById('energy').textContent = energy;
        }
    }, 5000); // 5000 ملي ثانية = 5 ثواني
}

// دالة التنقل بين الصفحات
function navigateTo(page) {
    window.location.href = page;
}

// منع التكبير أو التصغير في المتصفح
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
