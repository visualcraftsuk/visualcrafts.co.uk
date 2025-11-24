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
	// small helpers
	function q(sel, ctx) { return (ctx || document).querySelector(sel); }
	function qa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

	/* ====== Nav offset & year ====== */
	function updateNavOffset() {
		try {
			var navbar = document.getElementById('navbar');
			var offset = 0;
			if (navbar) offset = Math.round(navbar.getBoundingClientRect().height) || navbar.offsetHeight || 0;
			var finalOffset = offset + 12;
			document.documentElement.style.setProperty('--nav-offset', finalOffset + 'px');

			qa('.portfolio-section-item').forEach(function (s) {
				if (s) s.setAttribute('data-offset-applied', 'true');
			});
		} catch (err) {
			console.error('updateNavOffset error', err);
		}
	}
	function updateYear() {
		try {
			var el = document.getElementById('current-year');
			if (el) el.textContent = new Date().getFullYear();
		} catch (err) {
			console.error('updateYear error', err);
		}
	}

	/* ====== Load image list from manifest or directory (best-effort) ====== */
	// try manifest.json and directory listing, fallback to probing common filenames
	async function fetchImageListFromPath(dirPath) {
		// normalize path to ensure trailing slash
		if (!dirPath.endsWith('/')) dirPath = dirPath + '/';
		console.debug('[branding] trying manifest at', dirPath + 'manifest.json');

		// helper to clean comments from a JSON-like file
		function cleanJsonText(text) {
			// remove // single-line comments and /* */ block comments
			return text.replace(/\/\/.*$/mg, '').replace(/\/\*[\s\S]*?\*\//g, '');
		}

		// 1) Try manifest.json (tolerant parse)
		try {
			const resp = await fetch(dirPath + 'manifest.json', { cache: 'no-store' });
			if (resp.ok) {
				const txt = await resp.text();
				try {
					const cleaned = cleanJsonText(txt).trim();
					const json = JSON.parse(cleaned);
					if (Array.isArray(json) && json.length) {
						console.debug('[branding] manifest.json parsed, entries:', json);
						return json.map(p => dirPath + p);
					}
				} catch (err) {
					console.debug('[branding] manifest.json parse failed for', dirPath + 'manifest.json', err);
				}
			} else {
				console.debug('[branding] manifest.json not found at', dirPath + 'manifest.json', 'status', resp.status);
			}
		} catch (err) {
			console.debug('[branding] manifest fetch error for', dirPath + 'manifest.json', err);
		}

		// 2) Try directory listing HTML (if server returns index)
		try {
			console.debug('[branding] trying directory listing for', dirPath);
			const resp = await fetch(dirPath, { cache: 'no-store' });
			if (resp.ok) {
				const text = await resp.text();
				const doc = new DOMParser().parseFromString(text, 'text/html');
				const anchors = Array.from(doc.querySelectorAll('a[href]'));
				const exts = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
				const imgs = anchors
					.map(a => a.getAttribute('href'))
					.filter(h => h && exts.some(e => h.toLowerCase().endsWith(e)))
					.map(h => (h.startsWith('http') ? h : dirPath + h));
				if (imgs.length) {
					console.debug('[branding] directory listing found images:', imgs);
					return imgs;
				}
			} else {
				console.debug('[branding] directory listing not available for', dirPath, 'status', resp.status);
			}
		} catch (err) {
			console.debug('[branding] directory listing fetch error for', dirPath, err);
		}

		// 3) Fallback: return null to let caller probe other candidates
		return null;
	}

	async function loadBrandingImages() {
		try {
			// try absolute root path first and then relative variants
			const candidates = ['/images/branding/', 'images/branding/', '/branding/', 'branding/', './images/branding/', './branding/'];
			let list = null;
			for (const p of candidates) {
				console.debug('[branding] checking path candidate:', p);
				list = await fetchImageListFromPath(p);
				if (list && list.length) {
					console.debug('[branding] images found in', p, list);
					// normalize urls (leave as-is)
					list = list.map(u => u);
					break;
				}
			}

			const root = document.getElementById('branding-carousel');
			if (!root) {
				console.debug('[branding] no #branding-carousel element found in DOM');
				return false;
			}
			let track = root.querySelector('.carousel-track');
			if (!track) {
				track = document.createElement('div');
				track.className = 'carousel-track';
				root.insertBefore(track, root.firstChild);
			}

			// if we found images, populate carousel
			if (list && list.length) {
				track.innerHTML = '';
				list.forEach(src => {
					const slide = document.createElement('div');
					slide.className = 'carousel-slide';
					const img = document.createElement('img');
					img.loading = 'lazy';
					img.src = src;
					img.alt = 'Branding image';
					slide.appendChild(img);
					track.appendChild(slide);
				});
				// cleanup any previous instance to allow re-init
				if (root._carouselInstance && typeof root._carouselInstance.cleanup === 'function') {
					try { root._carouselInstance.cleanup(); } catch (e) { /* ignore */ }
					delete root._carouselInstance;
				}
				console.debug('[branding] carousel populated with', list.length, 'slides');
				return true;
			}

			console.debug('[branding] no images discovered in any candidate path');
		} catch (err) {
			console.error('loadBrandingImages error', err);
		}
		return false;
	}

	/* ====== Robust Carousel initializer with cleanup ====== */
	function initBrandingCarousel() {
		try {
			var root = document.getElementById('branding-carousel');
			if (!root) return;
			// cleanup existing
			if (root._carouselInstance && typeof root._carouselInstance.cleanup === 'function') {
				try { root._carouselInstance.cleanup(); } catch(e) { /* ignore */ }
				delete root._carouselInstance;
			}

			var track = root.querySelector('.carousel-track');
			if (!track) return;
			var slides = qa('.carousel-slide', track);
			if (!slides.length) return;

			var prevBtn = root.querySelector('.carousel-btn.prev');
			var nextBtn = root.querySelector('.carousel-btn.next');
			if (prevBtn) prevBtn.type = 'button';
			if (nextBtn) nextBtn.type = 'button';

			var dotsWrap = root.querySelector('.carousel-dots');
			if (!dotsWrap) {
				dotsWrap = document.createElement('div');
				dotsWrap.className = 'carousel-dots';
				dotsWrap.setAttribute('role','tablist');
				root.appendChild(dotsWrap);
			}
			dotsWrap.innerHTML = '';

			var total = slides.length;
			var index = 0;
			var autoplayMs = 4000;
			var timer = null;
			var listeners = [];

			// build dots
			for (var i = 0; i < total; i++) {
				var btn = document.createElement('button');
				btn.type = 'button';
				btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
				btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
				btn.dataset.index = i;
				dotsWrap.appendChild(btn);
			}
			var dots = qa('.carousel-dot', dotsWrap);

			function goTo(i) {
				index = (i + total) % total;
				if (track) track.style.transform = 'translateX(' + (-index * 100) + '%)';
				dots.forEach(function (d, idx) { d.classList.toggle('active', idx === index); });
			}
			function next() { goTo(index + 1); }
			function prev() { goTo(index - 1); }

			if (nextBtn) {
				var fnNext = function (e) { if (e) e.preventDefault(); next(); resetTimer(); };
				nextBtn.addEventListener('click', fnNext);
				listeners.push({el: nextBtn, ev:'click', fn: fnNext});
			}
			if (prevBtn) {
				var fnPrev = function (e) { if (e) e.preventDefault(); prev(); resetTimer(); };
				prevBtn.addEventListener('click', fnPrev);
				listeners.push({el: prevBtn, ev:'click', fn: fnPrev});
			}

			dots.forEach(function (d) {
				var fnDot = function (e) { if (e) e.preventDefault(); goTo(Number(this.dataset.index)); resetTimer(); };
				d.addEventListener('click', fnDot);
				listeners.push({el: d, ev:'click', fn: fnDot});
			});

			slides.forEach(function (slide) {
				var img = q('img', slide);
				if (!img) return;
				var fnImg = function (e) {
					if (e && e.target && e.target.closest && e.target.closest('a')) return;
					next(); resetTimer();
				};
				img.addEventListener('click', fnImg);
				listeners.push({el: img, ev:'click', fn: fnImg});
			});

			var fnKey = function (e) {
				if (e.key === 'ArrowRight') { next(); resetTimer(); }
				if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
			};
			root.addEventListener('keydown', fnKey);
			listeners.push({el: root, ev:'keydown', fn: fnKey});
			root.tabIndex = 0;

			function startTimer() { if (autoplayMs > 0) timer = setInterval(next, autoplayMs); }
			function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
			function resetTimer() { stopTimer(); startTimer(); }

			var fnEnter = function () { stopTimer(); };
			var fnLeave = function () { startTimer(); };
			root.addEventListener('mouseenter', fnEnter);
			root.addEventListener('mouseleave', fnLeave);
			root.addEventListener('focusin', fnEnter);
			root.addEventListener('focusout', fnLeave);
			listeners.push({el: root, ev:'mouseenter', fn: fnEnter});
			listeners.push({el: root, ev:'mouseleave', fn: fnLeave});
			listeners.push({el: root, ev:'focusin', fn: fnEnter});
			listeners.push({el: root, ev:'focusout', fn: fnLeave});

			root._carouselInstance = {
				cleanup: function () {
					try { stopTimer(); } catch(e) {}
					listeners.forEach(function(l) {
						try { l.el.removeEventListener(l.ev, l.fn); } catch (e) {}
					});
					try { root.removeAttribute('tabindex'); } catch(e) {}
				},
				next: next, prev: prev, goTo: goTo
			};

			goTo(0);
			startTimer();
		} catch (err) {
			console.error('initBrandingCarousel error', err);
		}
	}

	/* ====== Mailjet form handler (guarded) ====== */
	function initMailjetForm() {
		try {
			var submitBtn = document.getElementById('mailjet-submit');
			if (!submitBtn) return;
			submitBtn.addEventListener('click', function (e) {
				e.preventDefault();
				var form = document.getElementById('mailjet-form');
				if (!form) return;
				var name = (document.getElementById('mj-name') || {}).value || '';
				var email = (document.getElementById('mj-email') || {}).value || '';
				var phone = (document.getElementById('mj-phone') || {}).value || '';
				var service = (document.getElementById('mj-service') || {}).value || '';
				var message = (document.getElementById('mj-message') || {}).value || '';

				if (!name.trim() || !email.trim() || !message.trim()) {
					alert("Please fill in all required fields.");
					return;
				}

				// Do not expose credentials in frontend in production.
				const apiKey = '17bdd5025a18b80eb3ab31db1cd490f1';
				const apiSecret = 'd8276a346133e548dae079ce04d0b0cf';

				fetch('https://api.mailjet.com/v3.1/send', {
					method: 'POST',
					headers: {
						'Authorization': 'Basic ' + btoa(apiKey + ':' + apiSecret),
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						Messages: [
							{
								From: { Email: "visualcrafts.uk@gmail.com", Name: "VisualCrafts" },
								To: [{ Email: "visualcrafts.uk@gmail.com", Name: "VisualCrafts" }],
								Subject: "Inquiry from " + name,
								TextPart: "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nService: " + service + "\nMessage:\n" + message,
								HTMLPart: "<h3>Inquiry from " + name + "</h3><p>Email: " + email + "</p><p>Phone: " + phone + "</p><p>Service: " + service + "</p><p>Message:<br>" + message + "</p>"
							}
						]
					})
				})
				.then(response => response.json())
				.then(data => {
					if (data && data.Messages && data.Messages[0] && data.Messages[0].Status === "success") {
						alert("Inquiry sent successfully!");
						form.reset();
					} else {
						alert("Failed to send inquiry.");
					}
				})
				.catch(error => {
					console.error('Mailjet send error', error);
					alert("Error sending inquiry.");
				});
			});
		} catch (err) {
			console.error('initMailjetForm error', err);
		}
	}

	/* ====== Generic carousel image loader/initializer ====== */

    // Hardcoded social images
const socialImages = [
    '/images/social/social1.jpg',
    '/images/social/social2.jpg',
    '/images/social/social3.jpg',
    '/images/social/social4.jpg'
];

function loadSimpleCarousel(rootId, images) {
    const root = document.getElementById(rootId);
    if (!root) return;

    const track = root.querySelector('.carousel-track');
    if (!track) return;

    track.innerHTML = '';

    images.forEach(src => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${src}" alt="">`;
        track.appendChild(slide);
    });

    initCarousel(rootId);
}

loadSimpleCarousel('social-carousel', socialImages);
/**
	 * loadCarouselImages(rootId, candidates)
	 * - rootId: id of carousel container (e.g. 'branding-carousel', 'social-carousel')
	 * - candidates: array of directory path candidates to check (trailing slash optional)
	 *
	 * Populates .carousel-track inside the root with .carousel-slide elements when images are found.
	 */
	async function loadCarouselImages(rootId, candidates) {
		try {
			const root = document.getElementById(rootId);
			if (!root) {
				console.debug('[carousel] root not found:', rootId);
				return false;
			}

			// ensure track element exists
			let track = root.querySelector('.carousel-track');
			if (!track) {
				track = document.createElement('div');
				track.className = 'carousel-track';
				root.insertBefore(track, root.firstChild);
			}

			// try each candidate path
			let list = null;
			for (const p of candidates) {
				console.debug('[carousel] checking path', p, 'for', rootId);
				list = await fetchImageListFromPath(p);
				if (list && list.length) {
					console.debug('[carousel] images found for', rootId, 'in', p, list);
					break;
				}
			}

			if (!list || !list.length) {
				console.debug('[carousel] no images discovered for', rootId);
				return false;
			}

			// populate slides
			track.innerHTML = '';
			list.forEach(src => {
				const slide = document.createElement('div');
				slide.className = 'carousel-slide';
				const img = document.createElement('img');
				img.loading = 'lazy';
				img.src = src;
				img.alt = '';
				slide.appendChild(img);
				track.appendChild(slide);
			});

			// cleanup any previous carousel instance to allow re-init
			if (root._carouselInstance && typeof root._carouselInstance.cleanup === 'function') {
				try { root._carouselInstance.cleanup(); } catch (e) { /* ignore */ }
				delete root._carouselInstance;
			}

			return true;
		} catch (err) {
			console.error('loadCarouselImages error for', rootId, err);
			return false;
		}
	}

	/**
	 * initCarousel(rootId)
	 * - initialises carousel behaviour for a carousel with given id
	 * - idempotent and stores cleanup on root._carouselInstance
	 */
	function initCarousel(rootId) {
		try {
			const root = document.getElementById(rootId);
			if (!root) return;

			// cleanup existing instance
			if (root._carouselInstance && typeof root._carouselInstance.cleanup === 'function') {
				try { root._carouselInstance.cleanup(); } catch (e) {}
				delete root._carouselInstance;
			}

			const track = root.querySelector('.carousel-track');
			if (!track) return;
			const slides = Array.from(track.querySelectorAll('.carousel-slide'));
			if (!slides.length) return;

			const prevBtn = root.querySelector('.carousel-btn.prev');
			const nextBtn = root.querySelector('.carousel-btn.next');
			if (prevBtn) prevBtn.type = 'button';
			if (nextBtn) nextBtn.type = 'button';

			let dotsWrap = root.querySelector('.carousel-dots');
			if (!dotsWrap) {
				dotsWrap = document.createElement('div');
				dotsWrap.className = 'carousel-dots';
				dotsWrap.setAttribute('role', 'tablist');
				root.appendChild(dotsWrap);
			}
			dotsWrap.innerHTML = '';

			const total = slides.length;
			let index = 0;
			const autoplayMs = 4000;
			let timer = null;
			const listeners = [];

			// build dots
			for (let i = 0; i < total; i++) {
				const btn = document.createElement('button');
				btn.type = 'button';
				btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
				btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
				btn.dataset.index = i;
				dotsWrap.appendChild(btn);
			}
			const dots = Array.from(dotsWrap.querySelectorAll('.carousel-dot'));

			function goTo(i) {
				index = (i + total) % total;
				if (track) track.style.transform = 'translateX(' + (-index * 100) + '%)';
				dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
			}
			function next() { goTo(index + 1); }
			function prev() { goTo(index - 1); }

			// attach listeners
			if (nextBtn) {
				const fnNext = (e) => { if (e) e.preventDefault(); next(); resetTimer(); };
				nextBtn.addEventListener('click', fnNext);
				listeners.push({ el: nextBtn, ev: 'click', fn: fnNext });
			}
			if (prevBtn) {
				const fnPrev = (e) => { if (e) e.preventDefault(); prev(); resetTimer(); };
				prevBtn.addEventListener('click', fnPrev);
				listeners.push({ el: prevBtn, ev: 'click', fn: fnPrev });
			}

			dots.forEach(d => {
				const fnDot = function (e) { if (e) e.preventDefault(); goTo(Number(this.dataset.index)); resetTimer(); };
				d.addEventListener('click', fnDot);
				listeners.push({ el: d, ev: 'click', fn: fnDot });
			});

			// image click advances slide (unless inside an anchor)
			slides.forEach(slide => {
				const img = slide.querySelector('img');
				if (!img) return;
				const fnImg = (e) => {
					if (e && e.target && e.target.closest && e.target.closest('a')) return;
					next(); resetTimer();
				};
				img.addEventListener('click', fnImg);
				listeners.push({ el: img, ev: 'click', fn: fnImg });
			});

			// keyboard navigation
			const fnKey = (e) => {
				if (e.key === 'ArrowRight') { next(); resetTimer(); }
				if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
			};
			root.addEventListener('keydown', fnKey);
			listeners.push({ el: root, ev: 'keydown', fn: fnKey });
			root.tabIndex = 0;

			function startTimer() { if (autoplayMs > 0) timer = setInterval(next, autoplayMs); }
			function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
			function resetTimer() { stopTimer(); startTimer(); }

			// pause on hover/focus
			const fnEnter = () => stopTimer();
			const fnLeave = () => startTimer();
			root.addEventListener('mouseenter', fnEnter);
			root.addEventListener('mouseleave', fnLeave);
			root.addEventListener('focusin', fnEnter);
			root.addEventListener('focusout', fnLeave);
			listeners.push({ el: root, ev: 'mouseenter', fn: fnEnter });
			listeners.push({ el: root, ev: 'mouseleave', fn: fnLeave });
			listeners.push({ el: root, ev: 'focusin', fn: fnEnter });
			listeners.push({ el: root, ev: 'focusout', fn: fnLeave });

			// store cleanup
			root._carouselInstance = {
				cleanup() {
					try { stopTimer(); } catch (e) {}
					listeners.forEach(l => {
						try { l.el.removeEventListener(l.ev, l.fn); } catch (e) {}
					});
					try { root.removeAttribute('tabindex'); } catch (e) {}
				},
				next, prev, goTo
			};

			// init
			goTo(0);
			startTimer();
		} catch (err) {
			console.error('initCarousel error for', rootId, err);
		}
	}

	/* ====== Update init flow: load and init both branding and social carousels ====== */

	function initPortfolioFeatures() {
		// existing nav offset logic
		try { updateNavOffset(); } catch (e) {}
		setTimeout(() => { try { updateNavOffset(); } catch (e) {} }, 250);

		// load and init carousels in parallel
		const brandingCandidates = ['/images/branding/', 'images/branding/', '/branding/', 'branding/'];
		const socialCandidates = ['/images/social/', 'images/social/', '/social/', 'social/', '/images/branding/', 'images/branding/'];

		// attempt to load branding and social images then init
		Promise.all([
			loadCarouselImages('branding-carousel', brandingCandidates),
			loadCarouselImages('social-carousel', socialCandidates)
		]).then(() => {
			try { initCarousel('branding-carousel'); } catch (e) {}
			try { initCarousel('social-carousel'); } catch (e) {}
		}).catch(err => {
			console.debug('initPortfolioFeatures: carousel load error', err);
			try { initCarousel('branding-carousel'); } catch (e) {}
			try { initCarousel('social-carousel'); } catch (e) {}
		});
	}

	/* ====== Global init hooks ====== */
	document.addEventListener('DOMContentLoaded', function () {
		try {
			updateYear();
			initPortfolioFeatures();
			initMailjetForm();
            loadSimpleCarousel('social-carousel', socialImages);
		} catch (err) {
			console.error('DOMContentLoaded handler error', err);
		}
	});
	window.addEventListener('load', function () {
		try {
			initPortfolioFeatures();
			setTimeout(initPortfolioFeatures, 200);
		} catch (err) { console.error('window.load handler error', err); }
	});
	window.addEventListener('resize', function () { try { updateNavOffset(); } catch (e) {} });

	// expose for debugging
	window.__VC = window.__VC || {};
	window.__VC.updateNavOffset = updateNavOffset;
	window.__VC.initBrandingCarousel = initBrandingCarousel;
	window.__VC.loadBrandingImages = loadBrandingImages;
	window.__VC.initMailjetForm = initMailjetForm;
})();

// Generic, minimal carousel initializer to support multiple carousels on the page.
// Finds elements with class "carousel" and uses their .carousel-track / .carousel-slide children.
// Adds functioning prev/next buttons and keeps state per-carousel.
(function initAllCarouselsModule() {
	/**
	 * Initialize a single carousel root element.
	 * @param {HTMLElement} root
	 */
	function initCarousel(root) {
		if (!root || root.dataset.carouselInit === '1') return;
		const track = root.querySelector('.carousel-track');
		if (!track) return;
		const slides = Array.from(track.querySelectorAll('.carousel-slide'));
		if (!slides.length) return;

		const prevBtn = root.querySelector('.carousel-btn.prev');
		const nextBtn = root.querySelector('.carousel-btn.next');

		// ensure buttons are buttons (prevent form submit side-effects)
		if (prevBtn) prevBtn.type = 'button';
		if (nextBtn) nextBtn.type = 'button';

		let index = 0;

		function update() {
			// translate in percent - slides expected to be full-width each.
			track.style.transition = 'transform 400ms ease';
			track.style.transform = 'translateX(' + (-index * 100) + '%)';
		}

		function prev() {
			index = (index - 1 + slides.length) % slides.length;
			update();
		}
		function next() {
			index = (index + 1) % slides.length;
			update();
		}

		// Attach handlers (guard duplicates by checking dataset flag before init)
		if (prevBtn) prevBtn.addEventListener('click', function (e) { e && e.preventDefault(); prev(); });
		if (nextBtn) nextBtn.addEventListener('click', function (e) { e && e.preventDefault(); next(); });

		// Optional: click image to advance (non-destructive to links)
		slides.forEach(slide => {
			const img = slide.querySelector('img');
			if (!img) return;
			img.style.cursor = 'pointer';
			img.addEventListener('click', function (e) {
				// if user clicked a link inside the image/slide, don't intercept
				if (e.target.closest && e.target.closest('a')) return;
				next();
			});
		});

		// Make keyboard accessible
		root.tabIndex = 0;
		root.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowRight') { next(); }
			if (e.key === 'ArrowLeft') { prev(); }
		});

		// Mark initialized to avoid double-binding
		root.dataset.carouselInit = '1';

		// Ensure correct initial positioning
		update();

		// Recalculate on resize (keeps percent-based transform but useful if layout changes)
		window.addEventListener('resize', function () {
			// re-apply transform (no change to index) to ensure visual correctness
			update();
		});
	}

	// Initialize all carousels currently in DOM
	function initAllCarousels() {
		try {
			const roots = Array.from(document.querySelectorAll('.carousel'));
			roots.forEach(initCarousel);
		} catch (err) {
			console.error('initAllCarousels error', err);
		}
	}

	// Run on DOM ready and on load (covers both dynamically injected and static HTML)
	document.addEventListener('DOMContentLoaded', initAllCarousels);
	window.addEventListener('load', initAllCarousels);

	// expose for debugging
	window.__initAllCarousels = initAllCarousels;
})();

/////// NEW CAROUSEL CODE STARTS 

// ====== IMAGE DIRECTORY LISTS ======

const brandingImages = [
    "images/branding/branding1.png",
    "images/branding/branding2.png",
    "images/branding/branding3.png"
];

const socialImages = [
    "images/social/s1.jpg",
    "images/social/s2.jpg",
    "images/social/s3.jpg"
];


// ====== UNIVERSAL CAROUSEL LOADER ======

function createCarousel(carouselId, images) {
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector(".track");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    // Load the images
    images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        track.appendChild(img);
    });

    let index = 0;

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Next
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % images.length;
        update();
    });

    // Prev
    prevBtn.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        update();
    });

    update();
}


// ====== Initialize Both Carousels ======
createCarousel("carousel1", brandingImages);
createCarousel("carousel2", socialImages);

/////// NEW CAROUSEL CODE ENDS