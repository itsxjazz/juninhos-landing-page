import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealVars {
  y?: number;
  duration?: number;
  stagger?: number;
  staggerLimit?: number;
}

function reveal(target: string, vars: RevealVars = {}) {
  const elements = gsap.utils.toArray<HTMLElement>(target);
  if (!elements.length) return;

  elements.forEach((el, i) => {
    gsap.set(el, { opacity: 0, y: vars.y ?? 15 });

    gsap.to(el, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      duration: vars.duration ?? 0.5,
      delay: vars.stagger ? (i % (vars.staggerLimit ?? 4)) * vars.stagger : 0,
      ease: 'power2.out',
      clearProps: 'transform',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  });
}

export const Animations = {
  initHeader() {
    gsap.fromTo(
      '.main-header',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
    );
    gsap.fromTo(
      '.main-header img, .nav-menu li, .mobile-menu-toggle',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.2,
        ease: 'power2.out',
      },
    );
  },

  initHero() {
    const ease = 'power2.out';
    const heroContainer = document.querySelector('.hero-section');
    if (heroContainer) {
      gsap.set(heroContainer, { y: 20, opacity: 0 });
      gsap.to(heroContainer, { y: 0, opacity: 1, duration: 0.8, ease, delay: 0.3 });
    }
  },

  initSections() {
    reveal('.section-title', { y: 30 });
    reveal('.section-subtitle', { y: 20 });
    reveal('.about-text', { y: 20, stagger: 0.1, staggerLimit: 4 });
    reveal('.about-content', { y: 30 });
    reveal('.section-header', { y: 20 });
  },

  initCards() {
    reveal('.stat-item', { y: 30, stagger: 0.1, staggerLimit: 3 });
    reveal('.static-card', { y: 40, stagger: 0.1, staggerLimit: 3 });
    reveal('.benefit-card', { y: 40, stagger: 0.1, staggerLimit: 4 });
    reveal('.social-card', { y: 40, stagger: 0.08, staggerLimit: 3 });
    reveal('.project-card', { y: 40, stagger: 0.1, staggerLimit: 3 });
    reveal('.class-card', { y: 40, stagger: 0.1, staggerLimit: 3 });
    reveal('.contribute-card', { y: 40, stagger: 0.1, staggerLimit: 2 });
    reveal('.badge-exclusive, .link-btn', { y: 20, stagger: 0.08, staggerLimit: 4 });
  },

  initFooter() {
    reveal('.footer-brand, .footer-links, .footer-socials, .footer-apoia', {
      y: 40,
      stagger: 0.12,
      staggerLimit: 4,
    });
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
      gsap.set(footerBottom, { y: 40, opacity: 0 });
      ScrollTrigger.create({
        trigger: footerBottom,
        start: 'top bottom',
        once: true,
        onEnter: () =>
          gsap.to(footerBottom, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }),
      });
    }
  },

  initAll() {
    Animations.initHeader();
    Animations.initHero();
    Animations.initSections();
    Animations.initCards();
    Animations.initFooter();
    ScrollTrigger.refresh();
  },

  refreshCards() {
    Animations.initCards();
    ScrollTrigger.refresh();
  },
};
