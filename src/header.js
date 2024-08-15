import { navigateTo, routes } from "./route.js";
import { sidebar } from "./sidebar.js";

export const header = {
  init() {
    this.backBtn = document.querySelector('.js-back-btn');
    this.headerEl = document.querySelector('#header');
    this.headerText = document.querySelector('#header .text');
    this.userIcon = document.querySelector('#header .user');

    this.backBtn.addEventListener('click', () => {
      if (routes.lastPathname !== location.pathname) {
        navigateTo(routes.lastPathname);
      }
    });
    this.userIcon.addEventListener('click', () => {
      sidebar.open();
    });
  },

  cngHeading(heading) {
    this.headerText.innerText = heading;
  },

  show() {
    this.headerEl.style.display = 'flex';
  },

  hide() {
    this.headerEl.style.display = 'none';
  }
};