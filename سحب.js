// إعداد EmailJS
const serviceID = "service_rc4m8mj"; // معرف الخدمة الخاص بك
const templateID = "template_6b4cokc"; // معرف القالب الخاص بك
const publicKey = "atTX7kOCqC1bopqkE"; // المفتاح العام الخاص بك

let points = 500; // النقاط الخاصة بالمستخدم

// جلب عدد النقاط المتوفرة من التخزين المحلي أو الخادم
function loadPoints() {
    points = localStorage.getItem('points') || 500; // تعيين 500 نقاط افتراضية
    document.getElementById('points-info').textContent = `لديك ${points} نقاط`;
}

// تقديم طلب السحب
function submitWithdrawal() {
    const selectedOption = document.getElementById('withdrawOption').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const details = document.getElementById('withdrawDetails').value;
    const email = document.getElementById('emailAddress').value;

    if (!selectedOption) {
        alert('يرجى اختيار وسيلة السحب أولاً.');
        return;
    }

    if (!amount || !details || !email) {
        alert('يرجى إدخال جميع البيانات المطلوبة.');
        return;
    }

    if (points < amount) {
        alert('لا تملك نقاط كافية لسحب هذا المبلغ.');
        return;
    }

    // خصم النقاط
    points -= amount;
    localStorage.setItem('points', points);

    // إعداد بيانات القالب لإرسالها عبر EmailJS
    const templateParams = {
        amount: amount,
        selectedOption: selectedOption,
        details: details,
        email: email
    };

    // إرسال البيانات عبر EmailJS
    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            console.log('تم الإرسال بنجاح:', response.status, response.text);
            alert('تم إرسال طلب السحب بنجاح.');
        }, function(error) {
            console.log('فشل الإرسال:', error);
            alert('فشل في إرسال طلب السحب. الرجاء المحاولة مرة أخرى.');
        });
}

// تحميل النقاط عند فتح الصفحة
loadPoints();
