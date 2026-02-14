// Creative Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Loading screen management
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    // Simulate loading process with creative theme
    function startCreativeLoading() {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            body.classList.remove('loading');
            document.querySelector('.creative-main').classList.add('loaded');
            initCreativeAnimations();
            initFilterSystem();
        }, 3000); // 3 seconds for creative theme loading
    }
    
    // Initialize loading
    startCreativeLoading();
    
    // Creative background animation
    function createCreativeBackground() {
        const heroBg = document.querySelector('.hero-bg-animation');
        if (!heroBg) return;
        
        // Create floating bubbles
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement('div');
            bubble.style.position = 'absolute';
            bubble.style.width = Math.random() * 100 + 50 + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.background = `rgba(255, 255, 255, ${Math.random() * 0.05 + 0.02})`;
            bubble.style.borderRadius = '50%';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.top = Math.random() * 100 + '%';
            bubble.style.animation = `floatBubble ${Math.random() * 10 + 15}s infinite ease-in-out`;
            bubble.style.animationDelay = Math.random() * 5 + 's';
            heroBg.appendChild(bubble);
        }
    }
    
    // Initialize creative background
    createCreativeBackground();
    
    // Filter System
    function initFilterSystem() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const creativeItems = document.querySelectorAll('.creative-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                creativeItems.forEach((item, index) => {
                    const category = item.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    } else {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });
        
        // Initially show all items
        setTimeout(() => {
            creativeItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            });
        }, 500);
    }
    
    // Creative Modal Management
    const creativeModal = document.getElementById('creativeModal');
    const modalClose = document.querySelector('.creative-modal .modal-close');
    const projectBtns = document.querySelectorAll('.project-btn');
    
    // Creative project data
    const creativeProjectData = {
        'Brand Revolution': {
            title: 'Brand Revolution',
            description: 'A complete brand identity transformation that revitalized a traditional company into a modern, digital-first brand. This comprehensive project included logo redesign, color palette development, typography system, brand guidelines, and marketing collateral. The new identity increased brand recognition by 200% and customer engagement by 150%.',
            category: 'Branding',
            duration: '3 Months',
            tools: 'Adobe Creative Suite, Figma, Illustrator',
            images: ['brand1.jpg', 'brand2.jpg', 'brand3.jpg'],
            liveUrl: 'https://example.com/brand-revolution',
            behanceUrl: 'https://behance.net/example/brand-revolution'
        },
        'Minimal Banking App': {
            title: 'Minimal Banking App',
            description: 'A minimalist mobile banking application that simplifies financial management through clean design and intuitive user experience. Features include real-time balance tracking, instant transfers, bill payments, and investment management. The design focuses on accessibility, security, and user trust through transparent interfaces.',
            category: 'UI/UX Design',
            duration: '2 Months',
            tools: 'Figma, Adobe XD, Principle',
            images: ['banking1.jpg', 'banking2.jpg', 'banking3.jpg'],
            liveUrl: 'https://example.com/minimal-banking',
            behanceUrl: 'https://behance.net/example/minimal-banking'
        },
        'Motion Studio': {
            title: 'Motion Studio',
            description: 'An interactive 3D motion graphics showcase demonstrating advanced animation techniques and WebGL capabilities. This project features particle systems, physics simulations, and real-time rendering. Users can interact with various elements, creating unique visual experiences through gesture controls and sound synchronization.',
            category: 'Animation',
            duration: '4 Months',
            tools: 'Blender, Three.js, WebGL, After Effects',
            images: ['motion1.jpg', 'motion2.jpg', 'motion3.jpg'],
            liveUrl: 'https://example.com/motion-studio',
            behanceUrl: 'https://behance.net/example/motion-studio'
        },
        'Game Portal': {
            title: 'Game Portal',
            description: 'An immersive gaming platform that brings together multiple gaming experiences in a unified interface. Features include game discovery, social integration, achievement systems, and live streaming capabilities. The design emphasizes community engagement and competitive gaming with real-time leaderboards and tournaments.',
            category: 'Interactive',
            duration: '5 Months',
            tools: 'Unity, WebGL, Socket.io, React',
            images: ['game1.jpg', 'game2.jpg', 'game3.jpg'],
            liveUrl: 'https://example.com/game-portal',
            behanceUrl: 'https://behance.net/example/game-portal'
        },
        'Eco Lifestyle': {
            title: 'Eco Lifestyle',
            description: 'A sustainable brand identity system for an eco-conscious lifestyle company. The project encompasses logo design, packaging, website, and marketing materials. The visual language reflects environmental values through organic shapes, natural color palettes, and sustainable material suggestions.',
            category: 'Branding',
            duration: '2.5 Months',
            tools: 'Adobe Creative Suite, Figma, Eco Design Tools',
            images: ['eco1.jpg', 'eco2.jpg', 'eco3.jpg'],
            liveUrl: 'https://example.com/eco-lifestyle',
            behanceUrl: 'https://behance.net/example/eco-lifestyle'
        },
        'Travel Discovery': {
            title: 'Travel Discovery',
            description: 'A beautifully designed travel planning application that inspires wanderlust through stunning visuals and personalized recommendations. Features include destination discovery, itinerary planning, booking integration, and social sharing. The design emphasizes visual storytelling and user engagement.',
            category: 'UI/UX Design',
            duration: '3 Months',
            tools: 'Sketch, InVision, Framer',
            images: ['travel1.jpg', 'travel2.jpg', 'travel3.jpg'],
            liveUrl: 'https://example.com/travel-discovery',
            behanceUrl: 'https://behance.net/example/travel-discovery'
        }
    };
    
    // Open creative modal
    function openCreativeModal(projectName) {
        const project = creativeProjectData[projectName];
        if (!project) return;
        
        // Update modal content
        document.getElementById('creativeProjectTitle').textContent = project.title;
        document.getElementById('creativeProjectDescription').textContent = project.description;
        document.getElementById('projectCategory').textContent = project.category;
        document.getElementById('projectDuration').textContent = project.duration;
        document.getElementById('projectTools').textContent = project.tools;
        
        // Update gallery images
        const mainImage = document.getElementById('mainImage');
        const thumbs = document.querySelectorAll('.gallery-thumbs .thumb');
        
        // Use placeholder images for demo
        mainImage.src = `https://picsum.photos/seed/${projectName}/800/400.jpg`;
        thumbs.forEach((thumb, index) => {
            thumb.src = `https://picsum.photos/seed/${projectName}${index}/150/100.jpg`;
            thumb.onclick = () => {
                mainImage.src = thumb.src.replace('/150/100', '/800/400');
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
        });
        thumbs[0].classList.add('active');
        
        // Update project links
        const projectLinks = document.querySelectorAll('.creative-modal .project-link');
        projectLinks[0].href = project.liveUrl;
        projectLinks[1].href = project.behanceUrl;
        
        // Show modal
        creativeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeCreativeModal() {
        creativeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Add click handlers to project buttons
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectTitle = this.closest('.overlay-content').querySelector('h3').textContent;
            openCreativeModal(projectTitle);
        });
    });
    
    // Close modal handlers
    modalClose?.addEventListener('click', closeCreativeModal);
    creativeModal?.addEventListener('click', function(e) {
        if (e.target === creativeModal) {
            closeCreativeModal();
        }
    });
    
    // Mobile Navigation
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
    
    // Creative animations on scroll
    function initCreativeAnimations() {
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
        
        // Observe process steps
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(50px)';
            step.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            observer.observe(step);
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroBg = document.querySelector('.hero-bg-animation');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Dynamic hover effects for creative cards
    const creativeCards = document.querySelectorAll('.creative-card');
    
    creativeCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.transform = 'perspective(1000px) rotateY(' + (x - rect.width/2) / 20 + 'deg) rotateX(' + -(y - rect.height/2) / 20 + 'deg) translateY(-10px)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.transform = 'perspective(1000px) rotateY(' + (x - rect.width/2) / 20 + 'deg) rotateX(' + -(y - rect.height/2) / 20 + 'deg) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (creativeModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeCreativeModal();
            }
        }
    });
    
    // Smooth page transitions
    function smoothCreativeTransition(targetUrl) {
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateX(-50px)';
        document.body.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 400);
    }
    
    // Add smooth transitions to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                e.preventDefault();
                smoothCreativeTransition(href);
            }
        });
    });
    
    // Add typing effect to hero text
    function typeHeroText() {
        const heroText = document.querySelector('.hero-text h1');
        if (!heroText) return;
        
        const originalText = heroText.innerHTML;
        heroText.innerHTML = '';
        let currentIndex = 0;
        
        function typeChar() {
            if (currentIndex < originalText.length) {
                if (originalText[currentIndex] === '<') {
                    // Handle HTML tags
                    const tagEnd = originalText.indexOf('>', currentIndex);
                    heroText.innerHTML += originalText.substring(currentIndex, tagEnd + 1);
                    currentIndex = tagEnd + 1;
                } else {
                    heroText.innerHTML += originalText[currentIndex];
                    currentIndex++;
                }
                setTimeout(typeChar, 50);
            }
        }
        
        setTimeout(typeChar, 1000);
    }
    
    // Initialize typing effect
    setTimeout(typeHeroText, 1000);
    
    // Add floating animation to stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.animation = `float 3s ${index * 0.5}s infinite ease-in-out`;
    });
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyle);
});