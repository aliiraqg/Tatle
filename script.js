const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
let points = 0;

function savePointsToServer(points) {
    const data = { userId, points };
    
    fetch('tatle-alis-projects-e389fa47.vercel.app', {  // استبدل هذا بـ URL الخادم
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('تم حفظ النقاط:', result);
    })
    .catch(error => {
        console.error('خطأ أثناء حفظ النقاط:', error);
    });
}

document.getElementById('clickable-character').addEventListener('click', () => {
    points += 5;  // زيادة النقاط بمقدار 5 لكل ضغطة
    document.getElementById('points').textContent = points;
    savePointsToServer(points);  // حفظ النقاط عند الضغط
});
