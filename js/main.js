/**
 * Main JavaScript file
 * Initializes components and handles global functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize progress bar
  const progressBar = document.getElementById('progress-bar');
  
  // Update progress bar width based on scroll position
  function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    progressBar.style.width = `${scrolledPercentage}%`;
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', updateProgressBar);
  
  // Set active nav link based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const scrollPosition = window.scrollY + 100; // Add offset to account for header
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Add scroll event listener for active nav link
  window.addEventListener('scroll', setActiveNavLink);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 72, // Account for header height
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const mobileNav = document.getElementById('mobile-nav');
        const hamburger = document.getElementById('mobile-menu-toggle');
        if (mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // Call setActiveNavLink on page load
  setActiveNavLink();

  // Handle print requests
  window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
  });

  // Initialize tooltips
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => {
    const tooltipText = document.createElement('span');
    tooltipText.classList.add('tooltip-text');
    tooltipText.textContent = tooltip.getAttribute('data-tooltip');
    tooltip.appendChild(tooltipText);
  });

  // Initialize accessibility features 
  initializeAccessibility();

  // Function to enable basic accessibility features
  function initializeAccessibility() {
    // Ensure all interactive elements can be focused
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    interactiveElements.forEach(element => {
      if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
        console.warn('Interactive element without accessible name:', element);
      }
    });

    // Add escape key listener for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.querySelector('.modal[style*="display: block"]');
        if (modal) {
          closeModal(modal.id);
        }
      }
    });
  }
});
