// Function to load partials dynamically
function loadPartials() {
    fetch('../partials/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });

    fetch('../partials/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
        });

    fetch('../partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

// Scroll to top button
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

function updateNavbar() {
    fetch('http://localhost:3000/is-logged-in')
        .then(response => response.json())
        .then(data => {
            const navbar = document.getElementById('navbar');
            if (data.loggedIn) {
                const loginLink = navbar.querySelector('a[href="../pages/login.html"]');
                if (loginLink) {
                    loginLink.textContent = 'Logout';
                    loginLink.href = 'http://localhost:3000/logout';
                }
            }
        });
}

function addNewsTicker() {
    const ticker = document.createElement('div');
    ticker.id = 'news-ticker';
    ticker.style.backgroundColor = '#007acc';
    ticker.style.color = '#ffffff';
    ticker.style.padding = '10px';
    ticker.style.overflow = 'hidden';
    ticker.style.whiteSpace = 'nowrap';
    ticker.style.position = 'fixed';
    ticker.style.top = '0';
    ticker.style.width = '100%';
    ticker.style.zIndex = '1000';

    document.body.appendChild(ticker);

    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(posts => {
            ticker.textContent = posts.map(post => post.title).join(' | ');
        });
}

function filterPosts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();= document.querySelectorAll('.fade-in');
    const posts = document.querySelectorAll('#posts-container article');tersectionObserver((entries) => {
    posts.forEach(post => {Each(entry => {
        const title = post.querySelector('h2').innerText.toLowerCase();y.isIntersecting) {
        post.style.display = title.includes(searchTerm) ? 'block' : 'none';             entry.target.classList.add('visible');









});    addNewsTicker();    updateNavbar();    addScrollToTopButton();    loadPartials();document.addEventListener('DOMContentLoaded', () => {}    });            }
        });
    });

    elements.forEach(element => observer.observe(element));
}

function toggleDarkMode() {
    const body = document.body;ocalhost:3000/visitor-count')
    body.classList.toggle('dark-mode');esponse.json())
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));=> {
}oter = document.getElementById('footer');
orDiv = document.createElement('div');
document.addEventListener('DOMContentLoaded', () => {         visitorDiv.style.textAlign = 'center';


























});    }        document.body.classList.add('dark-mode');    if (localStorage.getItem('darkMode') === 'true') {    // Load saved mode    darkModeButton.addEventListener('click', toggleDarkMode);    document.body.appendChild(darkModeButton);    darkModeButton.style.cursor = 'pointer';    darkModeButton.style.borderRadius = '5px';    darkModeButton.style.border = 'none';    darkModeButton.style.color = '#ffffff';    darkModeButton.style.backgroundColor = '#35424a';    darkModeButton.style.padding = '10px';    darkModeButton.style.left = '20px';    darkModeButton.style.bottom = '20px';    darkModeButton.style.position = 'fixed';    darkModeButton.textContent = 'Toggle Dark Mode';    const darkModeButton = document.createElement('button');    addScrollEffects();    addNewsTicker();    updateNavbar();    addScrollToTopButton();    loadPartials();            visitorDiv.style.marginTop = '10px';
            visitorDiv.textContent = `Visitor Count: ${data.count}`;
            footer.appendChild(visitorDiv);
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

function loadPopularPosts() {
    fetch('http://localhost:3000/popular-posts')
        .then(response => response.json())
        .then(posts => {
            const container = document.getElementById('popular-posts-container');
            container.innerHTML = ''; // تفريغ الحاوية قبل الإضافة
            posts.forEach(post => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>Likes: ${post.likes} | Shares: ${post.shares}</p>
                `;
                container.appendChild(article);
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartials();
    addScrollToTopButton();
    updateNavbar();
    addNewsTicker();
    addScrollEffects();
    displayVisitorCount();
    lazyLoadImages();
    loadPopularPosts();
});