// Main Functionality: Navbar, FAQ, Back to Top, Scroll Progress, Carousel
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgressBar.style.width = progress + '%';

        if (window.scrollY > 400) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // Smooth scroll
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

    // Fanned Carousel
    const carouselItems = [
        { img: "assets/images/tirur_image_1.jpg", place: "തിരൂർ ദൃശ്യം 1" },
        { img: "assets/images/tirur_image_2.jpg", place: "തിരൂർ ദൃശ്യം 2" },
        { img: "assets/images/tirur_image_3.jpg", place: "തിരൂർ ദൃശ്യം 3" }
    ];
    let activeIndex = 0;
    const frame = document.getElementById('carousel-frame');
    const dotsWrap = document.getElementById('carousel-dots');

    function renderCarousel() {
        frame.innerHTML = '';
        carouselItems.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            let pos = 'hidden';
            const diff = (i - activeIndex + carouselItems.length) % carouselItems.length;
            if (diff === 0) pos = 'active';
            else if (diff === 1) pos = 'next';
            else if (diff === carouselItems.length - 1) pos = 'prev';
            card.dataset.pos = pos;
            card.innerHTML = `<img src="${item.img}" alt="${item.place}"><span class="carousel-tag">${item.place}</span>`;
            frame.appendChild(card);
        });

        dotsWrap.innerHTML = '';
        carouselItems.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot' + (i === activeIndex ? ' active' : '');
            dot.addEventListener('click', () => {
                activeIndex = i;
                renderCarousel();
            });
            dotsWrap.appendChild(dot);
        });
    }

    document.getElementById('carousel-prev').addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
        renderCarousel();
    });
    document.getElementById('carousel-next').addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % carouselItems.length;
        renderCarousel();
    });

    renderCarousel();
});