document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.querySelector('#back-to-top-btn');
    const menuToggle = document.querySelector('#menu-toggle');
    const mainNav = document.querySelector('#main-nav');
    let lastScrollY = window.scrollY;

    // Function to handle scroll events
    const handleScroll = () => {
        const currentScrollY = window.scrollY;


        // Add 'scrolled' class to navbar when not at the top
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > navbar.offsetHeight) {
            // Scrolling down
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('navbar-hidden');
        }

        lastScrollY = currentScrollY;

        // Show/hide the 'back to top' button
        if (currentScrollY > 400) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu on link click
                if (mainNav.classList.contains('is-active')) {
                    mainNav.classList.remove('is-active');
                }
            }
        });
    });

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('is-active');
        const icon = menuToggle.querySelector('i');

        if (mainNav.classList.contains('is-active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Contact Form Submission
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                    formStatus.style.color = 'var(--primary-color)';
                    form.reset();
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                    formStatus.style.color = '#e74c3c';
                }
            }).catch(error => {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
            });
        });
    }

    // Scroll-in animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Remove the class when the element is out of view to re-trigger the animation
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all elements with the fade-in class
    const elementsToFadeIn = document.querySelectorAll('.fade-in-element');
    elementsToFadeIn.forEach(el => {
        observer.observe(el);
    });
});