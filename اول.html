// النقاط الافتراضية والطاقة
let points = 0;
let energy = 500;
const maxEnergy = 500; // الحد الأقصى للطاقة
const energyIncreaseInterval = 5 * 1000; // زيادة الطاقة كل 5 ثوانٍ
const energyIncreaseAmount = 1; // كمية الطاقة التي تضاف كل 5 ثوانٍ

// استرجاع النقاط والطاقة من LocalStorage
if (localStorage.getItem('userPoints')) {
    points = parseInt(localStorage.getItem('userPoints'), 10);
}
if (localStorage.getItem('userEnergy')) {
    energy = parseInt(localStorage.getItem('userEnergy'), 10);
}

// تحديث عرض النقاط والطاقة في الصفحة
document.getElementById('points').textContent = points;
document.querySelector('.energy span').textContent = energy;

// إضافة نقاط عند النقر على الشخصية
document.getElementById('clickable-character').addEventListener('click', () => {
    if (energy > 0) {
        points += 5; // زيادة النقاط
        energy--; // تقليل الطاقة
        document.getElementById('points').textContent = points;
        document.querySelector('.energy span').textContent = energy;

        // حفظ النقاط والطاقة في LocalStorage
        localStorage.setItem('userPoints', points);
        localStorage.setItem('userEnergy', energy);
    } else {
        showCustomAlert('لقد نفذت طاقتك! انتظر قليلًا لزيادة الطاقة.');
    }
});

// زيادة الطاقة كل 5 ثوانٍ
setInterval(function () {
    if (energy < maxEnergy) {
        energy += energyIncreaseAmount;
        document.querySelector('.energy span').textContent = energy;
        localStorage.setItem('userEnergy', energy); // تحديث الطاقة في LocalStorage
    }
}, energyIncreaseInterval);

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

// دالة التنقل بين الصفحات
function navigateTo(page) {
    window.location.href = page;
}
