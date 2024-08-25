export const profileHtml = 
`
  <main class="main">
    <div class="cart">
      <div class="profile">
        <span class="letter">S</span>
        <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723507200&semt=ais_hybrid" alt="Profile">
        <i class="fa-solid fa-user"></i>
        <div class="icon">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2z"></path><circle cx="13" cy="14" r="3"></circle><path d="M21 6h-3.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65h-6.4c.17.3.28.63.28 1 0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5"></path></svg>
        </div>
        <span class="tooltip">Add profile picture</span>
      </div>
      <span class="nm">Shahadad</span>
      <div class="register">
        <i class="fa-solid fa-calendar-day"></i>
        <span>Registered 1 hour ago</span>
      </div>
      <ul class="themes">
      </ul>
      <div class="nm-input">
        <input placeholder="Change Name" type="text">
      </div>
      <button class="save-btn">Save Name</button>
      <button class="logout">
      <i class="fa-solid fa-sign-out"></i> Logout
      </button>
      </div>


      <div class="cng-profile">
        <h3 class="header">Profile Picture</h3>
        <div class="form">
          <div class="name">
            <label class="label1" for="name-input">Link to the profile picture</label>
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M17 7h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.65 0 3 1.35 3 3s-1.35 3-3 3h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c2.76 0 5-2.24 5-5s-2.24-5-5-5m-9 5c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H9c-.55 0-1 .45-1 1m2 3H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h3c.55 0 1-.45 1-1s-.45-1-1-1H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h3c.55 0 1-.45 1-1s-.45-1-1-1"></path></svg>
            <input type="text" id="name-input" placeholder="Enter link to profile picture...">
          </div>
          <span class="nm-count">2/20</span>

          <button class="delete">
            <i class="fa-solid fa-trash"></i> Delete Image
          </button>
        </div>
        <div class="fotter">
          <button id="cancel-btn">cancel</button>
          <button id="save-btn"><i class="fa-solid fa-floppy-disk"></i>save</button>
        </div>
      </div>

      <div class="logout-cnfrm">
        <div class="header">
          <i class="fa-solid fa-sign-out"></i>
          Logout Confirmation
        </div>
        <p class="info">Are you sure you want to logout? <b>Your tasks will not be saved.</b></p>
        <div class="footer">
          <button id="cancel-btn">cancel</button>
          <button id="logout-btn"><i class="fa-solid fa-sign-out"></i>Logout</button>
        </div>
      </div>

      <div id="blur-bg"></div>
  </main>
`;