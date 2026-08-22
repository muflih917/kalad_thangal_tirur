// Effects: Preloader, Tilt, Cursor, Form
document.addEventListener('DOMContentLoaded', () => {
    // ==================== Preloader ====================
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
        }, 800);
    });

    // Fallback if load event already fired
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 1800);

    // ==================== Contact Form Handling ====================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate sending
            const submitBtn = contactForm.querySelector('.form-submit');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                contactForm.reset();
                formSuccess.classList.add('show');
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 4000);
            }, 1500);
        });
    }
});