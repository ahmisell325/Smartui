/**
 * Pricing component functionality
 * Handles billing toggle and pricing interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const billingToggle = document.getElementById('billing-toggle');
  const pricingCards = document.querySelectorAll('.pricing-card');
  const enterpriseBtn = document.getElementById('enterprise-btn');
  
  // Create a live region for accessibility announcements first
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
  function announceMessage(message) {
    liveRegion.textContent = message;
  }
  
  // Add accessibility attributes to toggle
  if (billingToggle) {
    billingToggle.setAttribute('aria-label', 'Toggle between monthly and annual billing');
    
    // Toggle between monthly and annual pricing
    billingToggle.addEventListener('change', () => {
      const isAnnual = billingToggle.checked;
      
      // Add or remove class to control pricing display
      document.body.classList.toggle('annual-active', isAnnual);
      
      // Animate price change
      pricingCards.forEach(card => {
        const priceElements = card.querySelectorAll('.price');
        priceElements.forEach(price => {
          price.classList.add('price-animate');
          setTimeout(() => {
            price.classList.remove('price-animate');
          }, 500);
        });
      });
      
      // Announce for screen readers
      announceMessage(isAnnual ? 'Showing annual pricing' : 'Showing monthly pricing');
    });
  }
  
  // Add hover effect to pricing cards with enhanced animations
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('popular')) {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 15px 25px -10px rgba(0, 0, 0, 0.15)';
        card.style.borderColor = 'hsl(var(--primary) / 0.5)';
      } else {
        // Popular card is already elevated, push it a bit higher
        card.style.transform = 'translateY(-20px)';
        card.style.boxShadow = '0 20px 30px -15px rgba(0, 0, 0, 0.2)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('popular')) {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = '';
      } else {
        // Reset to its original elevated position
        card.style.transform = 'translateY(-16px)';
        card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)';
      }
    });
  });
  
  // Handle enterprise plan button click (show modal)
  if (enterpriseBtn) {
    enterpriseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('plan-modal');
    });
  }
  
  // Helper function to open modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      // Trap focus in modal
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length > 0) {
        setTimeout(() => {
          focusableElements[0].focus();
        }, 100);
      }
    }
  }
  
  // Add pulsing effect to the "popular" badge
  const popularBadge = document.querySelector('.badge');
  if (popularBadge) {
    setInterval(() => {
      popularBadge.classList.add('pulse');
      setTimeout(() => {
        popularBadge.classList.remove('pulse');
      }, 1500);
    }, 4000);
  }
});
