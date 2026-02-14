// DOM Elements
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const ctaCards = document.querySelectorAll('.cta-card');
const ctaBtns = document.querySelectorAll('.cta-btn');
const contactForm = document.querySelector('.contact-form');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Particle Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#00ff88';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particlesContainer.appendChild(particle);
    }
}

// Add floating animation to particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Check if it's a link to another page
        if (targetId && !targetId.startsWith('#')) {
            return; // Allow normal navigation to other pages
        }
        
        // Handle smooth scrolling for anchor links
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// CTA Card Interactions
ctaCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// CTA Button Click Handler
ctaBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.cta-card');
        const service = card.dataset.service;
        
        // Create modal or navigate to service page
        showServiceModal(service);
    });
});

// Service Modal
function showServiceModal(service) {
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = getServiceContent(service);
    modalOverlay.innerHTML = modalContent;
    document.body.appendChild(modalOverlay);
    
    // Fade in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
    }, 10);
    
    // Close modal
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay || e.target.classList.contains('close-modal')) {
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
            }, 300);
        }
    });
}

function getServiceContent(service) {
    const services = {
        'web-development': {
            title: 'Website Development',
            description: 'Custom websites built for speed and performance',
            features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Modern Technologies'],
            price: 'Starting at $'
        },
        'enterprise': {
            title: 'Enterprise Solutions',
            description: 'Scalable solutions for growing businesses',
            features: ['Custom Architecture', 'API Integration', 'Database Design', 'Scalable Infrastructure'],
            price: 'Starting at $4,999'
        },
        'marketing': {
            title: 'Marketing & SEO',
            description: 'Drive traffic and increase conversions',
            features: ['SEO Optimization', 'Content Strategy', 'Analytics', 'Conversion Optimization'],
            price: 'Starting at $999/month'
        }
    };
    
    const serviceInfo = services[service];
    
    return `
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); padding: 3rem; border-radius: 20px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; border: 2px solid #00ff88;">
            <button class="close-modal" style="background: none; border: none; color: #00ff88; font-size: 2rem; cursor: pointer; float: right;">&times;</button>
            <h2 style="color: #00ff88; margin-bottom: 1rem;">${serviceInfo.title}</h2>
            <p style="color: #ccc; margin-bottom: 2rem;">${serviceInfo.description}</p>
            <h3 style="color: #fff; margin-bottom: 1rem;">Features:</h3>
            <ul style="list-style: none; margin-bottom: 2rem;">
                ${serviceInfo.features.map(feature => `<li style="color: #ccc; margin-bottom: 0.5rem;">✓ ${feature}</li>`).join('')}
            </ul>
            <p style="color: #00ff88; font-size: 1.5rem; font-weight: bold; margin-bottom: 2rem;">${serviceInfo.price}</p>
            <button class="close-modal" style="background: linear-gradient(45deg, #00ff88, #00bbff); color: #000; border: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; width: 100%;">Get Started</button>
        </div>
    `;
}

// Contact Form Handler
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00ff88, #00bbff)' : 'linear-gradient(45deg, #ff6b6b, #ff8e53)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Portfolio Item Hover Effects
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    createParticles();
    
    // Add animation to sections
    const animateElements = document.querySelectorAll('.cta-card, .portfolio-item, .step, .service-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing Effect for Hero Tagline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const taglineElement = document.querySelector('.hero-tagline');
    if (taglineElement) {
        const originalText = taglineElement.textContent;
        typeWriter(taglineElement, originalText, 50);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const particles = document.getElementById('particles');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add active state to navigation based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: #00ff88 !important;
    }
`;
document.head.appendChild(activeStyle);