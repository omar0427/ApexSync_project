// dashboard-bg.js
(function() {
  function addVideoBackground() {
    // Prevent duplicate insertion
    if (document.querySelector('.dashboard-video-bg')) return;
    
    // Add body class
    document.body.classList.add('dashboard-page');
    
    // Create and inject video background
    const videoHTML = `
      <div class="dashboard-video-bg">
        <video autoplay muted loop playsinline>
          <source src="images/dashboard-bg.webm" type="video/mp4" />
        </video>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', videoHTML);
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addVideoBackground);
  } else {
    addVideoBackground();
  }
})();