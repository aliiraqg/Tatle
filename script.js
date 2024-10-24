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
    if (usernameFromUrl) {
        localStorage.setItem('username', usernameFromUrl);
    }
}

// استرجاع userId واسم المستخدم من Local Storage
const userId = localStorage.getItem('userId');
const username = localStorage.getItem('username');

// التحقق من أن userId موجود
if (!userId) {
    alert("لم يتم العثور على معرف المستخدم. تأكد من فتح التطبيق عبر تليجرام.");
} else {
    // تعيين اسم المستخدم في العنصر
    document.getElementById('username').textContent = username || "أنت الأفضل";

    // استرجاع النقاط الحالية من الخادم
    async function fetchPoints() {
        try {
            const response = await fetch(`http://localhost:3000/getUserData?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                points = data.points || 0;  // استرجاع النقاط
                document.getElementById('points').textContent = points;
                energy = data.energy || energy;
                document.querySelector('.energy span').textContent = energy;
            } else {
                console.error('❌ حدث خطأ أثناء جلب النقاط:', response.statusText);
            }
        } catch (error) {
            console.error('❌ خطأ في استرجاع النقاط:', error);
        }
    }

    fetchPoints();

    // استرجاع آخر وقت كان المستخدم نشطًا فيه
    const lastEnergyUpdateTime = localStorage.getItem('lastEnergyUpdateTime') || Date.now();
    const currentTime = Date.now();

    // حساب الوقت المنقضي منذ آخر تحديث للطاقة
    const timeDifference = currentTime - lastEnergyUpdateTime;
    const energyToRecover = Math.floor(timeDifference / energyIncreaseInterval) * energyIncreaseAmount;
    energy = Math.min(energy + energyToRecover, maxEnergy);
    document.querySelector('.energy span').textContent = energy;

    // تحديث النقاط عند النقر على الشخصية
    document.getElementById('clickable-character').addEventListener('click', async function () {
        if (energy > 0) {
            points += 5; // إضافة النقاط
            energy--; // تقليل الطاقة
            document.getElementById('points').textContent = points;
            document.querySelector('.energy span').textContent = energy;

            try {
                // إرسال النقاط والطاقة إلى الخادم
                const response = await fetch('http://localhost:3000/web_app_data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: userId, points: points, energy: energy })
                });

                if (response.ok) {
                    console.log('✔️ تم إرسال البيانات إلى الخادم بنجاح:', { userId: userId, points: points, energy: energy });
                } else {
                    console.error('❌ حدث خطأ في استجابة الخادم:', response.statusText);
                }
            } catch (error) {
                console.error('❌ حدث خطأ أثناء إرسال البيانات إلى الخادم:', error);
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
