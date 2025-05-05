// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animasi navbar saat scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = '#1a1a1a';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.backgroundColor = '#333';
        navbar.style.boxShadow = 'none';
    }
});

// Animasi kemunculan elemen saat scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.project-card, .about-content, .contact-form').forEach((el) => {
    observer.observe(el);
});

// Form validation dan submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        showNotification('Mohon isi semua field!', 'error');
        return;
    }
    
    // Simulasi pengiriman form
    showNotification('Pesan terkirim! Terima kasih.', 'success');
    this.reset();
});

// Sistem notifikasi
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Typing effect untuk hero section
const heroText = document.querySelector('.hero-content h1');
const text = heroText.textContent;
heroText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (projectFilters[category](project)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}
