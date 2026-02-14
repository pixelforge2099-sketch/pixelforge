// Portfolio Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Loading screen management
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    // Simulate loading process
    function startLoading() {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            body.classList.remove('loading');
            initPortfolioAnimations();
        }, 2500); // 2.5 seconds loading time
    }
    
    // Initialize loading
    startLoading();
    
    // Particle animation for portfolio
    function createPortfolioParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(0, 255, 136, ${Math.random() * 0.3 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.pointerEvents = 'none';
            
            // Random animation
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 5;
            particle.style.animation = `float ${duration}s ${delay}s linear infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0% { 
                transform: translateY(0) translateX(0); 
                opacity: 0; 
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(floatStyle);
    
    // Initialize particles
    createPortfolioParticles();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Portfolio Modal Management
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const viewProjectLinks = document.querySelectorAll('.view-project');
    
    // Project data
    const projectData = {
        'TechStart': {
            title: 'TechStart',
            description: 'A modern startup landing page built with cutting-edge technologies. This project showcases our ability to create fast, responsive, and visually stunning websites that convert visitors into customers. The design emphasizes clean aesthetics, smooth animations, and optimal user experience across all devices.',
            technologies: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'AWS'],
            liveUrl: 'https://example.com/techstart',
            githubUrl: 'https://github.com/example/techstart'
        },
        'EcoStore': {
            title: 'EcoStore',
            description: 'A full-featured e-commerce platform for sustainable products. This comprehensive solution includes product catalog, shopping cart, payment integration, order management, and admin dashboard. Built with scalability and performance in mind to handle high traffic volumes.',
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Stripe'],
            liveUrl: 'https://example.com/estore',
            githubUrl: 'https://github.com/example/ecostore'
        },
        'FinanceHub': {
            title: 'FinanceHub',
            description: 'A sophisticated financial dashboard for investment tracking and analysis. This platform provides real-time market data, portfolio management, financial analytics, and predictive insights. Built with enterprise-grade security and performance optimization.',
            technologies: ['Angular', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes'],
            liveUrl: 'https://example.com/financehub',
            githubUrl: 'https://github.com/example/financehub'
        },
        'HealthPlus': {
            title: 'HealthPlus',
            description: 'A comprehensive healthcare portal connecting patients with medical professionals. Features include appointment scheduling, telemedicine, medical records management, prescription tracking, and health monitoring tools with HIPAA compliance.',
            technologies: ['React', 'Express.js', 'Redis', 'WebRTC', 'Socket.io'],
            liveUrl: 'https://example.com/healthplus',
            githubUrl: 'https://github.com/example/healthplus'
        },
        'EduLearn': {
            title: 'EduLearn',
            description: 'An innovative online education platform offering interactive courses, live sessions, and progress tracking. Features include video streaming, interactive quizzes, assignment submission, peer collaboration, and AI-powered learning recommendations.',
            technologies: ['Next.js', 'Django', 'AWS', 'WebRTC', 'TensorFlow'],
            liveUrl: 'https://example.com/edulearn',
            githubUrl: 'https://github.com/example/edulearn'
        },
        'FoodDelight': {
            title: 'FoodDelight',
            description: 'A modern restaurant website with online ordering system. Features include menu browsing, real-time order tracking, table reservations, customer reviews, and integration with food delivery services for seamless dining experience.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Firebase', 'Maps API'],
            liveUrl: 'https://example.com/fooddelight',
            githubUrl: 'https://github.com/example/fooddelight'
        },
        'SportZone': {
            title: 'SportZone',
            description: 'A sports e-commerce platform specializing in athletic gear and equipment. Features include product customization, size recommendations, inventory management, seasonal campaigns, and integration with fitness tracking applications.',
            technologies: ['Shopify', 'React', 'GraphQL', 'Shopify Plus', 'Klaviyo'],
            liveUrl: 'https://example.com/sportzone',
            githubUrl: 'https://github.com/example/sportzone'
        },
        'CodeAcademy': {
            title: 'CodeAcademy',
            description: 'An interactive coding education platform with hands-on learning. Features include live code editor, automatic grading, peer code review, mentorship programs, and gamified learning paths to make programming education engaging.',
            technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Docker', 'Monaco Editor'],
            liveUrl: 'https://example.com/codeacademy',
            githubUrl: 'https://github.com/example/codeacademy'
        }
    };
    
    // Open modal with project details
    function openProjectModal(projectName) {
        const project = projectData[projectName];
        if (!project) return;
        
        // Update modal content
        document.getElementById('projectTitle').textContent = project.title;
        document.getElementById('projectDescription').textContent = project.description;
        
        // Update tech tags
        const techTagsContainer = document.getElementById('techTags');
        techTagsContainer.innerHTML = project.technologies.map(tech => 
            `<span>${tech}</span>`
        ).join('');
        
        // Update project links
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks[0].href = project.liveUrl;
        projectLinks[1].href = project.githubUrl;
        
        // Show modal with animation
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Add click handlers to project links
    viewProjectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectTitle = this.closest('.portfolio-content').querySelector('h3').textContent;
            openProjectModal(projectTitle);
        });
    });
    
    // Close modal handlers
    modalClose?.addEventListener('click', closeProjectModal);
    projectModal?.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
    
    // Portfolio item animations on scroll
    function initPortfolioAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add stagger effect for portfolio items
                    const portfolioItems = document.querySelectorAll('.portfolio-item');
                    portfolioItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }
    
    // Smooth page transitions for navigation
    function smoothPageTransition(targetUrl) {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateX(-50px)';
        document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 300);
    }
    
    // Add smooth transitions to navigation links that go to other pages
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                e.preventDefault();
                smoothPageTransition(href);
            }
        });
    });
    
    // Dynamic project hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add unique hover animation
            this.style.transform = 'translateY(-15px) scale(1.03) rotateZ(1deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 255, 136, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.portfolio-hero .hero-content');
        const particles = document.getElementById('particles');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
        
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (projectModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                // Navigate between projects (implementation needed)
                console.log('Navigate to previous/next project');
            }
        }
    });
    
    // Initialize page with entrance animation
    document.body.classList.add('page-transition-enter');
    
    // Add performance monitoring
    if (window.performance) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio page loaded in ${loadTime}ms`);
    }
});