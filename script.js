// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 1000);
});

// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect and Progress Bar
const navbar = document.getElementById('navbar');
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        if(navbar) navbar.classList.add('scrolled');
    } else {
        if(navbar) navbar.classList.remove('scrolled');
    }

    // Scroll Progress
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
});

// Number Counter Animation
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        let count = 0;
        const speed = target / 50; // Adjust speed
        
        const updateCount = () => {
            if (count < target) {
                count += speed;
                num.innerText = Math.ceil(count);
                setTimeout(updateCount, 40);
            } else {
                num.innerText = target;
            }
        };
        updateCount();
    });
};

// Menu Tabs
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        menuTabs.forEach(t => t.classList.remove('active'));
        menuPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        document.getElementById(`tab-${target}`).classList.add('active');
    });
});

// Testimonial Slider
const testTrack = document.getElementById('testimonial-track');
const testDotsContainer = document.getElementById('test-dots');
const btnPrev = document.getElementById('test-prev');
const btnNext = document.getElementById('test-next');
const testimonials = document.querySelectorAll('.testimonial-card');

if (testTrack && testimonials.length > 0) {
    let currentIndex = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('test-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        testDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.test-dot');

    function updateSlider() {
        testTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }

    if (btnNext) btnNext.addEventListener('click', nextSlide);
    if (btnPrev) btnPrev.addEventListener('click', prevSlide);

    // Auto slide
    setInterval(nextSlide, 5000);
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animation using Intersection Observer
const animateElements = document.querySelectorAll('[data-animate]');
if (animateElements.length > 0) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    el.classList.add('animated');
                    // Number animation if it's stats section
                    if (el.classList.contains('hero-stats')) {
                        animateNumbers();
                    }
                }, delay);
                
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));
}

// Form Submission
const contactForm = document.getElementById('contact-form');
const formWrapper = document.querySelector('.contact-form-wrapper');

if (contactForm && formWrapper) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        formWrapper.innerHTML = `
            <div class="form-success">
                <div class="form-success-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--dark-900)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. Abby's team will get back to you shortly to discuss your event.</p>
            </div>
        `;
    });
}
