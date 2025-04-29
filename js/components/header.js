/**
 * Header component functionality
 * Handles mobile menu toggle and header scroll effects with enhanced interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  
  // Enhanced mobile menu toggle with animation
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default behavior
      hamburger.classList.toggle('active');
      
      // Use animation for smoother transition
      if (!mobileNav.classList.contains('active')) {
        // Opening the menu
        mobileNav.style.display = 'flex'; // Change to flex to match the flex-direction: column in CSS
        
        // Create an overlay for background dimming
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = `${header.offsetHeight}px`;
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.zIndex = '98';
        document.body.appendChild(overlay);
        
        // Force a reflow to ensure the animation works
        mobileNav.offsetHeight;
        mobileNav.classList.add('active');
        
        // Fade in the overlay
        setTimeout(() => {
          overlay.style.opacity = '1';
        }, 10);
        
        // Animate in each menu item with a slight delay between each
        const menuItems = mobileNav.querySelectorAll('a');
        menuItems.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100 + (index * 50)); // Staggered animation
        });
      } else {
        // Closing the menu - add a slight delay to allow for animation
        mobileNav.classList.remove('active');
        
        // Fade out the overlay
        const overlay = document.querySelector('.mobile-nav-overlay');
        if (overlay) {
          overlay.style.opacity = '0';
          
          // Remove overlay after animation completes
          setTimeout(() => {
            document.body.removeChild(overlay);
          }, 300);
        }
        
        // Reset the menu item animations
        const menuItems = mobileNav.querySelectorAll('a');
        menuItems.forEach(item => {
          item.style.transition = 'none';
          item.style.opacity = '';
          item.style.transform = '';
        });
        
        setTimeout(() => {
          mobileNav.style.display = '';
        }, 300); // Match the CSS transition duration
      }
      
      // Set aria-expanded for accessibility
      const isExpanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      
      // Prevent scrolling when menu is open with a smooth transition
      if (isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        // Wait for the animation to complete before re-enabling scrolling
        setTimeout(() => {
          document.body.style.overflow = '';
        }, 300);
      }
    });
  }
  
  // Improved click outside functionality
  document.addEventListener('click', (e) => {
    if (
      mobileNav && 
      mobileNav.classList.contains('active') && 
      !mobileNav.contains(e.target) && 
      !hamburger.contains(e.target)
    ) {
      // Trigger the close animation
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
      
      // Fade out the overlay
      const overlay = document.querySelector('.mobile-nav-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        
        // Remove overlay after animation completes
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }, 300);
      }
      
      // Reset the menu item animations
      const menuItems = mobileNav.querySelectorAll('a');
      menuItems.forEach(item => {
        item.style.transition = 'none';
        item.style.opacity = '';
        item.style.transform = '';
      });
      
      // Wait for animation to complete
      setTimeout(() => {
        mobileNav.style.display = '';
        document.body.style.overflow = '';
      }, 300);
    }
  });
  
  // Highlight active navigation link based on scroll position
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100; // Add offset to account for header height
    
    // Get all sections that are targets of navigation
    const sections = Array.from(document.querySelectorAll('section[id]'));
    
    // Find the current section
    let currentSection = null;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (scrollPosition >= section.offsetTop) {
        currentSection = section;
        break;
      }
    }
    
    // Clear active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.setAttribute('aria-current', 'false');
    });
    
    // Set active class on links pointing to current section
    if (currentSection) {
      const sectionId = currentSection.id;
      const activeLinks = document.querySelectorAll(`.nav-links a[href="#${sectionId}"], .mobile-nav a[href="#${sectionId}"]`);
      
      activeLinks.forEach(link => {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      });
    }
  }
  
  // Enhanced header scroll effect with smoother transition
  function handleHeaderScroll() {
    if (window.scrollY > 10) {
      if (!header.classList.contains('shadow')) {
        header.classList.add('shadow');
        header.classList.add('scrolled');
      }
    } else {
      header.classList.remove('shadow');
      header.classList.remove('scrolled');
    }
    
    // Update the active navigation link
    updateActiveNavLink();
  }
  
  // Throttle scroll event for better performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        handleHeaderScroll();
        scrollTimeout = null;
      }, 50); // Throttle to run at most every 50ms
    }
  });
  
  // Smooth scroll when clicking on navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Only intercept anchor links
      if (targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          if (mobileNav && mobileNav.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
            
            // Remove overlay
            const overlay = document.querySelector('.mobile-nav-overlay');
            if (overlay) {
              overlay.style.opacity = '0';
              setTimeout(() => {
                if (document.body.contains(overlay)) {
                  document.body.removeChild(overlay);
                }
              }, 300);
            }
            
            document.body.style.overflow = '';
          }
          
          // Scroll to target with smooth behavior
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Enhanced keyboard navigation in mobile menu
  if (mobileNav) {
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    
    mobileNavLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        // Close menu on Escape key
        if (e.key === 'Escape') {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
          hamburger.setAttribute('aria-expanded', false);
          
          // Remove overlay
          const overlay = document.querySelector('.mobile-nav-overlay');
          if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
              if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
              }
            }, 300);
          }
          
          document.body.style.overflow = '';
          setTimeout(() => {
            hamburger.focus();
          }, 10);
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
  }
  
  // Call handleHeaderScroll on page load
  handleHeaderScroll();
  
  // Update active link on page load
  updateActiveNavLink();
});
