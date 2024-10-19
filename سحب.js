// جلب النقاط من الخادم عند تحميل الصفحة
window.onload = async function () {
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch(`http://localhost:3000/getUserPoints?userId=${userId}`);
        const data = await response.json();
        points = data.points || 0;
        document.getElementById('currentPoints').textContent = points;
    } catch (error) {
        console.error('خطأ في استرجاع النقاط:', error);
    }
};

// دالة لسحب الأرباح
async function submitWithdrawal() {
    const amount = parseInt(document.getElementById('withdrawAmount').value, 10);
    const method = document.getElementById('withdrawOption').value;

    if (amount > points) {
        alert('لا تملك نقاط كافية لإتمام هذه العملية.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                amount: amount,
                method: method
            })
        });
        const data = await response.json();

        if (data.status === 'success') {
            points -= amount;
            document.getElementById('currentPoints').textContent = points;
            alert(`تم سحب ${amount} نقاط.`);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('خطأ في إرسال طلب السحب:', error);
        alert('حدث خطأ أثناء معالجة طلب السحب.');
    }
}
