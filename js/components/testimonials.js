/**
 * Testimonials component functionality
 * Handles testimonial slider functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  
  let currentSlide = 0;
  let autoplayInterval;
  
  // Function to display a specific slide
  function showSlide(index) {
    // Handle index bounds
    if (index >= testimonialSlides.length) {
      index = 0;
    } else if (index < 0) {
      index = testimonialSlides.length - 1;
    }
    
    // Hide all slides
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    });
    
    // Show the target slide
    testimonialSlides[index].classList.add('active');
    testimonialSlides[index].setAttribute('aria-hidden', 'false');
    
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
  }
  
  // Function to go to the next slide
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  // Function to go to the previous slide
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  // Set up button click handlers
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }
  
  // Set up dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoplay();
    });
  });
  
  // Start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
  
  // Reset autoplay timer
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  
  // Initialize first slide
  showSlide(0);
  
  // Start autoplay
  startAutoplay();
  
  // Pause autoplay when hovering over slider
  const slider = document.getElementById('testimonials-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      startAutoplay();
    });
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
});
