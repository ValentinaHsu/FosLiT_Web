// About Us page specific JavaScript functionality

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactFormSubmit);
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Validate form
    if (!validateForm(form)) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
        // Success simulation
        showNotification('¡Mensaje enviado correctamente! Nos contactaremos contigo pronto.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Optional: Track form submission
        trackFormSubmission(formData);
    }, 2000);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo es requerido');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Por favor ingresa un email válido');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(event) {
    const field = event.target;
    clearError(field);
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'Este campo es requerido');
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Por favor ingresa un email válido');
    }
}

function showFieldError(field, message) {
    clearError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorElement);
}

function clearError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function trackFormSubmission(formData) {
    // Analytics tracking (replace with your analytics implementation)
    console.log('Form submitted:', Object.fromEntries(formData));
}

// Timeline animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Values animation
function initValuesAnimation() {
    const valueItems = document.querySelectorAll('.value-item');
    
    const valuesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    valueItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        valuesObserver.observe(item);
    });
}

// Values hover effects
function initValuesHoverEffects() {
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach(item => {
        const icon = item.querySelector('.value-icon');
        
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '';
        });
    });
}

// Mission and Vision animation
function initMissionVisionAnimation() {
    const missionCard = document.querySelector('.mission-card');
    const visionCard = document.querySelector('.vision-card');
    
    if (!missionCard || !visionCard) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate mission card
                setTimeout(() => {
                    missionCard.style.opacity = '1';
                    missionCard.style.transform = 'translateX(0)';
                }, 200);
                
                // Animate vision card
                setTimeout(() => {
                    visionCard.style.opacity = '1';
                    visionCard.style.transform = 'translateX(0)';
                }, 400);
            }
        });
    }, { threshold: 0.3 });

    // Set initial states
    missionCard.style.opacity = '0';
    missionCard.style.transform = 'translateX(-30px)';
    missionCard.style.transition = 'all 0.6s ease';
    
    visionCard.style.opacity = '0';
    visionCard.style.transform = 'translateX(30px)';
    visionCard.style.transition = 'all 0.6s ease';
    
    observer.observe(missionCard);
}

// Contact methods animation
function initContactMethodsAnimation() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    contactMethods.forEach(method => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(20px)';
        method.style.transition = 'all 0.5s ease';
        contactObserver.observe(method);
    });
}

// Contact methods hover effects
function initContactHoverEffects() {
    const contactMethods = document.querySelectorAll('.contact-method');
    const quickActions = document.querySelectorAll('.quick-action');
    
    contactMethods.forEach(method => {
        const icon = method.querySelector('.method-icon');
        
        method.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1)';
            method.style.transform = 'translateY(-3px)';
            method.style.background = '#f8fafc';
        });
        
        method.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
            method.style.transform = 'translateY(0)';
            method.style.background = '';
        });
    });
    
    quickActions.forEach(action => {
        action.addEventListener('mouseenter', () => {
            action.style.transform = 'scale(1.05)';
            action.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
        });
        
        action.addEventListener('mouseleave', () => {
            action.style.transform = 'scale(1)';
            action.style.boxShadow = '';
        });
    });
}

// Form field focus effects
function initFormEffects() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (!input || !label) return;
        
        input.addEventListener('focus', () => {
            group.classList.add('focused');
            label.style.color = '#2563eb';
        });
        
        input.addEventListener('blur', () => {
            group.classList.remove('focused');
            label.style.color = '';
        });
        
        input.addEventListener('input', () => {
            if (input.value) {
                group.classList.add('has-value');
            } else {
                group.classList.remove('has-value');
            }
        });
    });
}

// About cards animation
function initAboutCardsAnimation() {
    const aboutCards = document.querySelectorAll('.about-card');
    
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 300);
            }
        });
    }, { threshold: 0.2 });

    aboutCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardsObserver.observe(card);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const iconColor = type === 'success' ? '#10b981' : '#ef4444';
    
    notification.innerHTML = `
        <i class="fas ${icon}" style="color: ${iconColor}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Page progress indicator
function initPageProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'page-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.querySelector('.progress-fill').style.width = `${scrolled}%`;
    });
}

// Initialize all about page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the about page
    if (!document.querySelector('.about-content')) return;
    
    console.log('About page JavaScript loaded');
    
    // Initialize form functionality
    initContactForm();
    initFormEffects();
    
    // Initialize animations with staggered delays
    setTimeout(initAboutCardsAnimation, 200);
    setTimeout(initTimelineAnimation, 400);
    setTimeout(initValuesAnimation, 600);
    setTimeout(initMissionVisionAnimation, 800);
    setTimeout(initContactMethodsAnimation, 1000);
    
    // Initialize interactive effects
    initValuesHoverEffects();
    initContactHoverEffects();
    
    // Optional enhancements
    // initPageProgress();
});

// Scroll to contact form function
function scrollToContact() {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        window.FOSLiT.utils.scrollToElement(contactSection);
    }
}

// Export functions for potential external use
window.FOSLiT = window.FOSLiT || {};
window.FOSLiT.about = {
    showNotification,
    scrollToContact
};

// Make showNotification globally accessible
window.showNotification = showNotification;