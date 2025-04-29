/**
 * Hero component functionality
 * Adds animations and interactive elements to the hero section
 */

document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('hero');
  
  // Add staggered fade-in animations to hero elements
  function animateHeroElements() {
    const elements = heroSection.querySelectorAll('.fade-in');
    
    elements.forEach((element, index) => {
      // Add delay based on index
      element.style.animationDelay = `${index * 0.15}s`;
    });
  }
  
  // Initialize hero animations
  animateHeroElements();
  
  // Optional: Add parallax effect to hero image on mouse move
  const heroImage = heroSection.querySelector('.hero-image');
  
  if (heroImage) {
    heroSection.addEventListener('mousemove', (e) => {
      // Don't apply effect on mobile devices
      if (window.innerWidth < 768) return;
      
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      heroImage.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    });
  }
  
  // Reset transform when mouse leaves the section
  heroSection.addEventListener('mouseleave', () => {
    if (heroImage) {
      heroImage.style.transform = 'translate(0, 0)';
    }
  });
  
  // Animate hero stats with counter effect
  function animateStats() {
    const stats = heroSection.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
      const targetValue = stat.textContent;
      const suffix = targetValue.replace(/[0-9.]/g, ''); // Extract any suffix like k, % etc.
      const targetNumber = parseFloat(targetValue.replace(/[^0-9.]/g, '')); // Extract just the number
      
      // Only animate if it's a number
      if (!isNaN(targetNumber)) {
        let startValue = 0;
        const duration = 2000; // 2 seconds
        const step = targetNumber / (duration / 16); // 60fps approx
        
        function updateValue() {
          startValue += step;
          if (startValue < targetNumber) {
            stat.textContent = Math.floor(startValue) + suffix;
            requestAnimationFrame(updateValue);
          } else {
            stat.textContent = targetValue; // Ensure we end with the exact target
          }
        }
        
        // Use Intersection Observer to trigger animation when in view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              requestAnimationFrame(updateValue);
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(stat);
      }
    });
  }
  
  // Initialize stats animation if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    animateStats();
  }
});
