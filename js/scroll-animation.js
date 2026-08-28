/* ============================================
   SCROLL-DRIVEN FRAME ANIMATION
   Uses ezgif-frame-001.png to ezgif-frame-240.png
   ============================================ */

(function () {
    'use strict';

    const TOTAL_FRAMES = 240;
    const FRAME_DIR    = 'images/';

    function pad(n) {
        return String(n).padStart(3, '0');
    }

    function getFramePath(index) {
        return FRAME_DIR + 'ezgif-frame-' + pad(index) + '.png';
    }

    // ── DOM refs ──────────────────────────────────────────────────────────
    const section   = document.getElementById('scroll-anim-section');
    const canvas    = document.getElementById('scroll-anim-canvas');
    const skipBtn   = document.getElementById('scroll-anim-skip');
    const scrollHint = document.getElementById('scroll-anim-hint');
    const body       = document.body;

    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d');

    // ── Image pool ────────────────────────────────────────────────────────
    const images       = new Array(TOTAL_FRAMES + 1); // index 1..240
    let   loadedCount  = 0;
    let   firstImageReady = false;
    let   currentFrame = 1;

    // ── Canvas sizing ─────────────────────────────────────────────────────
    function resizeCanvas() {
        // Set canvas pixel size to match its CSS size (full viewport)
        canvas.width  = canvas.offsetWidth  || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;
        renderFrame(currentFrame);
    }

    // ── Render a single frame (cover-fit) ────────────────────────────────
    function renderFrame(index) {
        const img = images[index];
        if (!img || !img.complete || !img.naturalWidth) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Cover: scale up so image fills the canvas entirely
        const scale = Math.max(cw / iw, ch / ih);
        const dw    = iw * scale;
        const dh    = ih * scale;
        const dx    = (cw - dw) / 2;
        const dy    = (ch - dh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    // ── Preload all frames ────────────────────────────────────────────────
    function loadImages() {
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loadedCount++;
                // Draw frame 1 as soon as it's ready
                if (i === 1 && !firstImageReady) {
                    firstImageReady = true;
                    resizeCanvas();
                }
            };
            images[i] = img;
        }
    }

    // ── Navbar hide/show ──────────────────────────────────────────────────
    function updateNavbar(progress) {
        // Hide navbar while user is inside the animation section (0 to 1)
        if (progress >= 0 && progress < 1) {
            body.classList.add('anim-active');
        } else {
            body.classList.remove('anim-active');
        }
    }

    // ── Scroll handler ────────────────────────────────────────────────────
    function onScroll() {
        const rect     = section.getBoundingClientRect();
        const sectionH = section.offsetHeight;
        const viewH    = window.innerHeight;

        // progress: 0 when section top is at viewport top,
        //           1 when section bottom has scrolled to viewport top
        const scrolled = -rect.top / (sectionH - viewH);
        const progress = Math.min(Math.max(scrolled, 0), 1);

        // Map 0→1 progress to frame index 1→240
        const frameIndex = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(1 + progress * (TOTAL_FRAMES - 1)))
        );

        if (frameIndex !== currentFrame) {
            currentFrame = frameIndex;
            renderFrame(currentFrame);
        }

        // Hide scroll hint once user starts scrolling
        if (scrollHint) {
            scrollHint.style.opacity = progress > 0.015 ? '0' : '1';
        }

        // Manage navbar visibility
        updateNavbar(progress);
    }

    // ── Skip button ───────────────────────────────────────────────────────
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            const hero = document.getElementById('hero');
            if (hero) {
                hero.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ── Init ──────────────────────────────────────────────────────────────
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', onScroll,     { passive: true });

    // Add class immediately so navbar is hidden before first paint
    body.classList.add('anim-active');

    requestAnimationFrame(() => {
        resizeCanvas();
        loadImages();
        onScroll();
    });
})();
