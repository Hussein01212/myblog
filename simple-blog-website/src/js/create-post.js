document.getElementById('createPostForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // إظهار مؤشر التحميل
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block';

    try {
        // إرسال بيانات المقال إلى الخادم
        const response = await fetch('http://localhost:3000/create-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });

        const data = await response.json();
        if (data.success) {
            showToast('Post published successfully!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000); // الانتظار 3 ثوانٍ قبل إعادة التوجيه
        } else {
            alert('Failed to publish post.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    } finally {
        // إخفاء مؤشر التحميل
        loadingIndicator.style.display = 'none';
    }
});

// وظيفة لإظهار الإشعار
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}
