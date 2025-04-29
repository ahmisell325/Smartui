/**
 * Newsletter component functionality
 * Handles form submission and validation with enhanced user experience
 */

document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const messageContainer = document.getElementById('newsletter-message');
  
  // Add accessibility attributes to form elements
  if (emailInput) {
    emailInput.setAttribute('aria-label', 'Email address for newsletter subscription');
    emailInput.setAttribute('autocomplete', 'email');
  }
  
  // Create message container if it doesn't exist
  if (!messageContainer && newsletterForm) {
    const newMessageContainer = document.createElement('div');
    newMessageContainer.id = 'newsletter-message';
    newMessageContainer.className = 'form-message';
    newsletterForm.appendChild(newMessageContainer);
  }
  
  if (newsletterForm) {
    // Add visual feedback as user types
    const formGroup = newsletterForm.querySelector('.form-group');
    const validIndicator = document.createElement('span');
    validIndicator.className = 'valid-indicator';
    validIndicator.innerHTML = '<i class="fa-solid fa-check"></i>';
    validIndicator.style.display = 'none';
    if (formGroup) {
      formGroup.appendChild(validIndicator);
    }
    
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get the email value
      const email = emailInput.value.trim();
      
      // Validate email
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }
      
      // Add animation to form
      newsletterForm.classList.add('fade-out');
      setTimeout(() => {
        // Simulate form submission
        submitNewsletter(email);
        newsletterForm.classList.remove('fade-out');
      }, 300);
    });
  }
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Show message in the UI with animation
  function showMessage(message, type = 'success') {
    if (!messageContainer) return;
    
    // First fade out
    messageContainer.style.opacity = '0';
    
    setTimeout(() => {
      // Then update content
      messageContainer.textContent = message;
      messageContainer.className = 'form-message';
      messageContainer.classList.add(type);
      
      // Set ARIA attributes for accessibility
      messageContainer.setAttribute('role', 'status');
      messageContainer.setAttribute('aria-live', 'polite');
      
      // Fade back in
      messageContainer.style.opacity = '1';
      
      // Clear message after 5 seconds if it's a success message
      if (type === 'success') {
        setTimeout(() => {
          messageContainer.style.opacity = '0';
          setTimeout(() => {
            messageContainer.textContent = '';
            messageContainer.className = 'form-message';
            messageContainer.removeAttribute('role');
          }, 300);
        }, 5000);
      }
    }, 300);
  }
  
  // Simulate form submission with enhanced loading animation
  function submitNewsletter(email) {
    // Show loading state
    emailInput.disabled = true;
    const subscribeButton = newsletterForm.querySelector('button');
    const originalButtonText = subscribeButton.innerHTML;
    
    subscribeButton.disabled = true;
    subscribeButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';
    showMessage('Processing your subscription...', 'info');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Always succeed in this enhanced version
      showMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
      newsletterForm.reset();
      
      // Add check mark animation
      const validIndicator = newsletterForm.querySelector('.valid-indicator');
      if (validIndicator) {
        validIndicator.style.display = 'block';
        validIndicator.classList.add('pulse');
        setTimeout(() => {
          validIndicator.style.display = 'none';
          validIndicator.classList.remove('pulse');
        }, 2000);
      }
      
      // Reset form state with a delay for better UX
      setTimeout(() => {
        emailInput.disabled = false;
        subscribeButton.disabled = false;
        subscribeButton.innerHTML = originalButtonText;
      }, 1000);
    }, 1800);
  }
  
  // Add real-time validation as user types
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const email = emailInput.value.trim();
      const validIndicator = newsletterForm.querySelector('.valid-indicator');
      
      if (email && isValidEmail(email)) {
        emailInput.classList.add('valid-input');
        emailInput.classList.remove('invalid-input');
        emailInput.setCustomValidity('');
        
        // Show valid indicator
        if (validIndicator) {
          validIndicator.style.display = 'block';
        }
        
        // Clear any error messages when the input becomes valid
        if (messageContainer && messageContainer.classList.contains('error')) {
          messageContainer.textContent = '';
          messageContainer.className = 'form-message';
        }
      } else if (email) {
        emailInput.classList.add('invalid-input');
        emailInput.classList.remove('valid-input');
        emailInput.setCustomValidity('Please enter a valid email address');
        
        // Hide valid indicator
        if (validIndicator) {
          validIndicator.style.display = 'none';
        }
      } else {
        // Empty input
        emailInput.classList.remove('valid-input');
        emailInput.classList.remove('invalid-input');
        emailInput.setCustomValidity('');
        
        // Hide valid indicator
        if (validIndicator) {
          validIndicator.style.display = 'none';
        }
      }
    });
    
    // Also trigger on focus out for better validation feedback
    emailInput.addEventListener('focusout', () => {
      const email = emailInput.value.trim();
      
      if (email && !isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
      }
    });
  }
});
