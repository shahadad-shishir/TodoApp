import { navigateTo, routes } from "./route.js";
import { sidebar } from "./sidebar.js";

const backBtn = document.querySelector('.js-back-btn');
export const headerEl = document.querySelector('#header');
const headerText = document.querySelector('#header .text');
const userIcon = document.querySelector('#header .user');

export const header = {
  getReady() {
    backBtn.addEventListener('click', () => {
      if (routes.lastPathname !== location.pathname) {
        navigateTo(routes.lastPathname);
      }
    });
    userIcon.addEventListener('click', () => {
      sidebar.open();
    });
  },

  cngHeading(heading) {
    headerText.innerText = heading;
  }
}; 

