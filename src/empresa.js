// Company page specific JavaScript functionality

// Statistics animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const isPercentage = entry.target.textContent.includes('%');
                animateCounter(entry.target, target, isPercentage);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, target, isPercentage = false) {
    let current = 0;
    const increment = target / 60; // Animation duration: ~1.5 seconds
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const displayValue = Math.floor(current);
        element.textContent = isPercentage ? `${displayValue}` : displayValue;
    }, 25);
}

// Service cards animation
function initServiceCardsAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        serviceObserver.observe(card);
    });
}

// Service cards hover effects
function initServiceHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        const features = card.querySelectorAll('.service-features li');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // Animate features list
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.color = '#2563eb';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            
            // Reset features list
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = '';
            });
        });
    });
}

// Stats cards hover effects
function initStatsHoverEffects() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 15px 30px rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

// Team members animation
function initTeamAnimation() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'all 0.6s ease';
        teamObserver.observe(member);
    });
}

// Team hover effects
function initTeamHoverEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        const photo = member.querySelector('.member-photo');
        
        member.addEventListener('mouseenter', () => {
            photo.style.transform = 'scale(1.1)';
            member.style.transform = 'translateY(-5px)';
        });
        
        member.addEventListener('mouseleave', () => {
            photo.style.transform = 'scale(1)';
            member.style.transform = 'translateY(0)';
        });
    });
}

// Company overview animation
function initOverviewAnimation() {
    const overviewText = document.querySelector('.overview-text');
    const overviewImage = document.querySelector('.overview-image');
    
    if (!overviewText || !overviewImage) return;
    
    const overviewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate text
                const textElements = overviewText.querySelectorAll('h2, p');
                textElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    }, index * 200);
                });
                
                // Animate image
                setTimeout(() => {
                    overviewImage.style.opacity = '1';
                    overviewImage.style.transform = 'translateX(0) scale(1)';
                }, 400);
            }
        });
    }, { threshold: 0.3 });

    // Set initial states
    const textElements = overviewText.querySelectorAll('h2, p');
    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    overviewImage.style.opacity = '0';
    overviewImage.style.transform = 'translateX(30px) scale(0.9)';
    overviewImage.style.transition = 'all 0.8s ease';
    
    overviewObserver.observe(overviewText);
}

// Parallax effect for stats section
function initStatsParallax() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (window.FOSLiT.utils.isInViewport(statsSection)) {
            statsSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// CTA section animation
function initCTAAnimation() {
    const ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;
    
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ctaContent = entry.target.querySelector('.cta-content');
                const elements = ctaContent.querySelectorAll('h2, p, .cta-buttons');
                
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const ctaElements = ctaSection.querySelectorAll('.cta-content h2, .cta-content p, .cta-buttons');
    ctaElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    ctaObserver.observe(ctaSection);
}

// Enhanced CTA button effects
function initCTAButtonEffects() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        });
        
        button.addEventListener('click', () => {
            button.style.transform = 'translateY(-3px) scale(0.98)';
            setTimeout(() => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            }, 100);
        });
    });
}

// Progress bars for services (if needed)
function initServiceProgress() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'service-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        // Add progress bar to card (optional enhancement)
        // card.appendChild(progressBar);
        
        // Animate progress when card is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = progressBar.querySelector('.progress-fill');
                    const percentage = 75 + (index * 5); // Sample percentages
                    
                    setTimeout(() => {
                        progressFill.style.width = `${percentage}%`;
                    }, 500);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(card);
    });
}

// Initialize all company page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the company page
    if (!document.querySelector('.company-overview')) return;
    
    console.log('Company page JavaScript loaded');
    
    // Initialize animations with delays for better UX
    setTimeout(initOverviewAnimation, 200);
    setTimeout(initServiceCardsAnimation, 400);
    setTimeout(animateStats, 600);
    setTimeout(initTeamAnimation, 800);
    setTimeout(initCTAAnimation, 1000);
    
    // Initialize interactive effects
    initServiceHoverEffects();
    initStatsHoverEffects();
    initTeamHoverEffects();
    initCTAButtonEffects();
    
    // Optional advanced effects (uncomment if desired)
    // initStatsParallax();
    // initServiceProgress();
});

// Utility function for smooth reveal animations
function revealElements(selector, delay = 0) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay + (index * 100));
    });
}

// Export functions for potential external use
window.FOSLiT = window.FOSLiT || {};
window.FOSLiT.company = {
    animateStats,
    revealElements
};