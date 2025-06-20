// script.js

document.addEventListener('DOMContentLoaded', function () {
    // ===== Button Click Alerts =====
    const loginBtn = document.querySelector('.btn.login');
    const signupBtn = document.querySelector('.btn.signup');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('Login feature coming soon. Stay tuned!');
        });
    } else {
        console.warn('Login button not found.');
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            alert('Sign up feature coming soon. Get ready to join TradeMaster!');
        });
    } else {
        console.warn('Signup button not found.');
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Highlight Static Active Navigation Links =====
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // ===== Sticky Header with Throttled Scroll Event =====
    const header = document.querySelector('header');
    let ticking = false;

    function handleStickyHeader() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleStickyHeader);
            ticking = true;
        }
    });

    // ===== Active Link Highlighting Based on Section Scroll =====
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

            if (
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight &&
                navLink
            ) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(highlightNavOnScroll);
            ticking = true;
        }
    });
});
// ===== Responsive Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
} else {
    console.warn('Navigation toggle button not found.');
}
// ===== Close Navigation Menu on Link Click =====
navMenu.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});
// ===== Close Navigation Menu on Outside Click =====
document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});
// ===== Close Navigation Menu on Escape Key Press =====
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});
// ===== Responsive Navigation Menu Highlighting =====
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
// ===== Responsive Navigation Menu Accessibility =====
navToggle.setAttribute('aria-expanded', 'false');
navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
});
// ===== Responsive Navigation Menu Keyboard Navigation =====
navLinks.forEach(link => {
    link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            link.click();
        }
    });
});
// ===== Responsive Navigation Menu Focus Management =====
navToggle.addEventListener('focus', () => {
    if (navMenu.classList.contains('active')) {
        navLinks[0].focus();
    }
});
navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        if (navMenu.classList.contains('active')) {
            link.classList.add('focused');
        }
    });
    link.addEventListener('blur', () => {
        link.classList.remove('focused');
    });
});
// ===== Responsive Navigation Menu ARIA Roles =====
navMenu.setAttribute('role', 'navigation');
navLinks.forEach(link => {
    link.setAttribute('role', 'menuitem');
});
// ===== Responsive Navigation Menu ARIA Labels =====
navToggle.setAttribute('aria-label', 'Toggle navigation menu');
// navMenu.setAttribute('aria-label', 'Main navigation menu');
navLinks.forEach(link => {
    link.setAttribute('aria-label', link.textContent);
});
// ===== Responsive Navigation Menu ARIA Live Region =====
const ariaLiveRegion = document.createElement('div');
ariaLiveRegion.setAttribute('role', 'alert');
ariaLiveRegion.setAttribute('aria-live', 'assertive');
ariaLiveRegion.classList.add('sr-only');
document.body.appendChild(ariaLiveRegion);
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        ariaLiveRegion.textContent = `Navigated to ${link.textContent}`;
    });
});