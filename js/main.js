// Main Functionality: Navbar, FAQ, Back to Top, Scroll Progress
document.addEventListener('DOMContentLoaded', () => {
    // ==================== Navbar Scroll Effect ====================
    const navbar = document.getElementById('navbar');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll progress bar
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgressBar.style.width = progress + '%';

        // Back to top visibility
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== Mobile Menu Toggle ====================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==================== FAQ Accordion ====================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all others
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // ==================== Smooth Scroll for Anchor Links ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== Typed Text Effect (Hero) ====================
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const phrases = [
            'Trusted Doctor in Tirur',
            'Compassionate Healthcare',
            'Personalized Medical Care',
            'Serving Community Since Years'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;
        let deleteSpeed = 50;
        let pauseTime = 2000;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (!isDeleting) {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, pauseTime);
                    return;
                }
                setTimeout(type, typeSpeed);
            } else {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 300);
                    return;
                }
                setTimeout(type, deleteSpeed);
            }
        }

        setTimeout(type, 1500);
    }
});