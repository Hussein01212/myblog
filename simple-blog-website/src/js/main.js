```javascript
function addScrollEffects() {
    const articles = document.querySelectorAll('article');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    articles.forEach(article => observer.observe(article));
}

function addScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerText = '↑';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px 15px';
    button.style.backgroundColor = '#007acc';
    button.style.color = '#ffffff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.display = 'none';
    document.body.appendChild(button);

    // Show button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addScrollEffects();
    addScrollToTopButton();
});
```