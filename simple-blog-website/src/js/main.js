```javascript
function addScrollEffects() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach(element => observer.observe(element));
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

function filterPosts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const posts = document.querySelectorAll('#posts-container article');
    posts.forEach(post => {
        const title = post.querySelector('h2').innerText.toLowerCase();
        post.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
}

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
}

document.addEventListener('DOMContentLoaded', () => {
    addScrollEffects();

    const darkModeButton = document.createElement('button');
    darkModeButton.textContent = 'Toggle Dark Mode';
    darkModeButton.style.position = 'fixed';
    darkModeButton.style.bottom = '20px';
    darkModeButton.style.left = '20px';
    darkModeButton.style.padding = '10px';
    darkModeButton.style.backgroundColor = '#007acc';
    darkModeButton.style.color = '#ffffff';
    darkModeButton.style.border = 'none';
    darkModeButton.style.borderRadius = '5px';
    darkModeButton.style.cursor = 'pointer';
    document.body.appendChild(darkModeButton);

    darkModeButton.addEventListener('click', toggleDarkMode);

    // Load saved mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    lazyLoadImages();
});
```