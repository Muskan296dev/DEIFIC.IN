document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE NAVIGATION TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent background scrolling when menu is active
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });


    // --- CHANGE NAVBAR BACKGROUND ON SCROLL ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '1.25rem 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        }
    });


    // --- ACTIVE INTERSECTION OBSERVER FOR NAV LINKS ---
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.3,
        rootMargin: "-10% 0px -40% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));


    // --- OPTIONAL: INTERACTIVE QUICK ADD FEEDBACK ---
    const quickAddButtons = document.querySelectorAll('.btn-quick-add');
    quickAddButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.closest('.product-card').querySelector('.product-name').innerText;
            
            // Visual feedback interaction
            const originalText = button.innerText;
            button.innerText = "ADDED TO BAG";
            button.style.backgroundColor = "#27ae60";
            button.style.color = "#ffffff";
            
            setTimeout(() => {
                button.innerText = originalText;
                button.style.backgroundColor = "";
                button.style.color = "";
            }, 1500);
        });
    });
});