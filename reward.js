let coinAmount = parseInt(localStorage.getItem("coinAmount")) || 0;
let lastVisitTime = localStorage.getItem("lastVisitTime") || new Date().getTime();
let earnedPoints = 0;

// حساب الزمن منذ آخر زيارة
function checkTime() {
    let currentTime = new Date().getTime();
    let timeDifference = Math.floor((currentTime - lastVisitTime) / (10 * 1)); // الفرق بالدقائق

    // حساب النقاط بناءً على المدة الزمنية
    if (timeDifference >= 1000) {
        earnedPoints = timeDifference * 100; // 10 نقاط لكل دقيقة
        if (timeDifference > 180) { // 3 ساعات
            earnedPoints = 180 * 10; // الحد الأقصى 1800 نقطة
        }
        document.getElementById("earnedPoints").textContent = earnedPoints;
        document.getElementById("rewardModal").style.display = "block"; // عرض النافذة المنبثقة
    }
}

// المطالبة بالنقاط
document.getElementById("claimBtn").addEventListener("click", function() {
    coinAmount += earnedPoints;
    localStorage.setItem("coinAmount", coinAmount); // حفظ النقاط
    document.getElementById("rewardModal").style.display = "none";
    earnedPoints = 0;
    localStorage.setItem("lastVisitTime", new Date().getTime()); // تحديث وقت الزيارة
});

// إغلاق النافذة عند الضغط على "X"
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("rewardModal").style.display = "none";
    localStorage.setItem("lastVisitTime", new Date().getTime()); // تحديث وقت الزيارة
});

// التحقق من الزمن عند تحميل الصفحة
window.onload = function() {
    checkTime();
};
