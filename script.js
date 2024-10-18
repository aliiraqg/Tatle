document.getElementById('clickable-character').addEventListener('click', async function () {
    if (energy > 0) {
        points += 5; // إضافة النقاط
        energy--; // تقليل الطاقة
        document.getElementById('points').textContent = points;
        document.querySelector('.energy span').textContent = energy;

        // حفظ النقاط في التخزين المحلي
        localStorage.setItem('points', points);

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
    } else {
        showCustomAlert('لقد نفذت طاقتك! انتظر قليلًا لزيادة الطاقة.');
    }
});
