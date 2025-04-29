/**
 * Cookie Banner component functionality
 * Handles cookie consent banner display and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptButton = document.getElementById('cookie-accept');
  const customizeButton = document.getElementById('cookie-customize');
  
  // Check if user has already made a cookie choice
  const cookieConsent = localStorage.getItem('cookie-consent');
  
  // Show the cookie banner if no consent has been given
  if (!cookieConsent) {
    // Show banner after a short delay for better user experience
    setTimeout(() => {
      cookieBanner.style.display = 'block';
      cookieBanner.classList.add('fade-in');
    }, 1500);
  }
  
  // Handle accept all button
  if (acceptButton) {
    acceptButton.addEventListener('click', () => {
      acceptAllCookies();
      hideBanner();
    });
  }
  
  // Handle customize button
  if (customizeButton) {
    customizeButton.addEventListener('click', () => {
      // This would typically open a modal with cookie preferences
      // For this implementation, we'll just show an alert
      alert('Cookie preferences customization would be shown here. For this demo, we\'ll just set necessary cookies.');
      
      // Set only necessary cookies
      setNecessaryCookies();
      hideBanner();
    });
  }
  
  // Function to hide the banner with animation
  function hideBanner() {
    cookieBanner.classList.remove('fade-in');
    cookieBanner.classList.add('fade-out');
    
    // Remove banner from DOM after animation completes
    setTimeout(() => {
      cookieBanner.style.display = 'none';
    }, 300); // 300ms matches the fade-out animation duration
  }
  
  // Function to accept all cookies
  function acceptAllCookies() {
    // Store the consent in localStorage
    localStorage.setItem('cookie-consent', 'all');
    
    // Set a cookie to track consent (expires in 365 days)
    setConsentCookie('all', 365);
    
    // This is where you would typically initialize analytics, etc.
    console.log('All cookies accepted. Analytics would be initialized here.');
  }
  
  // Function to set only necessary cookies
  function setNecessaryCookies() {
    localStorage.setItem('cookie-consent', 'necessary');
    setConsentCookie('necessary', 365);
    console.log('Only necessary cookies accepted.');
  }
  
  // Helper function to set a cookie
  function setConsentCookie(value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `cookie-consent=${value};${expires};path=/;SameSite=Lax`;
  }
  
  // Add keyboard support for the cookie banner
  cookieBanner.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Setting only necessary cookies when user presses Escape
      setNecessaryCookies();
      hideBanner();
    }
  });
});
