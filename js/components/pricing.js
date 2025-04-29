/**
 * Pricing component functionality
 * Handles billing toggle and pricing interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const billingToggle = document.getElementById('billing-toggle');
  const pricingCards = document.querySelectorAll('.pricing-card');
  const enterpriseBtn = document.getElementById('enterprise-btn');
  
  // Toggle between monthly and annual pricing
  billingToggle.addEventListener('change', () => {
    const isAnnual = billingToggle.checked;
    
    // Add or remove class to control pricing display
    document.body.classList.toggle('annual-active', isAnnual);
    
    // Announce for screen readers
    announceMessage(isAnnual ? 'Showing annual pricing' : 'Showing monthly pricing');
  });
  
  // Add hover effect to pricing cards
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('popular')) {
        card.style.transform = 'translateY(-8px)';
      } else {
        // Popular card is already elevated, push it a bit higher
        card.style.transform = 'translateY(-20px)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('popular')) {
        card.style.transform = '';
      } else {
        // Reset to its original elevated position
        card.style.transform = 'translateY(-16px)';
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
  function announceMessage(message) {
    liveRegion.textContent = message;
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
});
