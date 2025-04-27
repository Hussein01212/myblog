document.getElementById('adsForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const adContent = document.getElementById('adContent').value;

    const response = await fetch('http://localhost:3000/manage-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adContent }),
    });

    const data = await response.json();
    if (data.success) {
        alert('Ad saved successfully!');
    } else {
        alert('Failed to save ad.');
    }
});

document.getElementById('articleForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('articleTitle').value;
    const content = document.getElementById('articleContent').value;

    const response = await fetch('http://localhost:3000/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    if (data.success) {
        alert('Article published successfully!');
    } else {
        alert('Failed to publish article.');
    }
});
