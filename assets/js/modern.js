document.addEventListener('DOMContentLoaded', function() {

    // Typing animation for the hero, once per session. The inline script in
    // <head> adds .hero-intro only when it should play (and never with
    // reduced motion), so the rest of the hero starts hidden without a flash.
    const root = document.documentElement;
    const heroGreeting = document.getElementById('hero-greeting');

    if (root.classList.contains('hero-intro')) {
        const greeting = heroGreeting.textContent;
        heroGreeting.textContent = '';
        heroGreeting.classList.add('typing');

        function typeText(element, text, speed) {
            return new Promise((resolve) => {
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                        resolve();
                    }
                }, speed);
            });
        }

        const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        async function animateHero() {
            const comma = greeting.indexOf(',') + 1;
            await typeText(heroGreeting, greeting.slice(0, comma), 80);
            await pause(450);
            await typeText(heroGreeting, greeting.slice(comma), 55);
            await pause(350);

            heroGreeting.classList.remove('typing');
            root.classList.add('hero-revealed');
            try { sessionStorage.setItem('heroAnimationShown', 'true'); } catch (e) {}
        }

        setTimeout(animateHero, 300);
    }

    // Scroll reveal: each block fades up as it enters the viewport, once.
    // Blocks rather than whole sections, so tall sections never sit blank.
    if (root.classList.contains('motion') && 'IntersectionObserver' in window) {
        const blocks = document.querySelectorAll(
            '.content-section .section-heading, .about-text, .about-image, .certifications, ' +
            '.glance-result, .glance-skill, .experience-container, .project-card, ' +
            '.publications, .contact-content'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        blocks.forEach(block => {
            block.classList.add('reveal');
            // Stagger siblings in a row (the four results, the skill rows) slightly.
            const siblings = Array.from(block.parentElement.children).filter(el => el.matches(block.tagName));
            const index = siblings.indexOf(block);
            if (siblings.length > 1 && index > 0) {
                block.style.transitionDelay = `${Math.min(index, 4) * 70}ms`;
            }
            revealObserver.observe(block);
        });
    }

    // Highlight the nav link for the section in view.
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // Experience tabs, with arrow key support.
    const tabs = Array.from(document.querySelectorAll('.tab-button'));

    function selectTab(tab) {
        tabs.forEach(t => {
            const selected = t === tab;
            t.classList.toggle('active', selected);
            t.setAttribute('aria-selected', selected);
            t.tabIndex = selected ? 0 : -1;
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            panel.hidden = !selected;
            panel.classList.toggle('active', selected);
        });
    }

    tabs.forEach((tab, i) => {
        // Select on press, not release, so the panel responds immediately.
        tab.addEventListener('pointerdown', () => selectTab(tab));
        tab.addEventListener('click', () => selectTab(tab));
        tab.addEventListener('keydown', (e) => {
            const vertical = window.matchMedia('(min-width: 769px)').matches;
            const next = vertical ? 'ArrowDown' : 'ArrowRight';
            const prev = vertical ? 'ArrowUp' : 'ArrowLeft';
            let target = null;
            if (e.key === next) target = tabs[(i + 1) % tabs.length];
            if (e.key === prev) target = tabs[(i - 1 + tabs.length) % tabs.length];
            if (e.key === 'Home') target = tabs[0];
            if (e.key === 'End') target = tabs[tabs.length - 1];
            if (target) {
                e.preventDefault();
                selectTab(target);
                target.focus();
            }
        });
    });
});
