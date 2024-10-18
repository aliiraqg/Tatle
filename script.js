// دالة التنقل بين الصفحات
function navigateTo(page) {
    window.location.href = page;
}

// إضافة حدث عند تحميل الصفحة لجلب النقاط الحالية
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
        try {
            const response = await fetch(`http://localhost:3000/getUserPoints?userId=${userId}`);
            const data = await response.json();
            const points = data.points || 0;  // استرجاع النقاط أو 0 إذا لم يكن هناك نقاط
            document.getElementById('points').textContent = points;
        } catch (error) {
            console.error('حدث خطأ أثناء جلب النقاط:', error);
        }
    } else {
        console.error("لم يتم العثور على معرف المستخدم.");
    }
};

// إضافة نقاط عند النقر على الشخصية
document.getElementById('clickable-character').addEventListener('click', async function () {
    let points = parseInt(document.getElementById('points').textContent);
    points += 5;  // إضافة 5 نقاط عند كل نقرة
    document.getElementById('points').textContent = points;

    // إرسال النقاط المحدثة إلى الخادم
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
        try {
            const response = await fetch('http://localhost:3000/web_app_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, points: points })
            });
            const data = await response.json();
            console.log('تم إرسال النقاط المحدثة إلى الخادم:', data);
        } catch (error) {
            console.error('حدث خطأ أثناء إرسال النقاط إلى الخادم:', error);
        }
    } else {
        console.error('لم يتم العثور على معرف المستخدم لإرسال النقاط.');
    }
});
