/**
 * Dadar Spa - Main JavaScript File
 * Contact: 8169595455 (Call & WhatsApp)
 * Address: Dastoorwadi, Dadar East, Dadar, Mumbai, Maharashtra 400014
 */

const SPA_PHONE = "8169595455";
const SPA_PHONE_FORMATTED = "+91 81695 95455";
const SPA_WHATSAPP_LINK = "https://wa.me/918169595455";

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        });
    }

    const closeDrawer = () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    };

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeDrawer);
    }

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 2. Booking Modal Logic
    const bookingModal = document.getElementById('booking-modal');
    const openBookingBtns = document.querySelectorAll('.open-booking-modal');
    const closeBookingBtns = document.querySelectorAll('.close-booking-modal');
    const bookingServiceSelect = document.getElementById('modal-service-select');

    if (bookingModal) {
        openBookingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                closeDrawer();
                const preselectedService = btn.getAttribute('data-service');
                if (preselectedService && bookingServiceSelect) {
                    bookingServiceSelect.value = preselectedService;
                }
                bookingModal.classList.add('active');
                document.body.classList.add('overflow-hidden');
            });
        });

        closeBookingBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                bookingModal.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            });
        });

        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    // 3. Direct WhatsApp Booking Submission Handler
    const bookingForms = document.querySelectorAll('.spa-booking-form');
    bookingForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('[name="name"]')?.value || 'Guest';
            const phone = form.querySelector('[name="phone"]')?.value || 'Not provided';
            const service = form.querySelector('[name="service"]')?.value || 'General Spa Consultation';
            const date = form.querySelector('[name="date"]')?.value || 'Earliest available';
            const time = form.querySelector('[name="time"]')?.value || 'Flexible';
            const notes = form.querySelector('[name="notes"]')?.value || 'None';

            const message = `✨ *New Appointment Request - Dadar Spa* ✨%0A%0A` +
                `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                `📱 *Phone:* ${encodeURIComponent(phone)}%0A` +
                `💆‍♀️ *Therapy:* ${encodeURIComponent(service)}%0A` +
                `📅 *Preferred Date:* ${encodeURIComponent(date)}%0A` +
                `⏰ *Preferred Time:* ${encodeURIComponent(time)}%0A` +
                `📝 *Special Requests:* ${encodeURIComponent(notes)}%0A%0A` +
                `📍 *Location:* Dastoorwadi, Dadar East, Mumbai`;

            // Trigger Toast Notification
            showToast(`Appointment request prepared! Redirecting to WhatsApp...`);

            if (bookingModal && bookingModal.classList.contains('active')) {
                bookingModal.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            }

            form.reset();

            // Open WhatsApp in new tab after 600ms
            setTimeout(() => {
                window.open(`${SPA_WHATSAPP_LINK}?text=${message}`, '_blank');
            }, 600);
        });
    });

    // 4. Contact / Inquiry Form Handler
    const contactForm = document.getElementById('contact-inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#contact-name')?.value || 'Guest';
            const phone = contactForm.querySelector('#contact-phone')?.value || '';
            const email = contactForm.querySelector('#contact-email')?.value || 'N/A';
            const message = contactForm.querySelector('#contact-message')?.value || '';

            const waMessage = `✨ *General Inquiry - Dadar Spa* ✨%0A%0A` +
                `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                `📱 *Phone:* ${encodeURIComponent(phone)}%0A` +
                `📧 *Email:* ${encodeURIComponent(email)}%0A` +
                `💬 *Message:* ${encodeURIComponent(message)}`;

            showToast(`Thank you ${name}! Sending inquiry via WhatsApp...`);
            contactForm.reset();

            setTimeout(() => {
                window.open(`${SPA_WHATSAPP_LINK}?text=${waMessage}`, '_blank');
            }, 700);
        });
    }

    // 5. Gallery Filter Logic
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-filter-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(b => {
                    b.classList.remove('bg-amber-400', 'text-stone-950', 'font-bold');
                    b.classList.add('bg-spa-card', 'text-stone-300');
                });
                button.classList.remove('bg-spa-card', 'text-stone-300');
                button.classList.add('bg-amber-400', 'text-stone-950', 'font-bold');

                const filter = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                        item.classList.add('block');
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('block');
                    }
                });
            });
        });
    }

    // 6. Gallery Lightbox Modal
    const lightboxModal = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightboxModal && lightboxImage) {
        document.querySelectorAll('.open-lightbox').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = el.getAttribute('data-img') || el.querySelector('img')?.src;
                const title = el.getAttribute('data-title') || 'Dadar Spa Ambiance';
                const desc = el.getAttribute('data-desc') || 'Luxury Wellness Haven in Dadar East';

                lightboxImage.src = imgSrc;
                if (lightboxTitle) lightboxTitle.textContent = title;
                if (lightboxDesc) lightboxDesc.textContent = desc;

                lightboxModal.classList.add('active');
                document.body.classList.add('overflow-hidden');
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightboxModal.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            });
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    // 7. Navbar scroll background effect
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled', 'shadow-2xl');
            } else {
                navbar.classList.remove('scrolled', 'shadow-2xl');
            }
        });
    }

    // 8. Service page filter logic
    const serviceFilterBtns = document.querySelectorAll('.service-filter-btn');
    const serviceCards = document.querySelectorAll('.service-card-item');
    if (serviceFilterBtns.length > 0 && serviceCards.length > 0) {
        serviceFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                serviceFilterBtns.forEach(b => {
                    b.classList.remove('bg-amber-400', 'text-stone-950', 'font-bold');
                    b.classList.add('bg-spa-card', 'text-stone-300');
                });
                btn.classList.remove('bg-spa-card', 'text-stone-300');
                btn.classList.add('bg-amber-400', 'text-stone-950', 'font-bold');

                const cat = btn.getAttribute('data-category');
                serviceCards.forEach(card => {
                    if (cat === 'all' || card.getAttribute('data-category') === cat) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Helper: Toast Notification Function
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 border border-amber-200';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}
