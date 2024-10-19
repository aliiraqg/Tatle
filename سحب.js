// استرجاع النقاط من LocalStorage وعرضها
let points = localStorage.getItem('userPoints') || 0;
points = parseInt(points, 10);

// تحديث عرض النقاط في الصفحة
document.getElementById('currentPoints').textContent = points;

// دالة لسحب الأرباح
function submitWithdrawal() {
    const amount = parseInt(document.getElementById('withdrawAmount').value, 10);
    const details = document.getElementById('withdrawDetails').value;
    const email = document.getElementById('emailAddress').value;
    const method = document.getElementById('withdrawOption').value;

    // التحقق من أن جميع الحقول مملوءة
    if (!amount || !details || !email || !method) {
        alert('يرجى ملء جميع الحقول المطلوبة.');
        return;
    }

    // التحقق من أن المستخدم يملك نقاط كافية
    if (amount > points) {
        alert('لا تملك نقاط كافية لإتمام هذه العملية.');
        return;
    }

    // خصم المبلغ من النقاط
    points -= amount;
    localStorage.setItem('userPoints', points);

    // تحديث عرض الرصيد الجديد في الصفحة
    document.getElementById('currentPoints').textContent = points;

    // إرسال بيانات السحب إلى الخادم
    try {
        fetch('http://localhost:3000/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                amount: amount,
                method: method,
                details: details,
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('تم إرسال طلب السحب:', data);
            alert(`تم تقديم طلب السحب بنجاح بمبلغ ${amount} نقاط.`);
        })
        .catch(error => {
            console.error('حدث خطأ أثناء إرسال طلب السحب:', error);
            alert('حدث خطأ أثناء إرسال طلب السحب.');
        });
    } catch (error) {
        console.error('حدث خطأ أثناء معالجة طلب السحب:', error);
        alert('حدث خطأ أثناء معالجة طلب السحب.');
    }
}
