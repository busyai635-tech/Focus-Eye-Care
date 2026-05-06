// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
    smoothWheel: true,
    syncTouch: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize Icons
lucide.createIcons();

// Navbar Interaction
const navbar = document.getElementById('navbar');
const navIcons = [document.getElementById('nav-logo-icon'), document.querySelector('#mobile-menu-toggle i')];
const navText = document.getElementById('nav-logo-text');
const navLinks = document.querySelectorAll('.nav-link');

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    if (window.scrollY > 50) {
        navbar.classList.add('glass-nav', 'py-3');
        navbar.classList.remove('py-5');
        navIcons.forEach(icon => {
            icon.classList.add('text-clinic-secondary');
            icon.classList.remove('text-white');
        });
        navText.classList.add('text-clinic-primary');
        navText.classList.remove('text-white');
        navLinks.forEach(link => {
            link.classList.add('text-gray-600', 'hover:text-clinic-secondary');
            link.classList.remove('text-white/80', 'hover:text-white');
        });
    } else {
        navbar.classList.remove('glass-nav', 'py-3');
        navbar.classList.add('py-5');
        navIcons.forEach(icon => {
            icon.classList.remove('text-clinic-secondary');
            icon.classList.add('text-white');
        });
        navText.classList.remove('text-clinic-primary');
        navText.classList.add('text-white');
        navLinks.forEach(link => {
            link.classList.remove('text-gray-600', 'hover:text-clinic-secondary');
            link.classList.add('text-white/80', 'hover:text-white');
        });
    }
});

// Mobile Menu
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
    const isClosed = mobileMenu.classList.contains('opacity-0');
    if (isClosed) {
        mobileMenu.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
    } else {
        mobileMenu.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
    }
}

mobileToggle.addEventListener('click', toggleMobileMenu);

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
    });
});

// Reveal Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Parallax Hero
window.addEventListener('scroll', () => {
    const parallax = document.getElementById('hero-bg');
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px) scale(1.1)';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'), {
            offset: -80 // Offset for fixed navbar
        });
    });
});
