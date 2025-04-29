/**
 * FAQ component functionality
 * Handles accordion behavior for FAQ items
 */

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Function to toggle FAQ answer visibility
  function toggleAnswer(question, answer) {
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    
    // Toggle aria-expanded state
    question.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle answer visibility
    if (isExpanded) {
      // Close the answer
      answer.style.height = `${answer.scrollHeight}px`;
      answer.setAttribute('aria-hidden', 'true');
      
      // Force a reflow to ensure the animation works
      answer.offsetHeight;
      
      // Trigger the animation
      answer.style.height = '0px';
    } else {
      // Open the answer
      answer.style.height = `${answer.scrollHeight}px`;
      answer.setAttribute('aria-hidden', 'false');
      
      // Set a variable for the accordion content height for CSS animation
      document.documentElement.style.setProperty('--accordion-content-height', `${answer.scrollHeight}px`);
    }
  }
  
  // Add click event handlers to FAQ questions
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Set initial states
    question.setAttribute('aria-expanded', 'false');
    answer.setAttribute('aria-hidden', 'true');
    answer.style.height = '0px';
    
    // Generate unique IDs for accessibility
    const questionId = `question-${Math.random().toString(36).substring(2, 10)}`;
    const answerId = `answer-${Math.random().toString(36).substring(2, 10)}`;
    
    // Set ARIA attributes for accessibility
    question.setAttribute('id', questionId);
    question.setAttribute('aria-controls', answerId);
    answer.setAttribute('id', answerId);
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', questionId);
    
    // Add click event
    question.addEventListener('click', () => {
      toggleAnswer(question, answer);
    });
    
    // Add keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAnswer(question, answer);
      }
    });
  });
  
  // Handle transition end to remove inline height
  document.addEventListener('transitionend', (e) => {
    if (e.target.classList.contains('faq-answer') && e.propertyName === 'height') {
      const question = e.target.previousElementSibling;
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        // When fully opened, set height to auto to handle content changes
        e.target.style.height = 'auto';
      }
    }
  });
  
  // Optional: Add ability to open specific FAQ items based on URL hash
  function openFaqFromHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#faq-')) {
      const index = parseInt(hash.replace('#faq-', '')) - 1;
      if (!isNaN(index) && index >= 0 && index < faqItems.length) {
        const question = faqItems[index].querySelector('.faq-question');
        const answer = faqItems[index].querySelector('.faq-answer');
        
        // Only open if it's closed
        if (question.getAttribute('aria-expanded') === 'false') {
          toggleAnswer(question, answer);
        }
        
        // Scroll into view
        setTimeout(() => {
          faqItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }
  
  // Check hash on page load
  openFaqFromHash();
  
  // Listen for hash changes
  window.addEventListener('hashchange', openFaqFromHash);
});
