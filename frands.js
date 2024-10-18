// رابط الويب الأساسي (يجب استبداله برابط البوت الخاص بك)
const baseInviteUrl = "https://t.me/Ndjshshshdhdhfbot?start=";

// استرجاع userId من URL أو قاعدة البيانات
let userId = null;

// جلب userId من URL (إذا كان متوفرًا)
const urlParams = new URLSearchParams(window.location.search);
const userIdFromUrl = urlParams.get('userId');

// إذا تم العثور على userId في URL، نستخدمه، وإلا يمكن جلبه من قاعدة البيانات أو Local Storage
if (userIdFromUrl) {
    userId = userIdFromUrl;
} else {
    // في حالة عدم وجود userId في URL، يمكن استخدام Local Storage أو جلبه من قاعدة البيانات
    userId = localStorage.getItem('userId') || "123456";  // إذا لم يكن موجودًا في Local Storage يتم استخدام userId افتراضي
}

// تخزين userId في Local Storage للاستخدام المستقبلي
localStorage.setItem('userId', userId);

// قائمة الأصدقاء المدعوين (هذه قائمة بيانات وهمية يمكن استبدالها ببيانات حقيقية من قاعدة البيانات)
const invitedFriends = [
    { name: "صادق سلام عبد", pointsPerHour: 30 },
    { name: "Um Rahaf", pointsPerHour: 50 }
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

// وظيفة التنقل بين الصفحات
function navigateTo(page) {
    window.location.href = `${page}?userId=${userId}`;
}
