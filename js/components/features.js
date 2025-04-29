/**
 * Features component functionality
 * Handles animations and interactions for the features section
 */

document.addEventListener('DOMContentLoaded', () => {
  const featureCards = document.querySelectorAll('.feature-card');
  
  // Add animation when feature cards come into view
  function animateFeatureCards() {
    // Use Intersection Observer if supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add a delay based on the index for staggered animation
            setTimeout(() => {
              entry.target.classList.add('fade-in');
            }, index * 100);
            
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Observe each feature card
      featureCards.forEach(card => {
        observer.observe(card);
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      featureCards.forEach(card => {
        card.classList.add('fade-in');
      });
    }
  }
  
  // Initialize feature card animations
  animateFeatureCards();
  
  // Add hover effects for feature icons
  featureCards.forEach(card => {
    const icon = card.querySelector('.feature-icon');
    
    if (icon) {
      card.addEventListener('mouseenter', () => {
        icon.classList.add('pulse');
      });
      
      card.addEventListener('mouseleave', () => {
        icon.classList.remove('pulse');
      });
    }
  });
  
  // Optional: Add click event for feature cards to show more details
  featureCards.forEach(card => {
    card.addEventListener('click', () => {
      // This could be used to show a modal with more details about the feature
      // For now, we'll just add a subtle feedback effect
      card.classList.add('shake');
      
      // Remove the effect after animation completes
      setTimeout(() => {
        card.classList.remove('shake');
      }, 500); // 500ms matches the shake animation duration
    });
  });
});
