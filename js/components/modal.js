/**
 * Modal component functionality
 * Handles opening and closing modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get all modals
  const modals = document.querySelectorAll('.modal');
  
  // Get all elements that open modals (with data-open-modal attribute)
  const modalOpeners = document.querySelectorAll('[data-open-modal]');
  
  // Get all elements that close modals
  const modalClosers = document.querySelectorAll('.modal-close, .modal-overlay');
  
  // Get the enterprise button
  const enterpriseBtn = document.getElementById('enterprise-btn');
  
  // Set up event listeners for elements that open modals
  modalOpeners.forEach(opener => {
    opener.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = opener.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });
  
  // Set up event listener for enterprise button
  if (enterpriseBtn) {
    enterpriseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('plan-modal');
    });
  }
  
  // Set up event listeners for elements that close modals
  modalClosers.forEach(closer => {
    closer.addEventListener('click', (e) => {
      e.preventDefault();
      // Find the parent modal
      const modal = closer.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
  
  // Handle form submissions in modals
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Validate form (simple example)
      let isValid = true;
      let errorMessage = '';
      
      if (!formValues.name || formValues.name.trim() === '') {
        isValid = false;
        errorMessage = 'Please enter your name';
      } else if (!formValues.email || !isValidEmail(formValues.email)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      } else if (!formValues.company || formValues.company.trim() === '') {
        isValid = false;
        errorMessage = 'Please enter your company name';
      } else if (!formValues.message || formValues.message.trim() === '') {
        isValid = false;
        errorMessage = 'Please enter a message';
      }
      
      if (!isValid) {
        alert(errorMessage);
        return;
      }
      
      // Simulate form submission
      simulateFormSubmission(formValues);
    });
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Simulate form submission
  function simulateFormSubmission(formData) {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Show success message
      alert('Thank you for your request! Our sales team will contact you shortly.');
      
      // Reset form
      contactForm.reset();
      
      // Close modal
      closeModal('plan-modal');
      
      // Reset button
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }, 1500);
  }
});

// Make these functions globally available for other components
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    // Show modal
    modal.style.display = 'block';
    
    // Add class to body to prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Set focus to the first focusable element
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
      setTimeout(() => {
        focusableElements[0].focus();
      }, 100);
    }
    
    // Store the element that had focus before opening the modal
    modal.previouslyFocused = document.activeElement;
    
    // Add key event listener to modal
    modal.addEventListener('keydown', handleModalKeydown);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    // Hide modal
    modal.style.display = 'none';
    
    // Restore body scrolling
    document.body.style.overflow = '';
    
    // Restore focus to the element that had focus before opening the modal
    if (modal.previouslyFocused) {
      modal.previouslyFocused.focus();
    }
    
    // Remove key event listener
    modal.removeEventListener('keydown', handleModalKeydown);
  }
}

// Handle keydown events in modal
function handleModalKeydown(e) {
  // Close on Escape key
  if (e.key === 'Escape') {
    const modalId = e.currentTarget.id;
    closeModal(modalId);
    return;
  }
  
  // Trap focus within modal using Tab key
  if (e.key === 'Tab') {
    const focusableElements = e.currentTarget.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // If shift+tab and on first element, go to last element
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // If tab and on last element, go to first element
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}
