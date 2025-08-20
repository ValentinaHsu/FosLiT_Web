// Home page specific JavaScript functionality

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    if (!slides.length) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[index].classList.add('active');
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function changeSlide(direction) {
    if (!slides.length) return;
    
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    showSlide(currentSlide);
}

function currentSlideIndicator(index) {
    currentSlide = index - 1;
    showSlide(currentSlide);
}

// Auto-advance carousel
let carouselInterval;

function startCarouselAutoplay() {
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopCarouselAutoplay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
}

// Pause autoplay on hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopCarouselAutoplay);
    carouselContainer.addEventListener('mouseleave', startCarouselAutoplay);
}

// Hero animations
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content .hero-subtitle, .hero-content .hero-description, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}

// Features section animations
function initFeaturesAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const featuresObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        featuresObserver.observe(card);
    });
}

// Carousel slide CTAs
function initSlideCTAs() {
    const slideCTAs = document.querySelectorAll('.slide-cta');
    slideCTAs.forEach(cta => {
        cta.addEventListener('click', (e) => {
            e.preventDefault();
            // Add some animation before navigation
            cta.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.location.href = cta.getAttribute('href');
            }, 150);
        });
    });
}

// Enhanced CTA button animations
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
        
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = 'translateY(-3px)';
            }, 100);
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after hero title animation
    setTimeout(typeWriter, 1000);
}

// Statistics counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 40);
}

// Features hover effects
function initFeatureHoverEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const icon = card.querySelector('.feature-icon');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize all home page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the home page
    if (!document.querySelector('.hero-section')) return;
    
    console.log('Home page JavaScript loaded');
    
    // Initialize carousel
    if (slides.length > 0) {
        startCarouselAutoplay();
        showSlide(0);
    }
    
    // Initialize animations with delays to create a smooth sequence
    setTimeout(initHeroAnimations, 300);
    setTimeout(initFeaturesAnimations, 500);
    
    // Initialize interactive elements
    initSlideCTAs();
    initCTAButtons();
    initFeatureHoverEffects();
    initStatsCounter();
    
    // Optional advanced effects (uncomment if desired)
    // initParallaxEffect();
    // initTypingEffect();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopCarouselAutoplay();
});

// Export functions for global access
window.changeSlide = changeSlide;
window.currentSlide = currentSlideIndicator;