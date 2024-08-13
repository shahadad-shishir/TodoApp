import { taskData } from "./data/tasks.js";
import { navigateTo } from "./route.js";

let tasks, categories, addBtn, transfer, profile, count;

export const navbar = {
  getReady() {
    tasks = document.querySelector('#navbar .tasks');
    categories = document.querySelector('#navbar .categories');
    addBtn = document.querySelector('#navbar .add');
    transfer = document.querySelector('#navbar .transfer');
    profile = document.querySelector('#navbar .profile');
    count = document.querySelector('#navbar .count');

    tasks.addEventListener('click', () => {
      if (location.pathname === '/') {
        this.scrollToTop();
      } else {
        navigateTo('/');
      }
    });

    categories.addEventListener('click', () => {
      if (location.pathname === '/categories') {
        this.scrollToTop();
      } else {
        navigateTo('/categories');
      }
    });
    
    addBtn.addEventListener('click', () => {
      if (location.pathname === '/add-task') {
        this.scrollToTop();
      } else {
        navigateTo('/add-task');
      }
    });

    transfer.addEventListener('click', () => {
      if (location.pathname === '/transfer') {
        this.scrollToTop();
      } else {
        navigateTo('/transfer');
      }
    });

    profile.addEventListener('click', () => {
      if (location.pathname === '/profile') {
        this.scrollToTop();
      } else {
        navigateTo('/profile');
      }
    });
  },
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },

  showNotDoneTask() {
    const num = taskData.countNotDoneTask();
    if (num > 0) {
      count.style.display = 'flex';
      count.innerHTML = num;
    } else {
      count.style.display = 'none';
    }
  },

  hideNotDoneTask() {
    count.style.display = 'none';
  },

  selectPage(pathname) {
    if (document.querySelector('#navbar .selected')) {
      document.querySelectorAll('#navbar .selected')
      .forEach(el => {
        el.classList.remove('selected');
      });
    }

    if (pathname === '/') {
      tasks.classList.add('selected');
    } else if (pathname === '/add-task') {
      addBtn.classList.add('selected');
    } else if (pathname === '/categories') {
      categories.classList.add('selected');
    } else if (pathname === '/transfer') {
      transfer.classList.add('selected');
    } else if (pathname === '/profile') {
      profile.classList.add('selected');
    }
  }
};