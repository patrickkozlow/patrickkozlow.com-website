document.addEventListener('DOMContentLoaded', function() {
    
    // Typing animation for hero section (only on initial load)
    const heroGreeting = document.getElementById('hero-greeting');
    const heroName = document.getElementById('hero-name');
    const heroTagline = document.getElementById('hero-tagline');
    const heroDescription = document.getElementById('hero-description');
    const heroCta = document.getElementById('hero-cta');
    
    // Check if this is the initial load
    const hasSeenAnimation = sessionStorage.getItem('heroAnimationShown');
    
    if (!hasSeenAnimation) {
        // Hide content initially
        heroName.style.opacity = '0';
        heroTagline.style.opacity = '0';
        heroDescription.style.opacity = '0';
        heroCta.style.opacity = '0';
        
        // Add typing cursor class
        heroGreeting.classList.add('typing');
        
        // Typing animation function
        function typeText(element, text, speed = 50) {
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
        
        // Animate typing sequence
        async function animateHero() {
            // Type "Hi,"
            await typeText(heroGreeting, 'Hi,', 80);
            
            // Pause (human-like break)
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Type " my name is"
            await typeText(heroGreeting, ' my name is', 60);
            
            // Brief pause before revealing content
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Remove cursor and reveal rest of content
            heroGreeting.classList.remove('typing');
            
            // Fade in the rest of the hero content
            heroName.style.transition = 'opacity 0.8s ease-in';
            heroTagline.style.transition = 'opacity 0.8s ease-in 0.2s';
            heroDescription.style.transition = 'opacity 0.8s ease-in 0.4s';
            heroCta.style.transition = 'opacity 0.8s ease-in 0.6s';
            
            heroName.style.opacity = '1';
            setTimeout(() => heroTagline.style.opacity = '1', 200);
            setTimeout(() => heroDescription.style.opacity = '1', 400);
            setTimeout(() => heroCta.style.opacity = '1', 600);
            
            // Mark animation as shown
            sessionStorage.setItem('heroAnimationShown', 'true');
        }
        
        // Start animation after a brief delay
        setTimeout(animateHero, 300);
    } else {
        // Not initial load - show everything immediately
        heroGreeting.textContent = 'Hi, my name is';
        heroName.style.opacity = '1';
        heroTagline.style.opacity = '1';
        heroDescription.style.opacity = '1';
        heroCta.style.opacity = '1';
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const tabButtons = document.querySelectorAll('.tab-button');
    const jobPanels = document.querySelectorAll('.job-panel');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const companyName = this.getAttribute('data-company');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            jobPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('data-company') === companyName) {
                    panel.classList.add('active');
                }
            });
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.content-section, .project-card, .other-project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    const navbar = document.querySelector('.nav-wrapper');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }, false);
});
