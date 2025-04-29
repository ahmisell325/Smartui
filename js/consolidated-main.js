/**
 * Main JavaScript file
 * Contains all functionality for the landing page
 */

document.addEventListener('DOMContentLoaded', () => {
  /************************************
   * Page Customizer
   ************************************/
  const customizer = document.getElementById('customizer');
  const customizerToggle = document.getElementById('customizer-toggle');
  const customizerClose = document.getElementById('customizer-close');
  const customizerReset = document.getElementById('customizer-reset');
  const customizerApply = document.getElementById('customizer-apply');
  
  // Layout controls
  const layoutWidth = document.getElementById('layout-width');
  const widthValue = document.getElementById('width-value');
  
  // Typography controls
  const fontSelect = document.getElementById('font-select');
  const fontSize = document.getElementById('font-size');
  const fontSizeValue = document.getElementById('font-size-value');
  
  // Content controls
  const editTitle = document.getElementById('edit-title');
  const editHeroTitle = document.getElementById('edit-hero-title');
  const editHeroDescription = document.getElementById('edit-hero-description');
  
  // Toggle the customizer panel
  customizerToggle.addEventListener('click', () => {
    customizer.classList.toggle('open');
  });
  
  customizerClose.addEventListener('click', () => {
    customizer.classList.remove('open');
  });
  
  // Handle theme options
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove active class from all options
      themeOptions.forEach(opt => opt.classList.remove('active'));
      
      // Add active class to clicked option
      option.classList.add('active');
      
      // Set theme
      const theme = option.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);
      
      // Store preference
      localStorage.setItem('custom-theme', theme);
    });
  });
  
  // Handle layout width changes
  layoutWidth.addEventListener('input', () => {
    widthValue.textContent = layoutWidth.value;
    document.querySelectorAll('.container').forEach(container => {
      container.style.maxWidth = `${layoutWidth.value}px`;
    });
  });
  
  // Handle font changes
  fontSelect.addEventListener('change', () => {
    document.documentElement.style.setProperty('--font-family', fontSelect.value);
  });
  
  fontSize.addEventListener('input', () => {
    fontSizeValue.textContent = fontSize.value;
    document.documentElement.style.fontSize = `${fontSize.value}px`;
  });
  
  // Handle section toggles
  const sectionToggles = {
    'toggle-hero': '#hero',
    'toggle-partners': '#partners',
    'toggle-features': '#features',
    'toggle-how-it-works': '#how-it-works',
    'toggle-pricing': '#pricing',
    'toggle-testimonials': '#testimonials',
    'toggle-faq': '#faq'
  };
  
  Object.entries(sectionToggles).forEach(([toggleId, sectionSelector]) => {
    const toggle = document.getElementById(toggleId);
    toggle.addEventListener('change', () => {
      const section = document.querySelector(sectionSelector);
      if (section) {
        section.style.display = toggle.checked ? 'block' : 'none';
      }
    });
  });
  
  // Handle content edits
  editTitle.addEventListener('input', () => {
    document.title = editTitle.value;
  });
  
  editHeroTitle.addEventListener('input', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.textContent = editHeroTitle.value;
    }
  });
  
  editHeroDescription.addEventListener('input', () => {
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
      heroDescription.textContent = editHeroDescription.value;
    }
  });
  
  // Apply changes
  customizerApply.addEventListener('click', () => {
    // Save all current customizations to localStorage
    const customizations = {
      theme: document.documentElement.getAttribute('data-theme') || 'default',
      containerWidth: layoutWidth.value,
      fontFamily: fontSelect.value,
      fontSize: fontSize.value,
      heroTitle: editHeroTitle.value,
      heroDescription: editHeroDescription.value,
      sectionVisibility: {}
    };
    
    // Save section visibility
    Object.keys(sectionToggles).forEach(toggleId => {
      customizations.sectionVisibility[toggleId] = document.getElementById(toggleId).checked;
    });
    
    localStorage.setItem('page-customizations', JSON.stringify(customizations));
    
    // Show confirmation
    alert('Your customizations have been saved!');
  });
  
  // Reset all customizations
  customizerReset.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all customizations?')) {
      // Clear localStorage
      localStorage.removeItem('page-customizations');
      localStorage.removeItem('custom-theme');
      
      // Reset controls to defaults
      document.documentElement.removeAttribute('data-theme');
      layoutWidth.value = 1280;
      widthValue.textContent = '1280';
      fontSelect.value = 'Inter, sans-serif';
      fontSize.value = 16;
      fontSizeValue.textContent = '16';
      editTitle.value = 'SmartUI - Analytics Platform';
      editHeroTitle.value = 'Transform Your Business with Our Platform';
      editHeroDescription.value = 'Empower your team with cutting-edge tools designed to boost productivity, streamline operations, and drive growth.';
      
      // Reset section visibility
      Object.keys(sectionToggles).forEach(toggleId => {
        document.getElementById(toggleId).checked = true;
        const section = document.querySelector(sectionToggles[toggleId]);
        if (section) {
          section.style.display = 'block';
        }
      });
      
      // Reset container width
      document.querySelectorAll('.container').forEach(container => {
        container.style.maxWidth = '';
      });
      
      // Reset font
      document.documentElement.style.fontSize = '';
      document.documentElement.style.setProperty('--font-family', '');
      
      // Reset theme options
      themeOptions.forEach(opt => opt.classList.remove('active'));
      document.querySelector('.theme-option[data-theme="default"]').classList.add('active');
      
      // Reset title and content
      document.title = 'SmartUI - Analytics Platform';
      const heroTitle = document.querySelector('.hero-title');
      const heroDescription = document.querySelector('.hero-description');
      if (heroTitle) {
        heroTitle.textContent = 'Transform Your Business with Our Platform';
      }
      if (heroDescription) {
        heroDescription.textContent = 'Empower your team with cutting-edge tools designed to boost productivity, streamline operations, and drive growth.';
      }
      
      alert('All customizations have been reset to default values.');
    }
  });
  
  // Load saved customizations
  const loadCustomizations = () => {
    const savedCustomizations = localStorage.getItem('page-customizations');
    if (savedCustomizations) {
      const customizations = JSON.parse(savedCustomizations);
      
      // Apply theme
      if (customizations.theme) {
        document.documentElement.setAttribute('data-theme', customizations.theme);
        themeOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelector(`.theme-option[data-theme="${customizations.theme}"]`).classList.add('active');
      }
      
      // Apply container width
      if (customizations.containerWidth) {
        layoutWidth.value = customizations.containerWidth;
        widthValue.textContent = customizations.containerWidth;
        document.querySelectorAll('.container').forEach(container => {
          container.style.maxWidth = `${customizations.containerWidth}px`;
        });
      }
      
      // Apply font family
      if (customizations.fontFamily) {
        fontSelect.value = customizations.fontFamily;
        document.documentElement.style.setProperty('--font-family', customizations.fontFamily);
      }
      
      // Apply font size
      if (customizations.fontSize) {
        fontSize.value = customizations.fontSize;
        fontSizeValue.textContent = customizations.fontSize;
        document.documentElement.style.fontSize = `${customizations.fontSize}px`;
      }
      
      // Apply content changes
      if (customizations.heroTitle) {
        editHeroTitle.value = customizations.heroTitle;
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
          heroTitle.textContent = customizations.heroTitle;
        }
      }
      
      if (customizations.heroDescription) {
        editHeroDescription.value = customizations.heroDescription;
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
          heroDescription.textContent = customizations.heroDescription;
        }
      }
      
      // Apply section visibility
      if (customizations.sectionVisibility) {
        Object.entries(customizations.sectionVisibility).forEach(([toggleId, isVisible]) => {
          const toggle = document.getElementById(toggleId);
          if (toggle) {
            toggle.checked = isVisible;
            const section = document.querySelector(sectionToggles[toggleId]);
            if (section) {
              section.style.display = isVisible ? 'block' : 'none';
            }
          }
        });
      }
    }
  };
  
  // Load customizations on page load
  loadCustomizations();

  /************************************
   * Theme Management
   ************************************/
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme based on stored preference or system preference
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      
      // Trigger a custom event for other components that might need to react to theme changes
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: {
          theme: isDark ? 'light' : 'dark'
        }
      }));
    });
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only change theme automatically if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  /************************************
   * Header & Navigation
   ************************************/
  const header = document.getElementById('header');
  const hamburger = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const searchToggle = document.getElementById('search-toggle');
  const cartToggle = document.getElementById('cart-toggle');
  
  // Enhanced mobile menu toggle with animation
  if (hamburger && mobileNav) {
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
  
  // Improved click outside functionality for mobile menu
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
  
  // Header scroll effect with smoother transition
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
    // Update progress bar
    updateProgressBar();
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

  // Search button functionality
  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      // You could implement a search modal or expand a search input here
      alert('Search functionality will be implemented soon!');
    });
  }

  // Cart button functionality
  if (cartToggle) {
    cartToggle.addEventListener('click', () => {
      // You could implement a cart slide-out or modal here
      alert('Cart functionality will be implemented soon!');
    });
  }

  /************************************
   * Navigation & Scrolling
   ************************************/
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
      const activeLinks = document.querySelectorAll(`.nav-link[href="#${sectionId}"]`);
      
      activeLinks.forEach(link => {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      });
    }
  }
  
  // Update progress bar width based on scroll position
  const progressBar = document.getElementById('progress-bar');
  function updateProgressBar() {
    if (progressBar) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      progressBar.style.width = `${scrolledPercentage}%`;
    }
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Only intercept anchor links to actual elements
      if (targetId !== '#' && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
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
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /************************************
   * Hero Section Animations
   ************************************/
  function animateHeroElements() {
    const heroElements = document.querySelectorAll('.hero-section .fade-in');
    
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, 300 * index);
    });
    
    // Animate statistics with counting effect
    animateStats();
  }
  
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const targetValue = stat.innerText;
      let startValue = 0;
      let duration = 2000; // 2 seconds
      
      // Check if the stat contains a plus sign or percentage
      const hasPlus = targetValue.includes('+');
      const hasPercent = targetValue.includes('%');
      const isNumeric = !isNaN(parseInt(targetValue));
      
      // Only animate numeric values
      if (isNumeric) {
        // Parse the numeric part
        let numericValue = parseInt(targetValue);
        
        // Set a higher start value for better animation
        startValue = Math.floor(numericValue * 0.5);
        
        const increment = (numericValue - startValue) / (duration / 16);
        let currentValue = startValue;
        
        // Set initial text
        stat.innerText = startValue + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        
        function updateValue() {
          currentValue += increment;
          
          if (currentValue >= numericValue) {
            currentValue = numericValue;
            // Restore original text with any special characters
            stat.innerText = targetValue;
          } else {
            // Update with current value and special characters
            stat.innerText = Math.floor(currentValue) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            requestAnimationFrame(updateValue);
          }
        }
        
        // Start animation after a delay
        setTimeout(() => {
          requestAnimationFrame(updateValue);
        }, 500);
      }
    });
  }

  /************************************
   * Features Section
   ************************************/
  function animateFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    
    featureCards.forEach(card => {
      observer.observe(card);
    });
  }

  /************************************
   * Pricing Section
   ************************************/
  const billingToggle = document.getElementById('billing-toggle');
  const pricingGrid = document.querySelector('.pricing-grid');
  const monthlyPrices = document.querySelectorAll('.price.monthly');
  const annualPrices = document.querySelectorAll('.price.annual');
  
  if (billingToggle && pricingGrid) {
    billingToggle.addEventListener('change', () => {
      // Create accessible announcement
      const liveRegion = document.getElementById('pricing-live-region') || createLiveRegion();
      
      if (billingToggle.checked) {
        pricingGrid.classList.add('annual-active');
        announceMessage('Switched to annual billing');
        
        // Add animation class to prices
        annualPrices.forEach(price => {
          price.classList.add('price-animate');
        });
      } else {
        pricingGrid.classList.remove('annual-active');
        announceMessage('Switched to monthly billing');
        
        // Add animation class to prices
        monthlyPrices.forEach(price => {
          price.classList.add('price-animate');
        });
      }
      
      // Remove animation class after animation completes
      setTimeout(() => {
        document.querySelectorAll('.price').forEach(price => {
          price.classList.remove('price-animate');
        });
      }, 500);
    });
    
    // Handle "Contact Sales" button for Enterprise plan
    const enterpriseBtn = document.getElementById('enterprise-btn');
    if (enterpriseBtn) {
      enterpriseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('plan-modal');
      });
    }
  }
  
  // Create live region for accessibility announcements
  function createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'pricing-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    return liveRegion;
  }
  
  // Announce message to screen readers
  function announceMessage(message) {
    const liveRegion = document.getElementById('pricing-live-region') || createLiveRegion();
    liveRegion.textContent = message;
  }

  /************************************
   * Testimonials Section
   ************************************/
  const testimonialSlider = document.getElementById('testimonials-slider');
  const testimonialDots = document.getElementById('testimonial-dots');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  
  if (testimonialSlider && testimonialDots) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const dots = testimonialDots.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoplayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Create live region for accessibility announcements
    function createLiveRegion() {
      const liveRegion = document.createElement('div');
      liveRegion.id = 'testimonials-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      testimonialSlider.appendChild(liveRegion);
      return liveRegion;
    }
    
    // Announce slide change to screen readers
    function announceSlideChange(index) {
      const liveRegion = document.getElementById('testimonials-live-region') || createLiveRegion();
      const authorName = slides[index].querySelector('.author-name').textContent;
      const authorPosition = slides[index].querySelector('.author-position').textContent;
      liveRegion.textContent = `Now showing testimonial from ${authorName}, ${authorPosition}`;
    }
    
    // Show slide at the given index
    function showSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      
      // Hide all slides
      slides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
          slide.style.display = 'none';
        }, 300);
      });
      
      // Show the current slide with animation
      setTimeout(() => {
        slides[index].style.display = 'block';
        slides[index].offsetHeight; // Force reflow
        slides[index].style.opacity = '1';
        slides[index].style.transform = 'translateX(0)';
      }, 300);
      
      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index);
      });
      
      // Update current index
      currentIndex = index;
      
      // Announce for screen readers
      announceSlideChange(index);
      
      // Reset autoplay
      resetAutoplay();
    }
    
    // Next slide function
    function nextSlide() {
      showSlide(currentIndex + 1);
    }
    
    // Previous slide function
    function prevSlide() {
      showSlide(currentIndex - 1);
    }
    
    // Create progress indicator
    function createProgressIndicator() {
      const progressBar = document.createElement('div');
      progressBar.className = 'testimonial-progress';
      testimonialSlider.appendChild(progressBar);
      
      // Add animation
      progressBar.style.width = '0%';
      progressBar.style.height = '3px';
      progressBar.style.backgroundColor = 'hsl(var(--primary))';
      progressBar.style.position = 'absolute';
      progressBar.style.bottom = '0';
      progressBar.style.left = '0';
      progressBar.style.transition = 'width 5s linear';
      
      return progressBar;
    }
    
    // Start autoplay function
    function startAutoplay() {
      const progressBar = testimonialSlider.querySelector('.testimonial-progress') || createProgressIndicator();
      
      // Reset progress bar
      progressBar.style.width = '0%';
      
      // Start progress animation
      setTimeout(() => {
        progressBar.style.width = '100%';
      }, 50);
      
      // Set interval for next slide
      autoplayInterval = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
    
    // Reset autoplay
    function resetAutoplay() {
      clearTimeout(autoplayInterval);
      
      const progressBar = testimonialSlider.querySelector('.testimonial-progress');
      if (progressBar) {
        progressBar.style.width = '0%';
      }
      
      startAutoplay();
    }
    
    // Handle swipe gestures
    function handleSwipe() {
      testimonialSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      testimonialSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        
        // Check direction of swipe
        if (touchEndX < touchStartX) {
          // Swipe left, go to next slide
          nextSlide();
        } else if (touchEndX > touchStartX) {
          // Swipe right, go to previous slide
          prevSlide();
        }
      }, { passive: true });
    }
    
    // Add event listeners
    if (prevButton) {
      prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', nextSlide);
    }
    
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
      });
      
      // Set initial ARIA attributes
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === currentIndex);
      dot.setAttribute('tabindex', i === currentIndex ? '0' : '-1');
    });
    
    // Initialize
    showSlide(0);
    startAutoplay();
    handleSwipe();
    
    // Handle keyboard navigation
    testimonialDots.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        showSlide(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        showSlide(currentIndex - 1);
      }
    });
    
    // Pause autoplay when user interacts with controls
    testimonialSlider.addEventListener('mouseenter', () => {
      clearTimeout(autoplayInterval);
      const progressBar = testimonialSlider.querySelector('.testimonial-progress');
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
      }
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      startAutoplay();
      const progressBar = testimonialSlider.querySelector('.testimonial-progress');
      if (progressBar) {
        progressBar.style.transition = 'width 5s linear';
      }
    });
  }

  /************************************
   * FAQ Section
   ************************************/
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      // Set initial ARIA attributes
      question.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = '0';
      answer.style.opacity = '0';
      answer.style.visibility = 'hidden';
      
      question.addEventListener('click', () => {
        // Toggle the active state
        const expanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherQuestion = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            
            otherQuestion.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = '0';
            otherAnswer.style.opacity = '0';
            
            // Hide after animation completes
            setTimeout(() => {
              if (otherQuestion.getAttribute('aria-expanded') === 'false') {
                otherAnswer.style.visibility = 'hidden';
              }
            }, 300);
          }
        });
        
        // Toggle this item
        question.setAttribute('aria-expanded', !expanded);
        
        if (!expanded) {
          // Opening
          answer.style.visibility = 'visible';
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.opacity = '1';
        } else {
          // Closing
          answer.style.maxHeight = '0';
          answer.style.opacity = '0';
          
          // Hide after animation completes
          setTimeout(() => {
            if (question.getAttribute('aria-expanded') === 'false') {
              answer.style.visibility = 'hidden';
            }
          }, 300);
        }
      });
    });
    
    // Open FAQ from URL hash
    function openFaqFromHash() {
      if (window.location.hash) {
        const faqId = window.location.hash.substring(1);
        const targetFaq = document.getElementById(faqId);
        
        if (targetFaq && targetFaq.classList.contains('faq-item')) {
          const question = targetFaq.querySelector('.faq-question');
          if (question) {
            // Scroll into view with offset
            setTimeout(() => {
              const headerHeight = document.querySelector('header').offsetHeight;
              window.scrollTo({
                top: targetFaq.offsetTop - headerHeight - 20,
                behavior: 'smooth'
              });
              
              // Expand the FAQ
              question.click();
            }, 300);
          }
        }
      }
    }
    
    // Open FAQ from hash on page load
    openFaqFromHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', openFaqFromHash);
  }

  /************************************
   * Newsletter Section
   ************************************/
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const messageContainer = document.getElementById('newsletter-message');
    
    // Email validation function
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Show message function
    function showMessage(message, type = 'success') {
      if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `form-message ${type}`;
        
        // Add animation
        messageContainer.style.opacity = '0';
        messageContainer.style.transform = 'translateY(-10px)';
        messageContainer.style.display = 'block';
        
        // Force reflow
        messageContainer.offsetHeight;
        
        // Add animation
        messageContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageContainer.style.opacity = '1';
        messageContainer.style.transform = 'translateY(0)';
        
        // Clear message after 5 seconds for success messages
        if (type === 'success') {
          setTimeout(() => {
            messageContainer.style.opacity = '0';
            messageContainer.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
              messageContainer.style.display = 'none';
            }, 300);
          }, 5000);
        }
      }
    }
    
    // Handle form submission
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      // Validate email
      if (!email) {
        showMessage('Please enter your email address.', 'error');
        emailInput.focus();
        return;
      }
      
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }
      
      // Here you would typically send the data to your server
      // For this demo, we'll simulate a successful subscription
      
      showMessage('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    });
    
    // Live validation feedback
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        
        if (email && !isValidEmail(email)) {
          emailInput.classList.add('invalid');
          emailInput.setCustomValidity('Please enter a valid email address');
        } else {
          emailInput.classList.remove('invalid');
          emailInput.setCustomValidity('');
        }
      });
    }
  }

  /************************************
   * Modal functionality
   ************************************/
  // Open modal function
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Add animation classes
      setTimeout(() => {
        modal.classList.add('active');
        
        // Set focus to the first focusable element
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length) {
          focusableElements[0].focus();
        }
      }, 10);
      
      // Close when clicking the overlay or close button
      const overlay = modal.querySelector('.modal-overlay');
      const closeBtn = modal.querySelector('.modal-close');
      
      if (overlay) {
        overlay.addEventListener('click', () => {
          closeModal(modalId);
        });
      }
      
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          closeModal(modalId);
        });
      }
      
      // Handle tab key to keep focus trapped in modal
      modal.addEventListener('keydown', handleModalKeydown);
    }
  }
  
  // Close modal function
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (modal) {
      modal.classList.remove('active');
      
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
      
      // Remove event listener
      modal.removeEventListener('keydown', handleModalKeydown);
    }
  }
  
  // Handle keydown events for modal
  function handleModalKeydown(e) {
    if (e.key === 'Escape') {
      const modalId = e.currentTarget.id;
      closeModal(modalId);
    } else if (e.key === 'Tab') {
      const focusableElements = e.currentTarget.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }
  
  // Modal event listeners
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = button.getAttribute('data-modal');
      openModal(modalId);
    });
  });
  
  // Contact form in modal
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Here you would typically send the data to your server
      // For this demo, we'll simulate a successful submission
      
      // Get the parent modal
      const modal = contactForm.closest('.modal');
      const modalBody = modal.querySelector('.modal-body');
      
      // Show success message
      modalBody.innerHTML = `
        <div class="success-message">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3>Thank You!</h3>
          <p>Your message has been sent successfully. Our team will contact you shortly.</p>
          <button class="btn btn-primary close-modal-btn">Close</button>
        </div>
      `;
      
      // Add event listener to close button
      const closeBtn = modalBody.querySelector('.close-modal-btn');
      closeBtn.addEventListener('click', () => {
        closeModal(modal.id);
      });
    });
  }

  /************************************
   * Cookie Banner
   ************************************/
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const customizeBtn = document.getElementById('cookie-customize');
  
  if (cookieBanner && acceptBtn) {
    // Check if consent cookie exists
    const hasConsent = localStorage.getItem('cookieConsent');
    
    if (!hasConsent) {
      // Show the banner with animation
      setTimeout(() => {
        cookieBanner.style.display = 'block';
        cookieBanner.offsetHeight; // Force reflow
        cookieBanner.style.transform = 'translateY(0)';
        cookieBanner.style.opacity = '1';
      }, 1000); // Show after 1 second
    }
    
    // Hide the banner function
    function hideBanner() {
      cookieBanner.style.transform = 'translateY(20px)';
      cookieBanner.style.opacity = '0';
      
      setTimeout(() => {
        cookieBanner.style.display = 'none';
      }, 300);
    }
    
    // Accept all cookies
    acceptBtn.addEventListener('click', () => {
      acceptAllCookies();
      hideBanner();
    });
    
    // Customize cookies (could open a modal with more options)
    if (customizeBtn) {
      customizeBtn.addEventListener('click', () => {
        // For now, just set necessary cookies
        setNecessaryCookies();
        hideBanner();
        
        // Here you could open a modal with more detailed options
      });
    }
    
    // Set all cookies function
    function acceptAllCookies() {
      setConsentCookie('all', 365);
      // Here you would typically initialize all your cookies and tracking scripts
    }
    
    // Set only necessary cookies function
    function setNecessaryCookies() {
      setConsentCookie('necessary', 365);
      // Here you would only initialize essential cookies
    }
    
    // Helper function to set the consent cookie
    function setConsentCookie(value, days) {
      localStorage.setItem('cookieConsent', value);
    }
  }

  /************************************
   * Back to Top Button
   ************************************/
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    // Show button when scrolling down
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /************************************
   * Initialization
   ************************************/
  // Initialize all components
  handleHeaderScroll();
  updateActiveNavLink();
  updateProgressBar();
  animateHeroElements();
  animateFeatureCards();
  
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
        const modal = document.querySelector('.modal.active');
        if (modal) {
          closeModal(modal.id);
        }
      }
    });
  }
  
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
});

// Make key functions available globally
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation classes
    setTimeout(() => {
      modal.classList.add('active');
      
      // Set focus to the first focusable element
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length) {
        focusableElements[0].focus();
      }
    }, 10);
    
    // Close when clicking the overlay or close button
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    if (overlay) {
      overlay.addEventListener('click', () => {
        closeModal(modalId);
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal(modalId);
      });
    }
    
    // Handle tab key to keep focus trapped in modal
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(modalId);
      } else if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  
  if (modal) {
    modal.classList.remove('active');
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
};