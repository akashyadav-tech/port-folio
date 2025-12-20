// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const projectCards = document.querySelectorAll('.project-card');
const timelineItems = document.querySelectorAll('.timeline-item');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitIcon = document.getElementById('submitIcon');
const formMessage = document.getElementById('formMessage');
const successMessage = document.getElementById('successMessage');
const successOverlay = document.getElementById('successOverlay');

// ===== Set Current Year in Footer =====
currentYearSpan.textContent = new Date().getFullYear();

// ===== Mobile Menu Toggle =====
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    menuToggle.innerHTML = navLinksContainer.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    updateActiveNavLink();
    animateSkillBars();
    animateTimelineItems();
    animateProjectCards();
});

// ===== Update Active Nav Link on Scroll =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Animate Skill Bars =====
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (barPosition < screenPosition) {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        }
    });
}

// ===== Animate Timeline Items =====
function animateTimelineItems() {
    timelineItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
}

// ===== Animate Project Cards =====
function animateProjectCards() {
    projectCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// ===== Initialize Animation States =====
function initAnimations() {
    skillProgressBars.forEach(bar => bar.style.width = '0%');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    setTimeout(() => {
        animateSkillBars();
        animateTimelineItems();
        animateProjectCards();
    }, 500);
}

// ===== Show Success Message Animation =====
function showSuccessMessage() {
    successMessage.classList.add('active');
    successOverlay.classList.add('active');
    
    // Add checkmark animation
    const checkIcon = successMessage.querySelector('.success-icon i');
    checkIcon.style.animation = 'checkmark 0.5s ease-out, bounce 1s ease infinite 0.5s';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideSuccessMessage();
    }, 5000);
}

// ===== Hide Success Message =====
function hideSuccessMessage() {
    successMessage.classList.remove('active');
    successOverlay.classList.remove('active');
}

// ===== Form Validation =====
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Clear previous messages
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    // Validation checks
    if (!name) {
        formMessage.textContent = 'Please enter your name.';
        formMessage.classList.add('error');
        return false;
    }
    
    if (!email) {
        formMessage.textContent = 'Please enter your email address.';
        formMessage.classList.add('error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.classList.add('error');
        return false;
    }
    
    if (!subject) {
        formMessage.textContent = 'Please enter a subject.';
        formMessage.classList.add('error');
        return false;
    }
    
    if (!message) {
        formMessage.textContent = 'Please enter your message.';
        formMessage.classList.add('error');
        return false;
    }
    
    if (message.length < 10) {
        formMessage.textContent = 'Message should be at least 10 characters long.';
        formMessage.classList.add('error');
        return false;
    }
    
    return true;
}

// ===== Form Submission with FormSubmit.co =====
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        formMessage.style.animation = 'fadeInUp 0.5s ease-out';
        return;
    }
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Show loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitIcon.style.display = 'none';
    
    // Prepare form data for FormSubmit.co
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    
    // Add additional parameters for FormSubmit.co
    formData.append('_replyto', email);
    formData.append('_subject', `Portfolio Contact: ${subject}`);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    
    try {
        // Send to FormSubmit.co
        const response = await fetch('https://formsubmit.co/ajax/akashyadav8795713261@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Show success message
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            // Reset form
            contactForm.reset();
            
            // Show success animation
            showSuccessMessage();
            
            // Log success for debugging
            console.log('Form submitted successfully:', result);
        } else {
            throw new Error(result.message || 'Form submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        formMessage.textContent = 'There was an error sending your message. Please try again or email me directly at akashyadav.12.a.5953@gmail.com';
        formMessage.className = 'form-message error';
        formMessage.style.animation = 'fadeInUp 0.5s ease-out';
    } finally {
        // Reset button state
        submitBtn.classList.remove('btn-loading');
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        submitIcon.style.display = 'inline-block';
        
        // Clear error message after 5 seconds
        if (formMessage.className.includes('error')) {
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
});

// ===== Hover Effects for Buttons, Cards, Social Icons =====
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();

    const buttons = document.querySelectorAll('.btn:not([disabled])');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(-5px)';
            }
        });
        button.addEventListener('mouseleave', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(0)';
            }
        });
    });

    const cards = document.querySelectorAll('.skill-card, .project-card, .contact-card, .certification-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.zIndex = '10');
        card.addEventListener('mouseleave', () => card.style.zIndex = '1');
    });

    // Typing effect for name
    const nameElement = document.querySelector('.name');
    const nameText = nameElement.textContent;
    nameElement.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < nameText.length) {
            nameElement.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            document.querySelector('.typing-cursor').style.display = 'inline-block';
        }
    };
    setTimeout(typeWriter, 1000);
});

// ===== Add CSS for Ripple Effect =====
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== Intersection Observer for animations =====
const observerOptions = { 
    root: null, 
    rootMargin: '0px', 
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
projectCards.forEach(card => observer.observe(card));

// Close success message when clicking overlay
successOverlay.addEventListener('click', hideSuccessMessage);

// Close success message with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successMessage.classList.contains('active')) {
        hideSuccessMessage();
    }
});

// Initialize scroll animations on page load
window.addEventListener('load', () => {
    updateActiveNavLink();
    animateSkillBars();
    animateTimelineItems();
    animateProjectCards();
});