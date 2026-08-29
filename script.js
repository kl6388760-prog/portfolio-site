document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initParticles();
    initNavbar();
    initMobileMenu();
    initTypingEffect();
    initScrollReveal();
    initCounters();
    initMagneticButtons();
    initTiltEffect();
    initSkillBars();
    initScrollToTop();
    initSmoothScroll();
    initContactForm();
    initScrollProgress();
    initThemeToggle();
    initParallaxOrbs();
    initGlitchEffect();
    initCareerCounter();
    initAnimatedTitles();
    initGitHubRepos();
});

function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    });
    document.body.style.overflow = 'hidden';
}

function initCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorDot || !cursorGlow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .about-card, .skill-tag, input, textarea, .nav-hamburger, .social-link, .project-link, .scroll-to-top, .github-repo-card, .theme-toggle');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 80;
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `rgba(0, 240, 255, ${this.opacity})`;
            this.twinkle = Math.random() * 0.02 + 0.005;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.twinkle;
            if (this.opacity > 0.8 || this.opacity < 0.1) this.twinkle *= -1;
            this.color = `rgba(0, 240, 255, ${this.opacity})`;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        const mouse = { x: -1000, y: -1000 };
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        particles.forEach(p => {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                const force = (100 - dist) / 100;
                p.x += dx * force * 0.03;
                p.y += dy * force * 0.03;
            }
        });
        animationId = requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animateParticles();
        }
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
        updateScrollProgress();
    });
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        updateScrollProgress();
    });
}

function updateScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
}

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    toggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        orbs.forEach(orb => {
            const speed = parseFloat(orb.getAttribute('data-speed')) || 0.03;
            const y = scrollY * speed;
            orb.style.transform = `translateY(${y}px)`;
        });
    });
}

function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('glitching');
        });
        el.addEventListener('mouseleave', () => {
            el.classList.remove('glitching');
        });
    });
}

function initCareerCounter() {
    const startDate = new Date('2020-01-01');
    const counterEl = document.getElementById('career-days');
    if (!counterEl) return;
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    counterEl.textContent = diffDays;
    setInterval(() => {
        const now = new Date();
        const diff = now - startDate;
        counterEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    }, 60000);
}

function initAnimatedTitles() {
    const titles = document.querySelectorAll('.section-title[data-animate="letters"]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                const text = title.textContent;
                title.textContent = '';
                [...text].forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.animationDelay = (index * 0.05) + 's';
                    title.appendChild(span);
                });
                observer.unobserve(title);
            }
        });
    }, { threshold: 0.5 });
    titles.forEach(title => observer.observe(title));
}

function initGitHubRepos() {
    const container = document.getElementById('github-repos');
    if (!container) return;
    const username = 'your-username';
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                container.innerHTML = '';
                data.forEach(repo => {
                    const card = document.createElement('div');
                    card.className = 'github-repo-card';
                    card.innerHTML = `
                        <a href="${repo.html_url}" target="_blank" class="github-repo-name">${repo.name}</a>
                        <p class="github-repo-desc">${repo.description || 'No description provided.'}</p>
                        <div class="github-repo-meta">
                            <span class="github-repo-lang">${repo.language || 'N/A'}</span>
                            <span>★ ${repo.stargazers_count}</span>
                            <span>⑂ ${repo.forks_count}</span>
                        </div>
                    `;
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = '<div class="github-loading">No repositories found. Check username or API rate limit.</div>';
            }
        })
        .catch(err => {
            container.innerHTML = '<div class="github-loading">Failed to load repositories. Try again later.</div>';
        });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    const words = ['beautiful websites', 'interactive experiences', 'modern web apps', 'creative solutions', 'digital magic'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}

function initScrollReveal() {
    const sections = document.querySelectorAll('.section-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.querySelectorAll('.skill-progress').length) {
                    animateSkillBars(entry.target);
                }
                if (entry.target.querySelectorAll('.stat-number').length) {
                    animateCounters(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));
}

function initCounters() {
    animateCounters(document);
}

function animateCounters(section) {
    section.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            if (elapsed < duration) {
                current = Math.min(target, Math.floor((elapsed / duration) * target));
                counter.textContent = current;
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }
        requestAnimationFrame(update);
    });
}

function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.style.getPropertyValue('--progress');
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.skill-progress').forEach(bar => observer.observe(bar));
}

function animateSkillBars(section) {
    section.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--progress');
    });
}

function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    scrollBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initSmoothScroll() {
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
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log('Form submitted:', data);
        form.reset();
        const btn = form.querySelector('.form-submit');
        btn.innerHTML = 'Message Sent! ✓';
        btn.style.background = 'rgba(34,197,94,0.2)';
        btn.style.border = '1px solid #22c55e';
        setTimeout(() => {
            btn.innerHTML = `Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
            btn.style.background = '';
            btn.style.border = '';
        }, 3000);
    });
}
