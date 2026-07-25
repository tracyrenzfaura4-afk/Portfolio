/* ============================================
   REMY/PEPPER STEAK'S PORTFOLIO - Main JavaScript
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    /* ------------------------------------------
       1. NAVBAR SCROLL EFFECT
    ------------------------------------------ */
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    /* ------------------------------------------
       2. HAMBURGER MENU TOGGLE
    ------------------------------------------ */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    navLinkItems.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    /* ------------------------------------------
       3. GALLERY FILTERING
    ------------------------------------------ */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const artCards = document.querySelectorAll('.art-card');

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Show/hide art cards based on filter
            artCards.forEach(function (card) {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    // Trigger animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'none';
                        card.offsetHeight; // Trigger reflow
                        card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    /* ------------------------------------------
       4. LIGHTBOX MODAL
    ------------------------------------------ */
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxMedium = document.getElementById('lightbox-medium');
    const lightboxYear = document.getElementById('lightbox-year');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxImage = document.getElementById('lightbox-image');

    // Artwork data for lightbox content
    const artworkData = {
        'Digital Illustration': {
            title: 'Digital Illustration',
            medium: 'Digital Art',
            year: '2024',
            description: 'A vibrant digital illustration exploring color theory and composition. Created using a combination of digital painting techniques and photo manipulation.',
            image: 'images/digital-art-1.jpg'
        },
        '3D Printed Sculpture': {
            title: '3D Printed Sculpture',
            medium: '3D Printing - PLA',
            year: '2024',
            description: 'A 3D printed decorative sculpture modeled in Fusion 360. Printed with PLA filament at 0.12mm layer height for a smooth, detailed finish.',
            image: 'images/3d-print-1.jpg'
        },
        'Custom PCB Board': {
            title: 'Custom PCB Board',
            medium: 'PCB Design - KiCad',
            year: '2024',
            description: 'Custom PCB design for an IoT sensor project. Designed in KiCad with 2-layer routing, through-hole and SMD components, and custom silkscreen labeling.',
            image: 'images/pcb-design-1.jpg'
        },
        'Custom Keychain Set': {
            title: 'Custom Keychain Set',
            medium: 'Laser Engraved Wood',
            year: '2024',
            description: 'A set of laser-engraved wooden keychains featuring custom designs. Cut and engraved on a CO2 laser from premium birch plywood.',
            image: 'images/keychain-1.jpg'
        },
        'Bamboo Pen Set': {
            title: 'Bamboo Pen Set',
            medium: 'Laser Engraved Bamboo',
            year: '2024',
            description: 'Personalized bamboo pens with custom laser-engraved text and patterns. Each pen is sanded, engraved, and finished with a natural sealant.',
            image: 'images/bamboo-pen-1.jpg'
        },
        'Residential Floor Plan': {
            title: 'Residential Floor Plan',
            medium: 'CAD Model - AutoCAD',
            year: '2024',
            description: 'Detailed 2D CAD floor plan for a single-family residence. Includes dimensioning, furniture layout, room labels, and electrical/plumbing schematics.',
            image: 'images/floor-plan-1.jpg'
        }
    };

    function openLightbox(card) {
        var titleEl = card.querySelector('.art-info h3');
        var title = titleEl ? titleEl.textContent : 'Artwork';
        var data = artworkData[title] || {
            title: title,
            medium: 'Artwork',
            year: '—',
            description: 'No description available for this piece.',
            image: ''
        };

        lightboxTitle.textContent = data.title;
        lightboxMedium.textContent = data.medium;
        lightboxYear.textContent = data.year;
        lightboxDescription.textContent = data.description;
        if (lightboxImage) {
            lightboxImage.src = data.image;
            lightboxImage.alt = data.title;
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open lightbox on card click
    artCards.forEach(function (card) {
        card.addEventListener('click', function () {
            openLightbox(this);
        });
    });

    // Close lightbox on × button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Close lightbox when clicking outside content
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    /* ------------------------------------------
       5. CONTACT FORM HANDLING
    ------------------------------------------ */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var subject = document.getElementById('subject').value.trim();
            var message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate sending (in production, connect to a backend)
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(function () {
                showFormMessage('Thank you, ' + name + '! Your message has been sent. I\'ll get back to you soon!', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    function isValidEmail(email) {
        // Simple email validation pattern
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    function showFormMessage(msg, type) {
        // Remove any existing message
        var existingMsg = document.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }

        var messageEl = document.createElement('div');
        messageEl.className = 'form-message form-message--' + type;
        messageEl.textContent = msg;
        messageEl.style.cssText = 'padding: 12px 16px; border-radius: 10px; margin-top: 12px; font-size: 0.9rem; text-align: center; animation: fadeInUp 0.3s ease-out;';

        if (type === 'success') {
            messageEl.style.background = 'rgba(34, 197, 94, 0.15)';
            messageEl.style.color = '#4ade80';
            messageEl.style.border = '1px solid rgba(34, 197, 94, 0.3)';
        } else {
            messageEl.style.background = 'rgba(239, 68, 68, 0.15)';
            messageEl.style.color = '#f87171';
            messageEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        }

        contactForm.appendChild(messageEl);

        // Auto-remove success message after 5 seconds
        if (type === 'success') {
            setTimeout(function () {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 5000);
        }
    }

    /* ------------------------------------------
       6. ACTIVE NAV LINK ON SCROLL
    ------------------------------------------ */
    var sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        var scrollPos = window.pageYOffset + 150;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionBottom = sectionTop + section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinkItems.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    /* ------------------------------------------
       7. SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
    ------------------------------------------ */
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        var animateElements = document.querySelectorAll(
            '.gallery-grid .art-card, ' +
            '.about-content, ' +
            '.contact-content, ' +
            '.section-header'
        );

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: show everything immediately
        var els = document.querySelectorAll(
            '.gallery-grid .art-card, ' +
            '.about-content, ' +
            '.contact-content, ' +
            '.section-header'
        );
        els.forEach(function (el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    /* ------------------------------------------
       8. SMOOTH SCROLL FOR ANCHOR LINKS (fallback)
    ------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var headerOffset = 80;
                var elementPosition = targetElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ------------------------------------------
       9. KEYBOARD NAVIGATION SUPPORT
    ------------------------------------------ */
    // Allow opening lightbox with Enter key on art cards
    artCards.forEach(function (card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(this);
            }
        });
    });

    // Filter buttons keyboard support
    filterButtons.forEach(function (btn) {
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

}); // End DOMContentLoaded


// images/digital-art-1.jpg    → your digital art piece
//images/3d-print-1.jpg       → your 3D printed object photo
//images/pcb-design-1.jpg     → your PCB board screenshot/photo
//images/keychain-1.jpg       → your engraved keychain photo
//images/bamboo-pen-1.jpg     → your engraved pen photo
//images/floor-plan-1.jpg     → your CAD floor plan screenshot
