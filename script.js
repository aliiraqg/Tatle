// استعادة العملات المحفوظة من localStorage أو تعيينها إلى 0 إذا لم تكن موجودة
let coinAmount = parseInt(localStorage.getItem("coinAmount")) || 0;
document.getElementById("coinAmount").textContent = coinAmount.toLocaleString();

// تحديث عدد العملات عند الضغط على الصورة
document.getElementById("character").addEventListener("click", function() {
    let earnedCoins = 5; // 5 عملات لكل نقرة
    coinAmount += earnedCoins;
    document.getElementById("coinAmount").textContent = coinAmount.toLocaleString();
    document.getElementById("earnedCoins").textContent = earnedCoins;

    // حفظ العملات في localStorage
    localStorage.setItem("coinAmount", coinAmount);

    // إظهار النافذة المنبثقة
    document.getElementById("overlay").style.display = "flex"; 
});

// إغلاق النافذة المنبثقة
document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "none"; 
});

// إضافة التنقل إلى صفحة أخرى عند الضغط على المهام
document.getElementById("tasks").addEventListener("click", function() {
    window.location.href = "tasks.html"; // الانتقال إلى صفحة المهام
});
