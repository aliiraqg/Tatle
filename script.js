let points = 0; // النقاط الافتراضية
let energy = 500; // الطاقة الافتراضية
const maxEnergy = 500; // الحد الأقصى للطاقة
const energyIncreaseInterval = 5 * 1000; // زيادة الطاقة كل 5 ثوانٍ
const energyIncreaseAmount = 1; // كمية الطاقة التي تضاف كل 5 ثوانٍ

// استرجاع userId من URL الخاص بالويب تليجرام أو من التخزين المحلي
const urlParams = new URLSearchParams(window.location.search);
const userIdFromUrl = urlParams.get('userId');
const usernameFromUrl = urlParams.get('username');

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
    document.getElementById('username').textContent = usernameFromUrl || "أنت الأفضل";

    // استرجاع آخر وقت كان المستخدم نشطًا فيه
    const lastActivityTime = localStorage.getItem('lastActivityTime');
    const lastEnergyUpdateTime = localStorage.getItem('lastEnergyUpdateTime') || Date.now();
    const currentTime = Date.now();

    // حساب الوقت المنقضي منذ آخر نشاط
    if (lastActivityTime) {
        const timeDifference = currentTime - lastEnergyUpdateTime;
        const energyToRecover = Math.floor(timeDifference / energyIncreaseInterval) * energyIncreaseAmount;

        // استعادة الطاقة بناءً على الوقت المنقضي
        energy = Math.min(energy + energyToRecover, maxEnergy);
        document.querySelector('.energy span').textContent = energy;
    }

    // تحديث النقاط عند النقر على الشخصية
    document.getElementById('clickable-character').addEventListener('click', async function () {
        if (energy > 0) {
            points += 5; // إضافة النقاط
            energy--; // تقليل الطاقة
            document.getElementById('points').textContent = points;
            document.querySelector('.energy span').textContent = energy;

            try {
                console.log('إرسال النقاط إلى الخادم...');

                // تعديل هنا للتحقق من الاتصال بالخادم
                const response = await fetch('https://example.com/web_app_data', {  // تأكد من تعديل الرابط هنا
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: userId, points: points })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('تم إرسال البيانات إلى الخادم بنجاح:', { userId: userId, points: points });
                } else {
                    console.error('حدث خطأ في الاتصال بالخادم:', response.statusText);
                }
            } catch (error) {
                console.error('حدث خطأ أثناء إرسال البيانات إلى الخادم:', error);
            }

            // تحديث آخر وقت نشاط
            localStorage.setItem('lastActivityTime', Date.now());
            localStorage.setItem('lastEnergyUpdateTime', Date.now()); // تحديث وقت آخر تحديث للطاقة
        } else {
            showCustomAlert('لقد نفذت طاقتك! انتظر قليلًا لزيادة الطاقة.');
        }
    });

    // زيادة الطاقة كل 5 ثوانٍ
    setInterval(function () {
        if (energy < maxEnergy) {
            energy++;
            document.querySelector('.energy span').textContent = energy;
            localStorage.setItem('lastEnergyUpdateTime', Date.now()); // تحديث وقت آخر زيادة للطاقة
        }
    }, energyIncreaseInterval);

    // عند تحميل الصفحة، تأكد من جلب النقاط الحالية
    async function fetchPoints() {
        try {
            console.log('جلب النقاط الحالية من الخادم...');
            const response = await fetch(`https://example.com/getUserPoints?userId=${userId}`); // تأكد من تعديل الرابط هنا

            if (response.ok) {
                const data = await response.json();
                points = data.points || 0;  // استرجاع النقاط
                document.getElementById('points').textContent = points;
                console.log('تم جلب النقاط بنجاح:', points);
            } else {
                console.error('حدث خطأ في الاتصال بالخادم:', response.statusText);
            }
        } catch (error) {
            console.error('خطأ في استرجاع النقاط:', error);
        }
    }

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

    setTimeout(() => {
        document.body.removeChild(alertContainer);
    }, 3000);
}

// منع تكبير الصفحة
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
document.addEventListener('copy', function (e) {
    e.preventDefault();
});
document.addEventListener('cut', function (e) {
    e.preventDefault();
});
document.addEventListener('paste', function (e) {
    e.preventDefault();
});
