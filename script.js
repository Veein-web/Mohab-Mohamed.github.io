/*
=================================================================
|   INTERACTIVE SCRIPT - VIOLET & BLACK THEME                   |
|   Version: 6.0 (Color & Cursor Overhaul)                      |
=================================================================
*/

document.addEventListener('DOMContentLoaded', function() {
    initializeCustomCursor();
    initializeMobileNavigation();
    initializeScrollAnimations();
    initializeParticleBackground();
    console.log("Portfolio script v6.0 initialized successfully.");
});

/**
 * MODULE: CUSTOM CURSOR (NEW TRIANGLE DESIGN)
 */
function initializeCustomCursor() {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    
    if (!cursorDot || !cursorOutline) {
        console.error("Custom cursor elements not found.");
        return;
    }

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;

        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        // The triangle's rotation is now handled by CSS animation.
        // We only update its position.
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    const interactiveElements = document.querySelectorAll('a, button, .skill-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            // NEW INTERACTION: Hide cursor and apply glow to the element
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
            el.style.boxShadow = '0 0 25px var(--primary-glow)';
        });
        el.addEventListener('mouseleave', () => {
            // Restore cursor and remove glow
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            el.style.boxShadow = ''; // Reset box-shadow
        });
    });

    document.body.addEventListener('mouseenter', () => document.body.classList.add('cursor-visible'));
    document.body.addEventListener('mouseleave', () => document.body.classList.remove('cursor-visible'));
}

/**
 * MODULE: MOBILE NAVIGATION
 */
function initializeMobileNavigation() {
    const hamburger = document.getElementById('hamburger-icon');
    const nav = document.querySelector('.main-nav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('is-active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

/**
 * MODULE: SCROLL-BASED ANIMATIONS
 */
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/**
 * MODULE: PARTICLE BACKGROUND (VIOLET THEME)
 */
function initializeParticleBackground() {
    if (window.innerWidth > 768 && typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                // NEW: Violet color for particles
                "color": { "value": "#a855f7" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3, "random": true },
                "size": { "value": 2.5, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    // NEW: Violet color for lines
                    "color": "#a855f7",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": { "enable": true, "speed": 0.8, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.2 } } }
            },
            "retina_detect": true
        });
    }
}
