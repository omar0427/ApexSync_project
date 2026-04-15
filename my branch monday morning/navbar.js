class NavigationBar extends HTMLElement {
  connectedCallback() {

    this.innerHTML = `
      <div class="nav-container">

        <div class="nav-logo">
          <img src="icons/logo.svg" alt="Logo" class="logo-image">
          <span class="logo-text">ApexSync</span>
      </div>

      <div class="tab-list">
        <a href="dashboard.html" class="tab-button" data-tab="dashboard">
          <img src="icons/dashboard icon.svg" alt="" class="tab-icon">
          <span class="tab-label">Dashboard</span>
        </a>
        <a href="index.html" class="tab-button" data-tab="index">
          <img src="icons/class icon.svg" alt="" class="tab-icon">
          <span class="tab-label">Classes</span>
        </a>
        <a href="bookings.html" class="tab-button" data-tab="bookings">
          <img src="icons/mybookings icon.svg" alt="" class="tab-icon">
          <span class="tab-label">My Bookings</span>
        </a>
        <a href="cafeteria.html" class="tab-button" data-tab="cafeteria">
          <img src="icons/cafeteria icon.svg" alt="" class="tab-icon">
          <span class="tab-label">Cafeteria</span>
        </a>
        <a href="courts.html" class="tab-button" data-tab="courts">
          <img src="icons/basketball icon.svg" alt="" class="tab-icon">
          <span class="tab-label">Courts</span>
        </a>
        <a href="community.html" class="tab-button" data-tab="Community">
          <img src="icons/classes icon.svg" alt="" class="tab-icon">
          <span class="tab-label">Community</span>
        </a>
        <a href="calendar.html" class="tab-button" data-tab="calendar">
          <img src="icons/class icon.svg" alt="" class="tab-icon">
          <span class="tab-label">Calendar</span>
        </a>
      </div>
    </div>
    `;
    
    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
    this.querySelector(`[data-tab="${currentPage}"]`)?.classList.add('active');
  }
}

customElements.define('navigation-bar', NavigationBar);