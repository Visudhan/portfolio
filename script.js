gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');

let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;

const sectionColors = {
    '#hero': '#d64a2e',
    '#work': '#c44569',
    '#skills': '#2ecc71',
    '#about': '#9b59b6',
    '#contact': '#e74c3c'
};

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1
    });
});

function animateCursor() {
    circleX += (mouseX - circleX) * 0.1;
    circleY += (mouseY - circleY) * 0.1;
    
    gsap.to(cursorCircle, {
        x: circleX,
        y: circleY,
        duration: 0.3
    });
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .work-item, .skill-group, .contact-email, .social-links a, .stat').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

Object.entries(sectionColors).forEach(([selector, color]) => {
    const section = document.querySelector(selector);
    if (section) {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                gsap.to(cursorDot, { backgroundColor: color, duration: 0.4 });
                gsap.to(cursorCircle, { borderColor: color, duration: 0.4 });
                gsap.to('::-webkit-scrollbar-thumb', { backgroundColor: color, duration: 0.4 });
            },
            onEnterBack: () => {
                gsap.to(cursorDot, { backgroundColor: color, duration: 0.4 });
                gsap.to(cursorCircle, { borderColor: color, duration: 0.4 });
                gsap.to('::-webkit-scrollbar-thumb', { backgroundColor: color, duration: 0.4 });
            }
        });
    }
});

const sideLinks = document.querySelectorAll('.side-link');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    document.querySelectorAll('section').forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < bottom) {
            const id = '#' + section.getAttribute('id');
            sideLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        initAnimations();
    }, 2000);
});

function initAnimations() {
    const tl = gsap.timeline();
    
    tl.from('.side-decoration', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.hero-subtitle .line', {
        width: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-subtitle .text', {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.hero-title .line', {
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out'
    }, '-=0.3')
    .to('.hero-desc', {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-cta', {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');
    
    gsap.from('.floating-shapes .shape', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.5
    });
}

gsap.to('.hero-title .line', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -100,
    opacity: 0
});

gsap.to('.hero-desc', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '50% top',
        scrub: 1
    },
    y: -50,
    opacity: 0
});

gsap.to('.hero-cta', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '60% top',
        scrub: 1
    },
    y: -80,
    opacity: 0
});

gsap.from('.floating-shapes .shape', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 100,
    opacity: 0.5
});

gsap.from('.section-header', {
    scrollTrigger: {
        trigger: '.section-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.section-num', {
    scrollTrigger: {
        trigger: '.section-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
});

gsap.from('.section-title', {
    scrollTrigger: {
        trigger: '.section-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.1
});

gsap.from('.section-number', {
    scrollTrigger: {
        trigger: '.section-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    x: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.section-divider', {
    scrollTrigger: {
        trigger: '.section-divider',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
    },
    scaleX: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
});

gsap.utils.toArray('.work-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.1
    });
});

gsap.utils.toArray('.skill-group').forEach((group, i) => {
    gsap.from(group, {
        scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.1
    });
});

gsap.from('.about-desc', {
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.about-stats', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    x: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.stat', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%'
    },
    x: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power3.out'
});

gsap.from('.contact-title .line', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.contact-email', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
    },
    y: 40,
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.3
});

gsap.from('.social-links a', {
    scrollTrigger: {
        trigger: '.social-links',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out'
});

const nav = document.querySelector('.nav');

ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 80) {
            nav.classList.add('scrolled');
        } else if (self.scroll() < 80) {
            nav.classList.remove('scrolled');
        }
    }
});

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > lastScroll && currentScroll > 200) {
        gsap.to(nav, {
            y: -100,
            duration: 0.4,
            ease: 'power2.inOut'
        });
    } else {
        gsap.to(nav, {
            y: 0,
            duration: 0.4,
            ease: 'power2.inOut'
        });
    }
    
    lastScroll = currentScroll;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                scrollTo: {
                    y: target,
                    offsetY: 0
                },
                duration: 1.2,
                ease: 'power3.inOut'
            });
        }
    });
});

gsap.from('.work-tags span', {
    scrollTrigger: {
        trigger: '.work-list',
        start: 'top 70%'
    },
    y: 10,
    opacity: 0,
    stagger: 0.03,
    duration: 0.4,
    ease: 'power2.out'
});
