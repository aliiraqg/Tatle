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

            // هنا نتأكد من استدعاء دالة إرسال الإشعار
            sendTelegramNotification(amount, method);
        } else {
            alert('خطأ: ' + data.message); // عرض رسالة الخطأ التي تأتي من الخادم
        }
    } catch (error) {
        console.error('خطأ في إرسال طلب السحب:', error);
        alert('حدث خطأ أثناء معالجة طلب السحب. تفاصيل الخطأ في Console.');
    }
}

// دالة إرسال إشعار إلى Telegram bot
async function sendTelegramNotification(amount, method) {
    const userId = localStorage.getItem('userId');
    const botToken = '7891399266:AAEDdHQbEzH42ZAZqxzgrnSnGdU2Lr1L0BI'; // توكن البوت
    const chatId = '7087626468'; // معرف شات الخاص بك

    const message = `
        تم تقديم طلب سحب جديد:
        - معرف المستخدم: ${userId}
        - المبلغ: ${amount} نقاط
        - طريقة السحب: ${method}
    `;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
        console.log('إرسال الإشعار إلى Telegram...');
        const response = await fetch(telegramApiUrl);
        const data = await response.json();
        if (data.ok) {
            console.log('تم إرسال الإشعار إلى Telegram بنجاح.');
        } else {
            console.error('فشل في إرسال الإشعار إلى Telegram:', data);
            alert('فشل في إرسال الإشعار إلى Telegram. السبب: ' + data.description);
        }
    } catch (error) {
        console.error('حدث خطأ أثناء إرسال الإشعار إلى Telegram:', error);
        alert('حدث خطأ أثناء إرسال الإشعار إلى Telegram.');
    }
}
