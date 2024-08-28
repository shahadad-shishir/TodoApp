import { scroll } from "./utils/shortcut.js";
import { removeAppData } from "./data.js";
import { navigateTo } from "./route.js";


export const logout = {
  init() {
    const div = document.createElement('div');
    div.classList.add('logout-cnfrm');
    div.innerHTML = 
    `
      <div class="logout-header">
        <i class="fa-solid fa-sign-out"></i>
        Logout Confirmation
      </div>
      <p class="info">Are you sure you want to logout? <b>Your tasks will not be saved.</b></p>
      <div class="logout-footer">
        <button id="cancel-btn">cancel</button>
        <button id="logout-btn"><i class="fa-solid fa-sign-out"></i>Logout</button>
      </div>
    `
    document.querySelector('#root').appendChild(div);

    this.el = div;
    this.cancelBtn = div.querySelector('#cancel-btn');
    this.logoutBtn = div.querySelector('#logout-btn');
    this.bg = document.querySelector('#blur-bg');

    this.cancelBtn.addEventListener('click', () => {
      this.close();
    });

    this.bg.addEventListener('click', () => {
      this.close();
    });

    this.logoutBtn.addEventListener('click', () => {
      this.logout();
      this.close();
    });
  },

  open() {
    this.bg.style.bottom = 0;
    this.bg.style.opacity = 1;
    scroll.disable();

    this.el.classList.add('visible');
  },

  close() {
    this.bg.style.removeProperty('bottom');
    this.bg.style.removeProperty('opacity');
    scroll.enable();

    this.el.classList.remove('visible');
  },

  logout() {
    removeAppData();
    navigateTo('/');
  }
};