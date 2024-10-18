// رابط الويب الذي سيتم نسخه (مثال لرابط التليجرام)
const baseInviteUrl = "https://t.me/your_bot?start=";

// استرجاع userId (قد تحتاج إلى جلب userId من قاعدة البيانات أو من URL)
const userId = "123456"; // يجب أن يتم تحديث هذا باستخدام userId الحقيقي للمستخدم

// قائمة الأصدقاء المدعوين (مثال على بيانات وهمية، سيتم استبدالها ببيانات حقيقية من قاعدة البيانات)
const invitedFriends = [
    { name: "صادق سلام عبد", pointsPerHour: 30 },
    { name: "Um Rahaf", pointsPerHour: 50 }
    // يمكن أن تكون القائمة فارغة إذا لم يتم دعوة أي أصدقاء
];

// نسخ رابط الدعوة
function copyInviteLink() {
    const inviteLink = baseInviteUrl + userId;
    const inviteInput = document.getElementById('invite-link');
    
    // وضع الرابط في الحقل المخفي
    inviteInput.value = inviteLink;
    inviteInput.style.opacity = 1;
    
    // تحديد الرابط ونسخه
    inviteInput.select();
    inviteInput.setSelectionRange(0, 99999); // لأجهزة الموبايل
    
    // نسخ الرابط إلى الحافظة
    document.execCommand("copy");
    
    // إخفاء الحقل بعد النسخ
    inviteInput.style.opacity = 0;
    
    // عرض رسالة تأكيد
    alert("تم نسخ رابط الدعوة: " + inviteLink);
}

// وظيفة لعرض الأصدقاء المدعوين
function displayInvitedFriends() {
    const friendsListElement = document.getElementById('friends-list');
    const noFriendsMessage = document.getElementById('no-friends-message');

    if (invitedFriends.length > 0) {
        // إخفاء رسالة "لم تقم بدعوة أي أصدقاء" إذا كان هناك أصدقاء
        noFriendsMessage.style.display = "none";

        invitedFriends.forEach(friend => {
            const friendItem = document.createElement('div');
            friendItem.classList.add('friend-item');

            friendItem.innerHTML = `
                <div class="friend-name">${friend.name}</div>
                <div class="friend-reward">${friend.pointsPerHour}+ نقطة/الساعة</div>
            `;
            friendsListElement.appendChild(friendItem);
        });
    } else {
        // إذا لم يكن هناك أصدقاء، إظهار رسالة "لم تقم بدعوة أي أصدقاء"
        noFriendsMessage.style.display = "block";
    }
}

// استدعاء دالة عرض الأصدقاء عند تحميل الصفحة
displayInvitedFriends();

// وظيفة التنقل
function navigateTo(page) {
    window.location.href = page;
}
