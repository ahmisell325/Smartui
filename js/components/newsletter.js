/**
 * Newsletter component functionality
 * Handles form submission and validation
 */

document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const messageContainer = document.getElementById('newsletter-message');
  
  if (newsletterForm) {
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
      
      // Simulate form submission
      submitNewsletter(email);
    });
  }
  
  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Show message in the UI
  function showMessage(message, type = 'success') {
    messageContainer.textContent = message;
    messageContainer.className = 'form-message';
    messageContainer.classList.add(type);
    
    // Set ARIA attributes for accessibility
    messageContainer.setAttribute('role', 'status');
    
    // Clear message after 5 seconds if it's a success message
    if (type === 'success') {
      setTimeout(() => {
        messageContainer.textContent = '';
        messageContainer.className = 'form-message';
        messageContainer.removeAttribute('role');
      }, 5000);
    }
  }
  
  // Simulate form submission
  function submitNewsletter(email) {
    // Show loading state
    emailInput.disabled = true;
    newsletterForm.querySelector('button').disabled = true;
    showMessage('Subscribing...', 'info');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Randomly simulate success or failure for demonstration
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        showMessage('Thank you for subscribing! Check your email for confirmation.', 'success');
        newsletterForm.reset();
      } else {
        showMessage('There was an error subscribing. Please try again later.', 'error');
      }
      
      // Reset form state
      emailInput.disabled = false;
      newsletterForm.querySelector('button').disabled = false;
    }, 1500);
  }
  
  // Add input validation as user types
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const email = emailInput.value.trim();
      
      if (email && !isValidEmail(email)) {
        emailInput.setCustomValidity('Please enter a valid email address');
      } else {
        emailInput.setCustomValidity('');
        
        // Clear any error messages when the input becomes valid
        if (messageContainer.classList.contains('error')) {
          messageContainer.textContent = '';
          messageContainer.className = 'form-message';
        }
      }
    });
  }
});
