let selectedOption = ''; // لحفظ الوسيلة المختارة
let points = 0; // النقاط الخاصة بالمستخدم

// جلب عدد النقاط المتوفرة من التخزين المحلي أو الخادم
function loadPoints() {
    // جلب النقاط من LocalStorage
    points = localStorage.getItem('points') || 0;
    document.getElementById('points-info').textContent = `لديك ${points} نقاط`;
}

// اختيار وسيلة السحب
function selectOption(option) {
    selectedOption = option;
    alert(`تم اختيار ${option}`);
}

// تقديم طلب السحب
function submitWithdrawal() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const details = document.getElementById('withdrawDetails').value;

    if (!selectedOption) {
        alert('يرجى اختيار وسيلة السحب أولاً.');
        return;
    }

    if (!amount || !details) {
        alert('يرجى إدخال جميع البيانات المطلوبة.');
        return;
    }

    // التحقق من أن المستخدم لديه نقاط كافية
    if (points < amount) {
        alert('لا تملك نقاط كافية لسحب هذا المبلغ.');
        return;
    }

    // خصم النقاط
    points -= amount;
    localStorage.setItem('points', points); // تخزين النقاط الجديدة

    alert(`تم طلب سحب مبلغ ${amount} عبر ${selectedOption} باستخدام التفاصيل: ${details}`);
    document.getElementById('points-info').textContent = `لديك ${points} نقاط متبقية.`;
}

// تحميل النقاط عند فتح الصفحة
loadPoints();
