class PortfolioManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupProjectFilter();
        this.setupContactForm();
        this.setupScrollEffects();
        this.setupMobileMenu();
    }

    // Navigation functionality
    setupNavigation() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link, .scroll-indicator');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    this.scrollToSection(targetId);
                }
            });
        });

        // Update active navigation on scroll
        this.updateActiveNav();
        
        // Navbar background on scroll
        this.setupNavbarScroll();
    }

    scrollToSection(sectionId) {
        const targetElement = document.querySelector(sectionId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupNavbarScroll() {
        const navbar = document.getElementById('mainNav');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
    }

    // Project filtering functionality
    setupProjectFilter() {
        const filterButtons = document.querySelectorAll('.btn-filter');
        const projectItems = document.querySelectorAll('.project-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Get filter value
                const filterValue = button.getAttribute('data-filter');

                // Filter projects
                projectItems.forEach((item, index) => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        // Stagger animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact form functionality
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(contactForm);
            });
        }
    }

    async handleContactSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = `
            <div class="loading me-2"></div>
            Sending...
        `;
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual submission logic)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            submitButton.innerHTML = `
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" class="me-2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                Message Sent!
            `;
            
            // Show success notification
            this.showNotification('Message sent successfully! Thank you for reaching out.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Show error state
            submitButton.innerHTML = `
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" class="me-2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
                Failed to Send
            `;
            
            this.showNotification('Failed to send message. Please try again.', 'error');
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 3000);
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            border-left: 4px solid ${type === 'success' ? 'var(--primary-color)' : '#ef4444'};
            box-shadow: var(--shadow-elegant);
            z-index: 10000;
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
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Scroll effects
    setupScrollEffects() {
        // Scroll indicator bounce animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.scrollToSection('#skills');
            });
        }

        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', () => {
            if (scrollIndicator && window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else if (scrollIndicator) {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });

        // Parallax effect for hero background
        this.setupParallaxScrolling();
    }

    setupParallaxScrolling() {
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                // Only apply parallax when hero is visible
                if (scrolled < window.innerHeight) {
                    const heroBg = heroSection.querySelector('.hero-bg');
                    if (heroBg) {
                        heroBg.style.transform = `translateY(${rate}px)`;
                    }
                }
            });
        }
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.nav-link');

        // Close mobile menu when nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const isNavbarContent = navbarToggler.contains(e.target) || 
                                  navbarCollapse.contains(e.target);
            
            if (!isNavbarContent && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Theme toggle functionality (optional)
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        // Set initial theme
        document.body.classList.add('theme-dark');
        
        // Create theme toggle button (optional)
        this.createThemeToggle();
    }

    createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            font-size: 1.2rem;
        `;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Uncomment to add theme toggle
        // document.body.appendChild(themeToggle);
    }

    toggleTheme() {
        if (this.currentTheme === 'dark') {
            this.currentTheme = 'light';
            document.body.classList.remove('theme-dark');
            document.body.classList.add('theme-light');
        } else {
            this.currentTheme = 'dark';
            document.body.classList.remove('theme-light');
            document.body.classList.add('theme-dark');
        }
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
                console.log('Page reloaded');
            }
            
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });

        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                    // Scroll performance monitoring can be added here
                }, 100);
            }
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio functionality
    window.portfolioManager = new PortfolioManager();
    
    // Initialize optional managers
    window.themeManager = new ThemeManager();
    window.performanceMonitor = new PerformanceMonitor();
    
    console.log('Allan C. Godinez Portfolio loaded successfully! 🚀');
});

// Global scroll to section function
window.scrollToSection = function(sectionId) {
    if (window.portfolioManager) {
        window.portfolioManager.scrollToSection(sectionId);
    }
};

// Export classes for potential external use
window.PortfolioManager = PortfolioManager;
window.ThemeManager = ThemeManager;
window.PerformanceMonitor = PerformanceMonitor;

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill-progress");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.style.width = target.getAttribute("data-width") + "%";
        observer.unobserve(target); // animate only once
      }
    });
  }, { threshold: 0.3 });

  skills.forEach(skill => observer.observe(skill));
});

