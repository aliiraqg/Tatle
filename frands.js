let points = 1000;
let friends = [];

function copyInviteLink() {
    const inviteLink = `https://t.me/your_bot?start=${encodeURIComponent('inviteLink')}`;
    navigator.clipboard.writeText(inviteLink);
    alert("تم نسخ رابط الدعوة");
}

// دالة المطالبة بالنقاط
function claimPoints() {
    if (points > 0) {
        alert(`لقد ربحت ${points} نقطة!`);
        points = 0;
        document.getElementById('points-available').textContent = 'لقد ربحت جميع النقاط';
    } else {
        alert("لا توجد نقاط للمطالبة الآن.");
    }
}

// دالة لإضافة أصدقاء
function addFriend(name) {
    friends.push(name);
    updateFriendsList();
}

// تحديث قائمة الأصدقاء
function updateFriendsList() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';
    
    if (friends.length === 0) {
        friendsList.innerHTML = '<p>لم يتم دعوة أي أصدقاء حتى الآن</p>';
    } else {
        friends.forEach((friend, index) => {
            const friendItem = document.createElement('div');
            friendItem.textContent = `${index + 1}. ${friend}`;
            friendsList.appendChild(friendItem);
        });
    }

    document.getElementById('friends-count').textContent = friends.length;
}

function navigateTo(page) {
    window.location.href = page;
}
