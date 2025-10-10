document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.getElementById('hamburger-icon');
    const nav = document.querySelector('.main-nav');
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('is-active');
        const icon = hamburger.querySelector('i');
        if (nav.classList.contains('is-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // --- Smooth scrolling & close mobile menu on link click ---
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (nav.classList.contains('is-active')) {
                nav.classList.remove('is-active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Intersection Observer for scroll animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el) => observer.observe(el));

    // --- NEW: Parallax effect for about image ---
    const aboutImage = document.querySelector('.about-image img');
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) { // Only apply on desktop
            const scrollPosition = window.pageYOffset;
            // The '0.1' value controls the speed of the parallax effect.
            // A smaller value means a slower, more noticeable effect.
            aboutImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });

    // --- Particles.js for animated background ---
    if (window.innerWidth > 768) {
        particlesJS("particles-js", {
            "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true }, "size": { "value": 2, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } } },
            "retina_detect": true
        });
    }
});
