/**
 * Testimonials component functionality
 * Handles testimonial slider functionality with enhanced animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialSlider = document.getElementById('testimonials-slider');
  
  // Create dots container if it doesn't exist
  let dotsContainer = document.querySelector('.testimonial-dots');
  let prevButton = document.getElementById('prev-testimonial');
  let nextButton = document.getElementById('next-testimonial');
  
  // Create the navigation controls if they don't exist
  if (!dotsContainer || !prevButton || !nextButton) {
    const controlsHtml = `
      <div class="testimonial-controls">
        <button id="prev-testimonial" class="testimonial-control-btn" aria-label="Previous testimonial">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="testimonial-dots"></div>
        <button id="next-testimonial" class="testimonial-control-btn" aria-label="Next testimonial">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    `;
    
    testimonialSlider.insertAdjacentHTML('afterend', controlsHtml);
    
    // Get the newly created elements
    dotsContainer = document.querySelector('.testimonial-dots');
    prevButton = document.getElementById('prev-testimonial');
    nextButton = document.getElementById('next-testimonial');
    
    // Create dots based on number of slides
    testimonialSlides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      if (index === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });
  }
  
  const dots = document.querySelectorAll('.dot');
  
  let currentSlide = 0;
  let autoplayInterval;
  let isTransitioning = false;
  
  // Create a live region for accessibility announcements
  function createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.classList.add('sr-only');
    document.body.appendChild(liveRegion);
    return liveRegion;
  }
  
  // Add screen reader announcement
  const liveRegion = createLiveRegion();
  function announceSlideChange(index) {
    const authorName = testimonialSlides[index].querySelector('.author-name').textContent;
    liveRegion.textContent = `Showing testimonial from ${authorName}, ${index + 1} of ${testimonialSlides.length}`;
  }
  
  // Enhanced slide transition with animation
  function showSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Handle index bounds
    if (index >= testimonialSlides.length) {
      index = 0;
    } else if (index < 0) {
      index = testimonialSlides.length - 1;
    }
    
    // Get current and next slides
    const currentSlideElement = testimonialSlides[currentSlide];
    const nextSlideElement = testimonialSlides[index];
    
    // Add transition classes
    currentSlideElement.classList.add('fade-out');
    
    // After current slide fades out
    setTimeout(() => {
      // Hide all slides
      testimonialSlides.forEach(slide => {
        slide.classList.remove('active', 'fade-out', 'fade-in');
        slide.setAttribute('aria-hidden', 'true');
      });
      
      // Show the target slide
      nextSlideElement.classList.add('active');
      nextSlideElement.classList.add('fade-in');
      nextSlideElement.setAttribute('aria-hidden', 'false');
      
      // Update dots
      dots.forEach(dot => {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      });
      
      dots[index].classList.add('active');
      dots[index].setAttribute('aria-selected', 'true');
      
      // Update current slide index
      currentSlide = index;
      
      // Announce for screen readers
      announceSlideChange(index);
      
      isTransitioning = false;
    }, 300); // Match the fadeOut animation duration
  }
  
  // Function to go to the next slide
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  // Function to go to the previous slide
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  // Set up button click handlers with improved feedback
  prevButton.addEventListener('click', () => {
    prevButton.classList.add('active-control');
    setTimeout(() => {
      prevButton.classList.remove('active-control');
    }, 200);
    prevSlide();
    resetAutoplay();
  });
  
  nextButton.addEventListener('click', () => {
    nextButton.classList.add('active-control');
    setTimeout(() => {
      nextButton.classList.remove('active-control');
    }, 200);
    nextSlide();
    resetAutoplay();
  });
  
  // Set up dot click handlers with visual feedback
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (currentSlide !== index) {
        // Add pulse animation to clicked dot
        dot.classList.add('pulse');
        setTimeout(() => {
          dot.classList.remove('pulse');
        }, 500);
        
        showSlide(index);
        resetAutoplay();
      }
    });
  });
  
  // Improved autoplay with progress indicator
  function createProgressIndicator() {
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'slide-progress';
    testimonialSlider.appendChild(progressIndicator);
    return progressIndicator;
  }
  
  const progressIndicator = createProgressIndicator();
  
  // Start autoplay with progress animation
  function startAutoplay() {
    // Reset progress indicator
    progressIndicator.style.width = '0%';
    
    // Animate progress indicator
    progressIndicator.style.transition = 'width 5000ms linear';
    progressIndicator.style.width = '100%';
    
    autoplayInterval = setTimeout(() => {
      nextSlide();
      startAutoplay();
    }, 5000); // Change slide every 5 seconds
  }
  
  // Reset autoplay timer
  function resetAutoplay() {
    clearTimeout(autoplayInterval);
    progressIndicator.style.transition = 'none';
    progressIndicator.style.width = '0%';
    
    // Force a reflow to ensure the transition is reset
    progressIndicator.offsetHeight;
    
    startAutoplay();
  }
  
  // Initialize first slide
  testimonialSlides[0].classList.add('active');
  testimonialSlides[0].setAttribute('aria-hidden', 'false');
  
  // Start autoplay
  startAutoplay();
  
  // Pause autoplay when hovering over slider
  testimonialSlider.addEventListener('mouseenter', () => {
    clearTimeout(autoplayInterval);
    progressIndicator.style.transition = 'none';
    progressIndicator.style.width = progressIndicator.offsetWidth + 'px';
  });
  
  testimonialSlider.addEventListener('mouseleave', () => {
    const remainingTime = 5000 * (1 - (progressIndicator.offsetWidth / progressIndicator.parentElement.offsetWidth));
    
    // Reset the progress animation based on current position
    progressIndicator.style.transition = `width ${remainingTime}ms linear`;
    progressIndicator.style.width = '100%';
    
    // Clear existing timeout and start a new one with adjusted time
    clearTimeout(autoplayInterval);
    autoplayInterval = setTimeout(() => {
      nextSlide();
      startAutoplay();
    }, remainingTime);
  });
  
  // Add touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  testimonialSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    
    // Pause autoplay on touch
    clearTimeout(autoplayInterval);
    progressIndicator.style.transition = 'none';
    progressIndicator.style.width = progressIndicator.offsetWidth + 'px';
  });
  
  testimonialSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    
    // Resume autoplay
    resetAutoplay();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to register as a swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left -> next slide
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right -> previous slide
      prevSlide();
    }
  }
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only handle keypresses when focused within the testimonials section
    const testimonialSection = document.getElementById('testimonials');
    if (testimonialSection.contains(document.activeElement)) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoplay();
      }
    }
  });
});
