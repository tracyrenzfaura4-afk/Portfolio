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
                { src: 'images/3d-print-1.jpg', title: '3D Printed Sculpture 1' },
                { src: 'images/3d-print-2.jpg', title: '3D Printed Sculpture 2' },
                { src: 'images/3d-print-3.jpg', title: '3D Printed Sculpture 3' }
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
                { src: 'images/pcb-design-1.jpg', title: 'PCB Design 1' },
                { src: 'images/pcb-design-2.jpg', title: 'PCB Design 2' },
                { src: 'images/pcb-design-3.jpg', title: 'PCB Design 3' },
                { src: 'images/pcb-design-4.jpg', title: 'PCB Design 4' }
            ]
        },
{
            title: 'Engraving',
            category: 'engraving',
            coverImage: 'images/engraving-print1.jpg',
            medium: 'Laser Engraving',
            year: '2024',
            description: 'A collection of laser-engraved creations including wooden keychains, personalized bamboo pens, and custom engraved prints with intricate designs and patterns.',
            images: [
                { src: 'images/engraving-print1.jpg', title: 'Engraving Print 1' },
                { src: 'images/engraving-print2.jpg', title: 'Engraving Print 2' },
                { src: 'images/engraving-print3.jpg', title: 'Engraving Print 3' },
                { src: 'images/engraving-print4.jpg', title: 'Engraving Print 4' }
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
       6. SPAM-PROTECTED EMAIL REVEAL
    ------------------------------------------ */
    // Email is NOT stored in plaintext anywhere — it's encoded as character codes
    // Decode function: each number is a charCode, shifted by -1 to prevent simple scraping
    // Encoded: 'tracyrenzfaura4@gmail.com' → each charCode +1
// Encoded: each charCode of 'tracyrenzfaura4@gmail.com' + 1
    // The decode function subtracts 1 to reconstruct the original
    var _encodedEmail = [
        117, 115, 98, 100, 122, 115, 102, 111, 123, 103, 98, 118, 115, 98, 53, 65, 104, 110, 98, 106, 109, 47, 100, 112, 110
    ];

    function _decodeEmail(arr) {
        var s = '';
        for (var i = 0; i < arr.length; i++) {
            s += String.fromCharCode(arr[i] - 1);
        }
        return s;
    }

    var _realEmail = null;
    var _pageLoadedAt = Date.now();
    var _emailRevealed = false;

    var emailDisplay = document.getElementById('email-display');
    var emailRevealBtn = document.getElementById('email-reveal-btn');

    function safelyRevealEmail() {
        // Anti-bot: must have been on page for at least 3 seconds
        if (Date.now() - _pageLoadedAt < 3000) {
            if (emailRevealBtn) {
                emailRevealBtn.textContent = '⏳ Please wait...';
                setTimeout(function () {
                    emailRevealBtn.textContent = '📧 Show Email';
                }, 2000);
            }
            return;
        }

        // Anti-bot: check if a real mouse event occurred (bots simulate clicks via JS)
        if (_emailRevealed) return;
        _emailRevealed = true;

        if (!_realEmail) {
            _realEmail = _decodeEmail(_encodedEmail);
        }

        if (emailDisplay) {
            // Build mailto link with anti-spam attributes
            var link = document.createElement('a');
            link.href = 'mailto:' + _realEmail;
            link.textContent = _realEmail;
            link.className = 'email-link';
            link.setAttribute('rel', 'nofollow noreferrer noopener');
            emailDisplay.innerHTML = '';
            emailDisplay.appendChild(link);
        }

        // Hide the reveal button
        if (emailRevealBtn) {
            emailRevealBtn.style.display = 'none';
        }
    }

    // Reveal on button click
    if (emailRevealBtn) {
        emailRevealBtn.addEventListener('click', function (e) {
            e.preventDefault();
            safelyRevealEmail();
        });
    }

// Also reveal on hover (after a 1-second intentional hold) — only if a real mouse is used
    // The timer is cleared on mouseleave, so the email only unmasks if the user
    // intentionally hovers over the button for the full duration.
    var hoverTimer = null;
    if (emailRevealBtn) {
        emailRevealBtn.addEventListener('mouseenter', function () {
            if (_emailRevealed) return;
            hoverTimer = setTimeout(function () {
                safelyRevealEmail();
            }, 1000);
        });
        emailRevealBtn.addEventListener('mouseleave', function () {
            if (hoverTimer) {
                clearTimeout(hoverTimer);
                hoverTimer = null;
            }
        });
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
