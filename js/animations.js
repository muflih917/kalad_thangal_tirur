// Scroll Animations, Counters, Schedule Highlight
document.addEventListener('DOMContentLoaded', () => {
    // ==================== Reveal on Scroll ====================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // ==================== Counter Animation ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }

    // ==================== Highlight Today's Schedule ====================
    const scheduleCards = document.querySelectorAll('.schedule-card');
    if (scheduleCards.length > 0) {
        const today = new Date().getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
        const dayMap = {
            0: 'sunday',
            1: 'monday',
            2: 'tuesday',
            3: 'wednesday',
            4: 'thursday',
            5: 'friday',
            6: 'saturday'
        };
        const todayName = dayMap[today];
        scheduleCards.forEach(card => {
            if (card.getAttribute('data-day') === todayName) {
                card.classList.add('today');
                // Add a badge "Today"
                const dayBadge = card.querySelector('.day-badge');
                if (dayBadge) {
                    dayBadge.textContent = 'Today';
                    dayBadge.classList.add('open-badge');
                }
            }
        });
    }
});