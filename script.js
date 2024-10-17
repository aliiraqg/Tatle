let points = 462329;

document.getElementById('clickable-character').addEventListener('click', function() {
    points += 1;
    document.getElementById('points').textContent = points.toLocaleString();

    // إضافة أنميشن عند الضغط
    this.classList.add('animated');
    setTimeout(() => {
        this.classList.remove('animated');
    }, 200); // مدة الأنميشن 200ms
});
