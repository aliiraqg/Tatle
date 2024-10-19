// دالة إرسال إشعار إلى Telegram bot
async function sendTelegramNotification(amount, method) {
    const userId = localStorage.getItem('userId');
    const botToken = '7891399266:AAEDdHQbEzH42ZAZqxzgrnSnGdU2Lr1L0BI'; // توكن البوت، احرص على حمايته
    const chatId = '7087626468'; // معرف الشات الخاص بك

    const message = `
        تم تقديم طلب سحب جديد:
        - معرف المستخدم: ${userId}
        - المبلغ: ${amount} نقاط
        - طريقة السحب: ${method}
    `;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
        const response = await fetch(telegramApiUrl);
        const data = await response.json();
        if (data.ok) {
            console.log('تم إرسال الإشعار إلى Telegram بنجاح.');
        } else {
            console.error('فشل في إرسال الإشعار إلى Telegram:', data);
        }
    } catch (error) {
        console.error('حدث خطأ أثناء إرسال الإشعار إلى Telegram:', error);
    }
}
