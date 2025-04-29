/**
 * Header component functionality
 * Handles mobile menu toggle and header scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Set aria-expanded for accessibility
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      mobileNav.classList.contains('active') && 
      !mobileNav.contains(e.target) && 
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });
  
  // Apply shadow to header on scroll
  function handleHeaderScroll() {
    if (window.scrollY > 10) {
      header.classList.add('shadow');
    } else {
      header.classList.remove('shadow');
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Handle keyboard navigation in mobile menu
  const mobileNavLinks = mobileNav.querySelectorAll('a');
  
  mobileNavLinks.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
      // Close menu on Escape key
      if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
        hamburger.focus();
      }
      
      // Handle Tab key to keep focus trapped in menu when open
      if (e.key === 'Tab') {
        if (index === mobileNavLinks.length - 1 && !e.shiftKey) {
          e.preventDefault();
          mobileNavLinks[0].focus();
        } else if (index === 0 && e.shiftKey) {
          e.preventDefault();
          mobileNavLinks[mobileNavLinks.length - 1].focus();
        }
      }
    });
  });
  
  // Call handleHeaderScroll on page load
  handleHeaderScroll();
});
