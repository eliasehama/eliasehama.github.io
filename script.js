/* ==========================================
   PORTFOLIO SCRIPT.JS
   Premium Modern Developer Portfolio
   ========================================== */

// ==========================================
// CONFIGURATION - UPDATE THESE VALUES
// ==========================================
const CONFIG = {
  name: 'Elia MUGISHA',
  role: 'Web Developer & Software Developer',
  location: 'Kigali, Rwanda',
  email: 'eliasehama@gmail.com',
  github: 'https://github.com/eliasehama',
  linkedin: 'https://linkedin.com/in/elia-mugisha',
  instagram: 'https://instagram.com/lucky_elia_2k',
  whatsapp: 'https://wa.me/250793731595',
  cvUrl: 'CV/Elia-CV.html'
};

// ==========================================
// CV DOWNLOAD FUNCTION
// ==========================================
async function downloadCV() {
  try {
    const response = await fetch(CONFIG.cvUrl);
    if (!response.ok) throw new Error('CV file not found');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Elia-Mugisha-CV.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    window.open(CONFIG.cvUrl, '_blank');
  }
}

// ==========================================
// DOM ELEMENTS
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const progressFills = document.querySelectorAll('.progress-fill');
const statNumbers = document.querySelectorAll('.stat-number');
const revealElements = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('section[id]');

// ==========================================
// MOBILE MENU
// ==========================================
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
    toggleMobileMenu();
  }
});

// ==========================================
// STICKY NAVBAR
// ==========================================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = scrollY;
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
function updateActiveNavLink() {
  let current = '';
  const scrollY = window.scrollY;
  
  allSections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==========================================
// DARK / LIGHT MODE
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  
  if (isLight) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('portfolio-theme', 'light');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('portfolio-theme', 'dark');
  }
}

themeToggle.addEventListener('click', toggleTheme);
initTheme();

// ==========================================
// TYPING ANIMATION
// ==========================================
const typingStrings = ['Web Developer', 'Software Developer', 'Creative Problem Solver'];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentString = typingStrings[typingIndex];
  
  if (isDeleting) {
    typingText.textContent = currentString.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentString.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentString.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingIndex = (typingIndex + 1) % typingStrings.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const elementVisible = 120;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  revealOnScroll();
  // Trigger hero elements immediately
  document.querySelectorAll('.hero .reveal, .hero > *').forEach(el => {
    el.classList.add('active');
  });
});

// ==========================================
// SKILL BAR ANIMATIONS
// ==========================================
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  
  if (sectionTop < windowHeight - 100) {
    skillsAnimated = true;
    
    progressFills.forEach(fill => {
      const progress = fill.getAttribute('data-progress');
      setTimeout(() => {
        fill.style.width = `${progress}%`;
      }, 200);
    });
  }
}

window.addEventListener('scroll', animateSkillBars);

// ==========================================
// COUNTER ANIMATIONS
// ==========================================
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;
  
  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  
  if (sectionTop < windowHeight - 100) {
    countersAnimated = true;
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };
      
      updateCounter();
    });
  }
}

window.addEventListener('scroll', animateCounters);

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// FORM VALIDATION
// ==========================================
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}-error`);
  
  field.classList.add('error');
  errorSpan.textContent = message;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`${fieldId}-error`);
  
  field.classList.remove('error');
  errorSpan.textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  let isValid = true;
  
  // Clear previous errors
  ['name', 'email', 'subject', 'message'].forEach(clearError);
  formStatus.className = 'form-status';
  formStatus.style.display = 'none';
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (!name || name.length < 2) {
    showError('name', 'Please enter your full name.');
    isValid = false;
  }
  
  if (!email || !validateEmail(email)) {
    showError('email', 'Please enter a valid email address.');
    isValid = false;
  }
  
  if (!subject || subject.length < 2) {
    showError('subject', 'Please enter a subject.');
    isValid = false;
  }
  
  if (!message || message.length < 10) {
    showError('message', 'Please enter a message (at least 10 characters).');
    isValid = false;
  }
  
  if (isValid) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      formStatus.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
      formStatus.className = 'form-status success';
      formStatus.style.display = 'block';
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }, 1500);
  }
});

// Clear error on input
['name', 'email', 'subject', 'message'].forEach(fieldId => {
  document.getElementById(fieldId).addEventListener('input', () => clearError(fieldId));
});

// ==========================================
// UPDATE DOM WITH CONFIG VALUES
// ==========================================
function applyConfig() {
  // Social links
  document.getElementById('social-github').href = CONFIG.github;
  document.getElementById('social-linkedin').href = CONFIG.linkedin;
  document.getElementById('social-instagram').href = CONFIG.instagram;
  document.getElementById('social-whatsapp').href = CONFIG.whatsapp;
  
  // CV buttons - force download
  const cvButtons = document.querySelectorAll('#cv-btn, #about-cv-btn');
  cvButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadCV();
    });
  });
  
  // Contact info
  document.getElementById('contact-email').textContent = CONFIG.email;
  document.getElementById('contact-github').textContent = CONFIG.github.replace('https://github.com/', '');
  document.getElementById('contact-linkedin').textContent = CONFIG.linkedin.replace('https://linkedin.com/in/', '');
  document.getElementById('contact-whatsapp').textContent = CONFIG.whatsapp.replace('https://wa.me/', '+');
  
  // Contact links
  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) emailLink.href = `mailto:${CONFIG.email}`;
  const githubLink = document.getElementById('contact-github-link');
  if (githubLink) githubLink.href = CONFIG.github;
  const linkedinLink = document.getElementById('contact-linkedin-link');
  if (linkedinLink) linkedinLink.href = CONFIG.linkedin;
  const whatsappLink = document.getElementById('contact-whatsapp-link');
  if (whatsappLink) whatsappLink.href = CONFIG.whatsapp;
  
  // Profile image fallback text
  document.querySelector('.image-fallback i').className = 'fas fa-user';
}

applyConfig();

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  revealOnScroll();
  animateSkillBars();
  animateCounters();
  typeEffect();
});

// Re-check on load (for cached elements)
window.addEventListener('load', () => {
  revealOnScroll();
  animateSkillBars();
  animateCounters();
});
