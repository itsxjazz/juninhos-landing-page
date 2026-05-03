gsap.registerPlugin(ScrollTrigger);

const reveal = (target, vars = {}) => {
    const elements = gsap.utils.toArray(target);
    if (!elements.length) return;
    elements.forEach((el, i) => {
        gsap.from(el, {
            y: vars.y ?? 40,
            x: vars.x ?? 0,
            opacity: 0,
            scale: vars.scale ?? 1,
            duration: vars.duration ?? 0.8,
            delay: vars.stagger ? (i % (vars.staggerLimit ?? 4)) * vars.stagger : 0,
            ease: vars.ease ?? 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: vars.start ?? 'top 95%',
                toggleActions: 'play none none none'
            }
        });
    });
};

const Animations = {
    initHeader: () => {
        gsap.from('.main-header', { y: -50, opacity: 0, duration: 0.7, ease: 'power3.out' });
        gsap.from('.logo, .nav-menu li, .mobile-menu-toggle', {
            y: -20, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.2, ease: 'power3.out'
        });
    },

    initHero: () => {
        const ease = 'power3.out';
        gsap.from('.container', { y: 60, opacity: 0, duration: 0.9, ease });
    },

    initSections: () => {
        reveal('.section-title', { y: 40 });
        reveal('.section-subtitle', { y: 30 });
        reveal('section h2:not(.section-title)', { y: 40 });
        reveal('section h3', { y: 30 });
        reveal('.about-text', { y: 30, stagger: 0.1, staggerLimit: 4 });
        reveal('section p:not(.section-subtitle):not(.about-text)', { y: 25 });
        reveal('.about-content', { y: 50 });
        reveal('.section-header', { y: 30 });
    },

    initCards: () => {
        reveal('.stat-item', { y: 40, stagger: 0.12, staggerLimit: 3 });
        reveal('.static-card', { y: 50, stagger: 0.12, staggerLimit: 3 });
        reveal('.benefit-card', { y: 50, stagger: 0.12, staggerLimit: 4 });
        reveal('.social-card', { y: 50, stagger: 0.1, staggerLimit: 3 });
        reveal('.project-card', { y: 60, stagger: 0.12, staggerLimit: 3 });
        reveal('.class-card', { y: 60, stagger: 0.12, staggerLimit: 3 });
        reveal('.contribute-card', { y: 50, stagger: 0.12, staggerLimit: 2 });
        reveal('.badge-exclusive, .link-btn', { y: 20, scale: 0.95, stagger: 0.08, staggerLimit: 4 });
    },

    initContribute: () => {
        reveal('.contribute-section > *', { y: 40, stagger: 0.1, staggerLimit: 4 });
    },

    initFooter: () => {
        reveal('.footer-brand, .footer-links, .footer-socials, .footer-apoia', {
            y: 40, stagger: 0.12, staggerLimit: 4
        });
       const footerBottom = document.querySelector('.footer-bottom');
        if (footerBottom) {
            gsap.set(footerBottom, { y: 40, opacity: 0 });
            ScrollTrigger.create({
                trigger: footerBottom,
                start: 'top bottom',
                once: true,
                onEnter: () => gsap.to(footerBottom, {
                    y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
                })
            });
        }
    },

    initAll: () => {
        Animations.initHeader();
        Animations.initHero();
        Animations.initSections();
        Animations.initCards();
        Animations.initContribute();
        Animations.initFooter();
        ScrollTrigger.refresh();
    },

    refreshCards: () => {
        Animations.initCards();
        ScrollTrigger.refresh();
    }
};

window.Animations = Animations;
