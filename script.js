// Navigation Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe portfolio card
const portfolioCard = document.querySelector('.portfolio-card');
if (portfolioCard) {
    portfolioCard.style.opacity = '0';
    portfolioCard.style.transform = 'scale(0.95)';
    portfolioCard.style.transition = 'all 0.6s ease';
    
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, observerOptions);
    
    portfolioObserver.observe(portfolioCard);
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Create mailto link
    const subject = `Inquiry from ${formData.name} - ${formData.service || 'General Inquiry'}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Service: ${formData.service || 'Not specified'}

Message:
${formData.message}
    `;
    
    const mailtoLink = `mailto:visualcrafts.uk@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show toast notification
    showToast('Opening your email client...', 'success');
});

// Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Prevent scroll when mobile menu is open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add entrance animations to section headers
document.querySelectorAll('.section-header').forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    header.style.transition = 'all 0.6s ease';
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    headerObserver.observe(header);
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero section
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            
            if (heroBackground && scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Add loading animation when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--purple-600)';
        }
    });
});

// Form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#d1d5db';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--purple-600)';
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = '#ef4444';
        showToast('Please enter a valid email address', 'error');
    }
});

// Prevent form submission on Enter key except in textarea
contactForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Add subtle animation to footer social icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

console.log('VisualCrafts Landing Page - Ready! 🎨');

(function () {
	// Update CSS variable --nav-offset so fragment navigation doesn't hide headings under fixed navbar
	function updateNavOffset() {
		var navbar = document.getElementById('navbar');
		var offset = 0;
		if (navbar) {
			offset = Math.round(navbar.getBoundingClientRect().height) || navbar.offsetHeight || 0;
		}
		var finalOffset = offset + 12;
		document.documentElement.style.setProperty('--nav-offset', finalOffset + 'px');

		var sections = document.querySelectorAll('.portfolio-section-item');
		sections.forEach(function (s) {
			s.setAttribute('data-offset-applied', 'true');
		});
	}

	// Branding carousel initializer
	function initBrandingCarousel() {
		var root = document.getElementById('branding-carousel');
		if (!root || root.dataset.carouselInit) return;
		root.dataset.carouselInit = '1';

		var track = root.querySelector('.carousel-track');
		var slides = Array.from(root.querySelectorAll('.carousel-slide'));
		var prevBtn = root.querySelector('.carousel-btn.prev');
		var nextBtn = root.querySelector('.carousel-btn.next');
		var dotsWrap = root.querySelector('.carousel-dots');
		var total = slides.length;
		var index = 0;
		var autoplayMs = 4000;
		var timer = null;

		// create dots
		slides.forEach(function (_, i) {
			var btn = document.createElement('button');
			btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
			btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
			btn.dataset.index = i;
			dotsWrap.appendChild(btn);
		});

		var dots = Array.from(dotsWrap.children);

		function goTo(i) {
			index = (i + total) % total;
			track.style.transform = 'translateX(' + (-index * 100) + '%)';
			dots.forEach(function (d, idx) {
				d.classList.toggle('active', idx === index);
			});
		}

		function next() { goTo(index + 1); }
		function prev() { goTo(index - 1); }

		if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetTimer(); });
		if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetTimer(); });

		dots.forEach(function (d) {
			d.addEventListener('click', function () {
				goTo(Number(this.dataset.index));
				resetTimer();
			});
		});

		// keyboard navigation
		root.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowRight') { next(); resetTimer(); }
			if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
		});
		root.tabIndex = 0;

		function startTimer() {
			if (autoplayMs > 0) {
				timer = setInterval(next, autoplayMs);
			}
		}
		function stopTimer() {
			if (timer) { clearInterval(timer); timer = null; }
		}
		function resetTimer() { stopTimer(); startTimer(); }

		root.addEventListener('mouseenter', stopTimer);
		root.addEventListener('mouseleave', startTimer);

		// init
		goTo(0);
		startTimer();
	}

	// Set footer year if element exists
	function updateYear() {
		var el = document.getElementById('current-year');
		if (el) el.textContent = new Date().getFullYear();
	}

	// Initialize portfolio related behaviors
	function initPortfolioFeatures() {
		updateNavOffset();
		// ensure accurate measurement after fonts/images load
		setTimeout(updateNavOffset, 250);
		initBrandingCarousel();
	}

	// Run initialization at several lifecycle points for robustness
	document.addEventListener('DOMContentLoaded', function () {
		updateYear();
		initPortfolioFeatures();
	});
	window.addEventListener('load', function () {
		initPortfolioFeatures();
		setTimeout(initPortfolioFeatures, 200);
	});
	window.addEventListener('resize', function () {
		updateNavOffset();
	});

	// Expose functions for debugging or manual invocation if needed
	window.__VC = window.__VC || {};
	window.__VC.updateNavOffset = updateNavOffset;
	window.__VC.initBrandingCarousel = initBrandingCarousel;
})();
