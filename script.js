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
       3. ARTWORK DATA & DYNAMIC GALLERY RENDERER
    ------------------------------------------ */
    // Central album data array — each album is one category with multiple images
    const albums = [
        {
            title: 'Digital Art',
            category: 'digital',
            coverImage: 'images/digital-art-1.jpg',
            medium: 'Digital Art',
            year: '2024',
            description: 'A curated collection of vibrant digital illustrations exploring color theory, advanced blending techniques, and unique color palettes.',
            images: [
                { src: 'images/digital-art-1.jpg', title: 'Digital Illustration 1' },
                { src: 'images/digital-art-2.jpg', title: 'Digital Illustration 2' }
            ]
        },
        {
            title: '3D Printing',
            category: 'printing',
            coverImage: 'images/3d-print-1.jpg',
            medium: '3D Printing - PLA',
            year: '2024',
            description: '3D printed decorative sculptures modeled in Fusion 360, printed with PLA filament at fine layer heights for smooth, detailed finishes.',
            images: [
                { src: 'images/3d-print-1.jpg', title: '3D Printed Sculpture' }
            ]
        },
        {
            title: 'PCB Design',
            category: 'pcb',
            coverImage: 'images/pcb-design-1.jpg',
            medium: 'PCB Design - KiCad',
            year: '2024',
            description: 'Custom PCB designs for IoT sensor projects, featuring 2-layer routing, through-hole and SMD components, and custom silkscreen labeling.',
            images: [
                { src: 'images/pcb-design-1.jpg', title: 'Custom PCB Board' }
            ]
        },
        {
            title: 'Engraving',
            category: 'engraving',
            coverImage: 'images/keychain-1.jpg',
            medium: 'Laser Engraving',
            year: '2024',
            description: 'A collection of laser-engraved creations including wooden keychains and personalized bamboo pens with custom designs and patterns.',
            images: [
                { src: 'images/keychain-1.jpg', title: 'Custom Keychain Set' },
                { src: 'images/bamboo-pen-1.jpg', title: 'Bamboo Pen Set' }
            ]
        },
        {
            title: 'CAD and Plans',
            category: 'cad',
            coverImage: 'images/floor-plan-1.jpg',
            medium: 'CAD Model - AutoCAD',
            year: '2024',
            description: 'Detailed 2D CAD floor plans for residential projects, including dimensioning, furniture layout, room labels, and electrical/plumbing schematics.',
            images: [
                { src: 'images/floor-plan-1.jpg', title: 'Residential Floor Plan' }
            ]
        }
    ];

    // Generate gallery cards from the albums data
    function renderGallery() {
        var grid = document.getElementById('galleryGrid');
        if (!grid) return;

        grid.innerHTML = '';
        albums.forEach(function (album) {
            var card = document.createElement('div');
            card.className = 'art-card';
            card.setAttribute('data-category', album.category);
            card.setAttribute('data-album-index', albums.indexOf(album));
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');

            var itemCount = album.images.length;
            var countBadge = itemCount > 1 ? '<span class="art-count-badge">' + itemCount + ' pieces</span>' : '';

            card.innerHTML =
                '<div class="art-thumbnail">' +
                    '<img src="' + album.coverImage + '" alt="' + album.title + '" loading="lazy">' +
                    countBadge +
                '</div>' +
                '<div class="art-info">' +
                    '<h3>' + album.title + '</h3>' +
                    '<p class="art-medium">' + album.medium + '</p>' +
                '</div>';

            grid.appendChild(card);
        });
    }

    renderGallery();

    /* ------------------------------------------
       4. GALLERY FILTERING
    ------------------------------------------ */
    var filterButtons = document.querySelectorAll('.filter-btn');

    function applyGalleryFilter(filterValue) {
        var cards = document.querySelectorAll('.art-card');
        cards.forEach(function (card) {
            if (filterValue === 'all') {
                card.style.display = 'block';
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeInUp 0.5s ease-out forwards';
            } else {
                var category = card.getAttribute('data-category');
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
    }

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            var filterValue = this.getAttribute('data-filter');
            applyGalleryFilter(filterValue);
        });
    });

    /* ------------------------------------------
       5. LIGHTBOX MODAL (Album Viewer)
    ------------------------------------------ */
    var lightbox = document.getElementById('lightbox');
    var lightboxClose = document.querySelector('.lightbox-close');
    var lightboxTitle = document.getElementById('lightbox-title');
    var lightboxMedium = document.getElementById('lightbox-medium');
    var lightboxDescription = document.getElementById('lightbox-description');
    var lightboxImage = document.getElementById('lightbox-image');
    var lightboxPrev = document.querySelector('.lightbox-nav-prev');
    var lightboxNext = document.querySelector('.lightbox-nav-next');
    var lightboxCounter = document.getElementById('lightbox-counter');

    var currentAlbumIndex = -1;
    var currentImageIndex = 0;

    function openAlbum(albumIdx, imgIdx) {
        var album = albums[albumIdx];
        if (!album) return;

        currentAlbumIndex = albumIdx;
        currentImageIndex = imgIdx || 0;

        updateLightboxDisplay();

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxDisplay() {
        var album = albums[currentAlbumIndex];
        if (!album) return;

        var img = album.images[currentImageIndex];
        if (!img) return;

        lightboxTitle.textContent = album.title;
        lightboxMedium.textContent = album.medium;
        lightboxDescription.textContent = album.description;

        if (lightboxImage) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.title;
        }

        // Update counter
        if (lightboxCounter) {
            lightboxCounter.textContent = (currentImageIndex + 1) + ' / ' + album.images.length;
        }

        // Show/hide navigation arrows based on image count
        var hasMultiple = album.images.length > 1;
        if (lightboxPrev) lightboxPrev.style.display = hasMultiple ? 'flex' : 'none';
        if (lightboxNext) lightboxNext.style.display = hasMultiple ? 'flex' : 'none';
    }

    function navigateLightbox(direction) {
        var album = albums[currentAlbumIndex];
        if (!album || album.images.length <= 1) return;

        currentImageIndex += direction;

        // Loop around
        if (currentImageIndex < 0) {
            currentImageIndex = album.images.length - 1;
        } else if (currentImageIndex >= album.images.length) {
            currentImageIndex = 0;
        }

        updateLightboxDisplay();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        currentAlbumIndex = -1;
        currentImageIndex = 0;
    }

    // Delegate lightbox opening to parent (since cards are dynamic)
    document.getElementById('galleryGrid').addEventListener('click', function (e) {
        var card = e.target.closest('.art-card');
        if (card) {
            var albumIdx = parseInt(card.getAttribute('data-album-index'));
            if (!isNaN(albumIdx)) {
                openAlbum(albumIdx, 0);
            }
        }
    });

    // Close lightbox on × button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Navigation arrows
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function (e) {
            e.stopPropagation();
            navigateLightbox(-1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function (e) {
            e.stopPropagation();
            navigateLightbox(1);
        });
    }

    // Close lightbox on Escape key
    document.addEventListener('keydown', function (e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
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

    // Keyboard navigation for dynamically generated cards (event delegation)
    document.getElementById('galleryGrid').addEventListener('keydown', function (e) {
        var card = e.target.closest('.art-card');
        if (card && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            var albumIdx = parseInt(card.getAttribute('data-album-index'));
            if (!isNaN(albumIdx)) {
                openAlbum(albumIdx, 0);
            }
        }
    });

    /* ------------------------------------------
       6. CONTACT FORM HANDLING
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
       7. ACTIVE NAV LINK ON SCROLL
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
       8. SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
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
       9. SMOOTH SCROLL FOR ANCHOR LINKS (fallback)
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
       10. KEYBOARD NAVIGATION SUPPORT
    ------------------------------------------ */
    // Art cards keyboard navigation is handled via event delegation in section 5

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
