document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Theme Toggling (Light / Dark)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-icon-dark');
    const lightIcon = document.getElementById('theme-icon-light');
    const bodyElement = document.body;

    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Default is dark mode, so we check if saved theme is 'light'
    if (savedTheme === 'light') {
        bodyElement.classList.add('light-mode');
        bodyElement.classList.remove('dark-mode');
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    } else {
        bodyElement.classList.add('dark-mode');
        bodyElement.classList.remove('light-mode');
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isLight = bodyElement.classList.toggle('light-mode');
        bodyElement.classList.toggle('dark-mode', !isLight);
        
        if (isLight) {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'light');
        } else {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================================================
    // Hero Image Carousel
    // ==========================================================================
    const carouselSlides = Array.from(document.querySelectorAll('.carousel-slide'));
    let activeSlideIndex = 0;

    function showSlide(index) {
        if (!carouselSlides.length) return;

        activeSlideIndex = (index + carouselSlides.length) % carouselSlides.length;

        carouselSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === activeSlideIndex);
        });
    }

    window.changeSlide = (direction) => {
        showSlide(activeSlideIndex + direction);
    };

    if (carouselSlides.length > 1) {
        setInterval(() => {
            showSlide(activeSlideIndex + 1);
        }, 4000);
    }

    showSlide(0);

    // ==========================================================================
    // Modal Overlay Functionality
    // ==========================================================================
    const joinModal = document.getElementById('join-modal');
    const ctaButton = document.getElementById('cta-button');
    const closeModalBtn = document.getElementById('close-modal');
    const joinForm = document.getElementById('join-form');
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.getElementById('close-success-btn');
    const userNameInput = document.getElementById('user-name');

    // Open Modal
    function openModal() {
        joinModal.classList.add('active');
        joinModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
        
        // Focus first input with a slight delay to allow transition to complete
        setTimeout(() => {
            userNameInput.focus();
        }, 100);
    }

    // Close Modal
    function closeModal() {
        joinModal.classList.remove('active');
        joinModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restores background scrolling
        
        // Reset modal state after transition ends
        setTimeout(() => {
            joinForm.classList.remove('hidden');
            successMessage.classList.add('hidden');
            joinForm.reset();
        }, 300);
    }

    ctaButton.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    closeSuccessBtn.addEventListener('click', closeModal);

    // Close on clicking outside modal-card (on the backdrop)
    joinModal.addEventListener('click', (e) => {
        if (e.target === joinModal) {
            closeModal();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && joinModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // Form Submission Handling
    // ==========================================================================
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values for processing
        const formData = {
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            role: document.getElementById('user-role').value
        };

        // Simulate API call and transition to success state
        joinForm.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        console.log('Form submitted successfully:', formData);
    });
});
