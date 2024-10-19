<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>لعبة عدن وربح</title>
</head>
<body>
    <div class="container">
        <h1>مرحبًا، <span id="username">أنت الأفضل</span>!</h1>
        <p>رصيد نقاطك: <span id="points">0</span></p>
        <p>طاقة: <span class="energy"><span id="energy">500</span> / 500</span></p>
        <button id="clickable-character">اضغط لزيادة النقاط</button>
    </div>

    <script>
        let points = 0; // النقاط الافتراضية
        let energy = 500; // الطاقة الافتراضية
        const maxEnergy = 500; // الحد الأقصى للطاقة
        const energyIncreaseInterval = 5 * 1000; // زيادة الطاقة كل 5 ثوانٍ
        const energyIncreaseAmount = 1; // كمية الطاقة التي تضاف كل 5 ثوانٍ

        // استرجاع userId و username من URL الخاص بالويب تليجرام أو من التخزين المحلي
        const urlParams = new URLSearchParams(window.location.search);
        const userIdFromUrl = urlParams.get('userId');
        const usernameFromUrl = urlParams.get('username');

        // إذا كان userId موجود في URL، نخزنه في Local Storage
        if (userIdFromUrl) {
            localStorage.setItem('userId', userIdFromUrl);
            localStorage.setItem('username', usernameFromUrl);
        }

        // استرجاع userId من Local Storage
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username') || "أنت الأفضل";

        // التحقق من أن userId موجود
        if (!userId) {
            alert("لم يتم العثور على معرف المستخدم. تأكد من فتح التطبيق عبر تليجرام.");
        } else {
            // تعيين اسم المستخدم في العنصر
            document.getElementById('username').textContent = username;

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
                document.getElementById('energy').textContent = energy;
            }

            // استرجاع النقاط الخاصة بالمستخدم من LocalStorage
            async function fetchPoints() {
                try {
                    const userPointsFromStorage = localStorage.getItem(`userPoints_${userId}`);

                    if (userPointsFromStorage) {
                        // عرض النقاط المخزنة الخاصة بالمستخدم الحالي
                        points = parseInt(userPointsFromStorage, 10);
                        document.getElementById('points').textContent = points;
                        console.log(`تم استرجاع النقاط من LocalStorage: ${points} للمستخدم: ${userId}`);
                    } else {
                        // إذا لم تكن النقاط مخزنة، نقوم بجلبها من الخادم
                        const response = await fetch(`http://localhost:3000/getUserPoints?userId=${userId}`);
                        const data = await response.json();
                        points = data.points || 0;  // استرجاع النقاط من الخادم
                        document.getElementById('points').textContent = points;

                        // تخزين النقاط في LocalStorage للاستخدام لاحقًا
                        localStorage.setItem(`userPoints_${userId}`, points);
                        console.log(`تم جلب النقاط من الخادم: ${points} للمستخدم: ${userId}`);
                    }
                } catch (error) {
                    console.error('خطأ في استرجاع النقاط:', error);
                }
            }

            fetchPoints();

            // تحديث النقاط عند النقر على الشخصية
            document.getElementById('clickable-character').addEventListener('click', async function () {
                if (energy > 0) {
                    points += 5; // إضافة النقاط
                    energy--; // تقليل الطاقة
                    document.getElementById('points').textContent = points;
                    document.getElementById('energy').textContent = energy;

                    // تخزين النقاط في LocalStorage مع ربطها بـ userId
                    localStorage.setItem(`userPoints_${userId}`, points);
                    console.log(`تم تخزين النقاط: ${points} للمستخدم: ${userId}`);

                    try {
                        // إرسال النقاط إلى الخادم
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
                    document.getElementById('energy').textContent = energy;
                    localStorage.setItem('lastEnergyUpdateTime', Date.now()); // تحديث وقت آخر زيادة للطاقة
                }
            }, energyIncreaseInterval);
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

    </script>
</body>
</html>
