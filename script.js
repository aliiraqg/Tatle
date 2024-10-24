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

// التحقق من أن userId و username موجودان
if (!userId || !username) {
    // إذا لم يتم العثور على userId أو username، إظهار رسالة تنبيه
    alert("لم يتم العثور على معرف المستخدم أو اسم المستخدم. تأكد من فتح التطبيق عبر تليجرام.");
} else {
    // جلب بيانات المستخدم من قاعدة البيانات
    fetchUserData(userId);
}

// دالة لجلب بيانات المستخدم من قاعدة البيانات
async function fetchUserData(userId) {
    try {
        const response = await fetch(`http://localhost:3000/getUserData?userId=${userId}`);
        if (response.ok) {
            const data = await response.json();
            
            // تحديث النقاط والطاقة واسم المستخدم بناءً على البيانات المسترجعة
            document.getElementById('username').textContent = data.username || "أنت الأفضل";
            document.getElementById('points').textContent = data.points || 0;
            document.querySelector('.energy span').textContent = data.energy || 500;

            // حفظ النقاط والطاقة محليًا
            localStorage.setItem('points', data.points || 0);
            localStorage.setItem('energy', data.energy || 500);
        } else {
            console.error('❌ حدث خطأ أثناء جلب بيانات المستخدم:', response.statusText);
        }
    } catch (error) {
        console.error('❌ خطأ في استرجاع بيانات المستخدم:', error);
    }
}

// دالة لتحديث اسم المستخدم في العنصر
function updateUserName(username) {
    document.getElementById('username').textContent = username || "أنت الأفضل";
}

// دالة لإرسال وتحديث البيانات في قاعدة البيانات عند النقر على الشخصية
document.getElementById('clickable-character').addEventListener('click', async function () {
    if (energy > 0) {
        points += 5; // إضافة النقاط
        energy--; // تقليل الطاقة
        document.getElementById('points').textContent = points;
        document.querySelector('.energy span').textContent = energy;

        try {
            // إرسال البيانات إلى الخادم لتحديث قاعدة البيانات
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
        localStorage.setItem('lastEnergyUpdateTime', Date.now());
    } else {
        showCustomAlert('لقد نفذت طاقتك! انتظر قليلًا لزيادة الطاقة.');
    }
});

// دالة لإظهار تنبيه مخصص
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
